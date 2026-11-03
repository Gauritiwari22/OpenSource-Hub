// js/bookmarks.js  (Day 4, Gunika)
// Bookmark (star) functions. Used by projects.html (Gauri) and dashboard (Harshita).
//
// Import: import { toggleBookmark, getMyBookmarks, getMyBookmarkIds, isBookmarked } from './bookmarks.js';
//
// Logged-out users: actions that change data THROW Error('Please login ...'),
// so the page can do:  try { ... } catch (e) { show(e.message) }
// Read-only helper getMyBookmarkIds() returns [] when logged out (projects page is public).

import { supabase } from './supabaseClient.js';
import { getCurrentUser } from './auth.js';

const PROJECT_COLUMNS = 'id, title, description, category, language, difficulty, github_url';

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Please login to bookmark projects.');
  return user;
}

// toggleBookmark(projectId)
// Adds the bookmark if missing, removes it if present.
// Returns the NEW state: true = now bookmarked (filled star), false = removed (empty star)
export async function toggleBookmark(projectId) {
  const user = await requireUser();

  const { data: existing, error: findError } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('project_id', projectId)
    .maybeSingle();

  if (findError) {
    console.error('toggleBookmark (find):', findError.message);
    throw new Error('Could not update bookmark. Please try again.');
  }

  if (existing) {
    const { error } = await supabase.from('bookmarks').delete().eq('id', existing.id);
    if (error) {
      console.error('toggleBookmark (delete):', error.message);
      throw new Error('Could not remove bookmark. Please try again.');
    }
    return false;
  }

  const { error } = await supabase
    .from('bookmarks')
    .insert({ user_id: user.id, project_id: projectId });

  // 23505 = unique violation: already bookmarked (e.g. double click), so state is "bookmarked"
  if (error && error.code !== '23505') {
    console.error('toggleBookmark (insert):', error.message);
    throw new Error('Could not save bookmark. Please try again.');
  }
  return true;
}

// getMyBookmarks()
// Returns an array of full project objects (newest bookmark first), each with bookmarked_at.
export async function getMyBookmarks() {
  const user = await requireUser();

  const { data, error } = await supabase
    .from('bookmarks')
    .select(`created_at, projects ( ${PROJECT_COLUMNS} )`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getMyBookmarks:', error.message);
    throw new Error('Could not load your bookmarks.');
  }

  return (data ?? [])
    .filter((row) => row.projects)
    .map((row) => ({ ...row.projects, bookmarked_at: row.created_at }));
}

// getMyBookmarkIds()
// Returns an array of project ids the user bookmarked, e.g. [3, 7, 12].
// Use it once on the projects page to fill the stars. Returns [] if logged out.
export async function getMyBookmarkIds() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('bookmarks')
    .select('project_id')
    .eq('user_id', user.id);

  if (error) {
    console.error('getMyBookmarkIds:', error.message);
    return [];
  }
  return (data ?? []).map((row) => row.project_id);
}

// isBookmarked(projectId) -> true / false
export async function isBookmarked(projectId) {
  const ids = await getMyBookmarkIds();
  return ids.includes(projectId);
}

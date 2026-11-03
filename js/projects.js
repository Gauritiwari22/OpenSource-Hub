// js/projects.js  (Day 3, Gunika)
// Fetching and filtering projects. Used by projects.html (Gauri) and the Home page.
//
// Import:  import { getProjects, getFilterOptions, getProjectById } from './projects.js';
//
// All functions return plain data. On failure they THROW an Error with a friendly
// message, so the page can do:
//   try { const list = await getProjects(...); } catch (e) { errorBox.textContent = e.message; }

import { supabase } from './supabaseClient.js';

// Only the columns the UI needs (same names as the table, so card renderer works directly)
const COLUMNS = 'id, title, description, category, language, difficulty, github_url, created_at';

// Removes characters that would break the PostgREST .or() filter string
function cleanSearch(text) {
  return String(text).replace(/[,()%*\\]/g, ' ').trim();
}

// getProjects({ category, language, difficulty, search })
// Every filter is optional. Empty, null, undefined or 'All' means "don't filter on this".
// Returns: array of project objects (empty array if nothing matches)
export async function getProjects({ category, language, difficulty, search } = {}) {
  const isSet = (v) => v !== undefined && v !== null && String(v).trim() !== '' && v !== 'All';

  let query = supabase.from('projects').select(COLUMNS);

  if (isSet(category))   query = query.eq('category', category);
  if (isSet(language))   query = query.eq('language', language);
  if (isSet(difficulty)) query = query.eq('difficulty', difficulty);

  if (isSet(search)) {
    const s = cleanSearch(search);
    if (s) query = query.or(`title.ilike.%${s}%,description.ilike.%${s}%`);
  }

  const { data, error } = await query.order('title', { ascending: true });
  if (error) {
    console.error('getProjects error:', error.message);
    throw new Error('Could not load projects. Please try again.');
  }
  return data ?? [];
}

// getFilterOptions()
// Returns: { categories: [...], languages: [...] }  (distinct, sorted A-Z)
export async function getFilterOptions() {
  const { data, error } = await supabase.from('projects').select('category, language');
  if (error) {
    console.error('getFilterOptions error:', error.message);
    throw new Error('Could not load filter options.');
  }
  const unique = (key) =>
    [...new Set((data ?? []).map((row) => row[key]).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b)
    );
  return { categories: unique('category'), languages: unique('language') };
}

// getProjectById(id)
// Returns: one project object, or null if it doesn't exist
export async function getProjectById(id) {
  const { data, error } = await supabase
    .from('projects')
    .select(COLUMNS)
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error('getProjectById error:', error.message);
    throw new Error('Could not load this project.');
  }
  return data;
}
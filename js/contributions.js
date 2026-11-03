// js/contributions.js  (Day 4, Gunika)
// Contribution progress tracking. Used by the dashboard (Harshita).
//
// Import: import { updateContributionStatus, getMyContributions, STATUSES } from './contributions.js';
//
// Logged-out users: functions THROW Error('Please login ...') so the page can show e.message.

import { supabase } from './supabaseClient.js';
import { getCurrentUser } from './auth.js';

// Allowed statuses (same as the CHECK constraint in the database). Use for the dropdown.
export const STATUSES = ['Not Started', 'In Progress', 'PR Submitted', 'Merged'];

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Please login to track your contributions.');
  return user;
}

// updateContributionStatus(projectId, status)
// Inserts a row, or updates the existing one (one row per user + project).
// Returns true when saved.
export async function updateContributionStatus(projectId, status) {
  if (!STATUSES.includes(status)) {
    throw new Error('Invalid status. Choose one of: ' + STATUSES.join(', ') + '.');
  }
  const user = await requireUser();

  const { error } = await supabase
    .from('contributions')
    .upsert(
      {
        user_id: user.id,
        project_id: projectId,
        status,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id,project_id' }
    );

  if (error) {
    console.error('updateContributionStatus:', error.message);
    throw new Error('Could not save your progress. Please try again.');
  }
  return true;
}

// getMyContributions()
// Returns an array (latest update first) of:
//   { project_id, title, github_url, status, updated_at }
export async function getMyContributions() {
  const user = await requireUser();

  const { data, error } = await supabase
    .from('contributions')
    .select('project_id, status, updated_at, projects ( title, github_url )')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('getMyContributions:', error.message);
    throw new Error('Could not load your contributions.');
  }

  return (data ?? [])
    .filter((row) => row.projects)
    .map((row) => ({
      project_id: row.project_id,
      title: row.projects.title,
      github_url: row.projects.github_url,
      status: row.status,
      updated_at: row.updated_at
    }));
}

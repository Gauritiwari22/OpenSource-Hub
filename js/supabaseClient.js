// js/supabaseClient.js
// Shared Supabase client. Import it in any other JS file:
//   import { supabase } from './supabaseClient.js';
//
// SAFE to commit: Project URL and the public ANON key.
// NEVER put the service_role key here or anywhere in the repo.

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://dufinrrxrzimbmekjklh.supabase.co';   
const SUPABASE_ANON_KEY = 'sb_publishable_Ru1z9Q_nKvk0KLqH6U2lkw_Fdtw4Qs1';              

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// js/auth.js  (Day 2, Gunika) - FINAL
// Auth functions + wiring for login.html and register.html
//
// login.html    IDs: email, password, loginBtn, errorMsg   (form: loginForm)
// register.html IDs: name, email, password, confirmPassword, registerBtn, errorMsg
//
// Both pages must load this file as a MODULE:
//   <script type="module" src="js/auth.js"></script>

import { supabase } from './supabaseClient.js';

// Where to go after login/register. Change to 'index.html' if dashboard.html isn't ready yet.
const REDIRECT_AFTER_AUTH = 'index.html';

// ---------- helpers ----------
function friendlyError(error) {
  const msg = (error?.message || '').toLowerCase();
  if (msg.includes('invalid login credentials')) return 'Wrong email or password.';
  if (msg.includes('already registered') || msg.includes('already been registered'))
    return 'This email is already registered. Try logging in.';
  if (msg.includes('password') && msg.includes('at least')) return 'Password must be at least 6 characters.';
  if (msg.includes('valid email') || msg.includes('invalid email')) return 'Please enter a valid email address.';
  if (msg.includes('email not confirmed')) return 'Please confirm your email first.';
  if (msg.includes('rate limit')) return 'Too many attempts. Please wait a minute and try again.';
  if (msg.includes('failed to fetch') || msg.includes('network')) return 'Network problem. Check your internet.';
  return 'Something went wrong. Please try again.';
}

function showError(text) {
  const el = document.getElementById('errorMsg');
  if (!el) return;
  el.textContent = text;
  el.style.display = text ? 'block' : 'none';
}

// ---------- core functions (names fixed by the team contract) ----------

// Creates the auth user. The DB trigger creates the profiles row from options.data.name
export async function signUp(name, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });
  if (error) return { user: null, error: friendlyError(error) };
  // Supabase returns a user with no identities when the email already exists
  if (data.user && data.user.identities && data.user.identities.length === 0)
    return { user: null, error: 'This email is already registered. Try logging in.' };
  return { user: data.user, error: null };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { user: null, error: friendlyError(error) };
  return { user: data.user, error: null };
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

// Returns the logged-in user or null
export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user ?? null;
}

// Returns { name, role } or null
export async function getUserProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', user.id)
    .single();
  if (error) return null;
  return data;
}

// Lets any page react to login/logout (navbar uses this)
// Usage: onAuthChange((user) => { /* user is null when logged out */ });
export function onAuthChange(callback) {
  supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}

// ---------- page wiring ----------
// Runs the handler on form submit (keeps Enter key working); falls back to button click.
function bindSubmit(btn, handler) {
  const form = btn.closest('form');
  if (form) {
    form.addEventListener('submit', (e) => { e.preventDefault(); handler(); });
  } else {
    btn.addEventListener('click', (e) => { e.preventDefault(); handler(); });
  }
}

function setupRegisterPage() {
  const btn = document.getElementById('registerBtn');
  if (!btn) return;

  bindSubmit(btn, async () => {
    showError('');
    // Register page may have separate firstName/lastName fields (hidden #name is a fallback)
    const first = document.getElementById('firstName')?.value.trim() || '';
    const last = document.getElementById('lastName')?.value.trim() || '';
    const name = (first || last)
      ? `${first} ${last}`.trim()
      : (document.getElementById('name')?.value.trim() || '');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirm) return showError('Please fill in all fields.');
    if (password.length < 6) return showError('Password must be at least 6 characters.');
    if (password !== confirm) return showError('Passwords do not match.');

    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Creating account...';
    const { error } = await signUp(name, email, password);
    btn.disabled = false;
    btn.textContent = label;

    if (error) return showError(error);
    window.location.href = REDIRECT_AFTER_AUTH;
  });
}

function setupLoginPage() {
  const btn = document.getElementById('loginBtn');
  if (!btn) return;

  bindSubmit(btn, async () => {
    showError('');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) return showError('Please enter email and password.');

    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Logging in...';
    const { error } = await signIn(email, password);
    btn.disabled = false;
    btn.textContent = label;

    if (error) return showError(error);
    // Redirect-back to the page the user wanted is added on Day 5
    window.location.href = REDIRECT_AFTER_AUTH;
  });
}

setupRegisterPage();
setupLoginPage();
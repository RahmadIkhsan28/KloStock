// Autentikasi sederhana untuk demo lokal tanpa backend.
const AUTH_KEY = 'klostock_user';
const DEMO_ACCOUNT = { email: 'admin@klostock.app', password: 'klostock123', name: 'VL', role: 'Workspace owner', company: 'KloStock Store' };
function getCurrentUser() { try { const user = JSON.parse(localStorage.getItem(AUTH_KEY)) || null; const legacyName = ['Kink', 'Valiant'].join(' '); if (user && user.name === legacyName) { user.name = 'VL'; saveCurrentUser(user); } return user; } catch { return null; } }
function saveCurrentUser(user) { localStorage.setItem(AUTH_KEY, JSON.stringify(user)); }
function loginUser(email, password) { if (email.trim().toLowerCase() !== DEMO_ACCOUNT.email || password !== DEMO_ACCOUNT.password) return false; saveCurrentUser({ name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email, role: DEMO_ACCOUNT.role, company: DEMO_ACCOUNT.company }); return true; }
function updateCurrentUser(changes) { const user = getCurrentUser(); if (!user) return null; const updated = { ...user, ...changes }; saveCurrentUser(updated); return updated; }
function logoutUser() { localStorage.removeItem(AUTH_KEY); sessionStorage.removeItem('klostock_splash_seen'); window.location.href = getRelativePath('login.html'); }
function getRelativePath(file) { return location.pathname.includes('/pages/') ? file : 'pages/' + file; }
function userInitials(user) { return (user?.name || 'ST').split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase(); }
function requireLogin() { if (document.body.dataset.page !== 'login' && !getCurrentUser()) { window.location.href = getRelativePath('login.html'); return false; } return true; }

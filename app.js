// Fungsi umum yang dipakai oleh semua halaman KloStock.
document.addEventListener('DOMContentLoaded', () => {
  if (typeof requireLogin === 'function' && !requireLogin()) return;
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', event => { event.stopPropagation(); sidebar.classList.toggle('open'); });
    sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => sidebar.classList.remove('open')));
    document.addEventListener('click', event => { if (window.innerWidth <= 760 && sidebar.classList.contains('open') && !sidebar.contains(event.target) && event.target !== menuToggle) sidebar.classList.remove('open'); });
  }
  const splash = document.getElementById('splashScreen');
  if (splash) {
    const splashAlreadySeen = sessionStorage.getItem('klostock_splash_seen') === 'true';
    if (splashAlreadySeen) splash.classList.add('hidden');
    else { sessionStorage.setItem('klostock_splash_seen', 'true'); setTimeout(() => splash.classList.add('hidden'), 1300); }
  }
  document.querySelectorAll('a[href="index.html"], a[href="../index.html"]').forEach(link => link.addEventListener('click', () => sessionStorage.setItem('klostock_splash_seen', 'true')));
  if (typeof getCurrentUser === 'function') {
    const user = getCurrentUser();
    document.querySelectorAll('[data-user-name]').forEach(element => element.textContent = user?.name || 'VL');
    document.querySelectorAll('[data-user-role]').forEach(element => element.textContent = user?.role || 'Workspace owner');
    document.querySelectorAll('[data-user-initials]').forEach(element => element.textContent = userInitials(user));
  }
  if ('serviceWorker' in navigator) window.addEventListener('load', () => { const workerPath = location.pathname.includes('/pages/') ? '../service-worker.js' : 'service-worker.js'; navigator.serviceWorker.register(workerPath).catch(() => {}); });
  document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => history.back()));
});
function showToast(message) { const toast = document.getElementById('toast'); if (!toast) return; toast.textContent = message; toast.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); }
function getQueryId() { return new URLSearchParams(window.location.search).get('id'); }
function productInitial(product) { return (product.namaBarang || 'B').trim().charAt(0).toUpperCase(); }
function goTo(url) { window.location.href = url; }

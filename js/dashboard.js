let categoryChart;
let statusChart;

document.addEventListener('DOMContentLoaded', () => { if (document.body.dataset.page !== 'dashboard') return; renderDashboard(); });
function renderDashboard() {
  const products = getProducts();
  const totalStock = products.reduce((sum, product) => sum + Number(product.stok), 0);
  const value = products.reduce((sum, product) => sum + Number(product.harga) * Number(product.stok), 0);
  const lowStock = products.filter(product => Number(product.stok) > 0 && Number(product.stok) <= 10).length;
  const safe = products.filter(product => Number(product.stok) > 10).length;
  document.getElementById('totalProducts').textContent = products.length;
  document.getElementById('totalStock').textContent = totalStock.toLocaleString('id-ID');
  document.getElementById('inventoryValue').textContent = formatCurrency(value);
  document.getElementById('lowStock').textContent = lowStock;
  document.getElementById('heroValue').textContent = formatCurrency(value);
  document.getElementById('stockPercent').textContent = products.length ? Math.round((safe / products.length) * 100) + '%' : '0%';
  document.getElementById('safePercent').textContent = products.length ? Math.round((safe / products.length) * 100) + '%' : '0%';
  renderCharts(products);
  renderRecent(products);
}
function renderCharts(products) {
  if (!window.Chart) return;
  const categoryData = categories.map(category => products.filter(product => product.kategori === category).reduce((sum, product) => sum + Number(product.stok), 0));
  const statusData = ['Aman', 'Menipis', 'Habis'].map(status => products.filter(product => getStockStatus(product.stok) === status).length);
  if (categoryChart) categoryChart.destroy(); if (statusChart) statusChart.destroy();
  categoryChart = new Chart(document.getElementById('categoryChart'), { type: 'bar', data: { labels: categories, datasets: [{ data: categoryData, backgroundColor: ['#2da782','#65c99d','#f0bb58','#86b7aa','#bddbd1'], borderRadius: 6, borderSkipped: false, barThickness: 20 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#87948f', font: { size: 10 } } }, y: { beginAtZero: true, grid: { color: '#edf1ef' }, ticks: { color: '#a1aca8', font: { size: 10 }, precision: 0 } } } } });
  statusChart = new Chart(document.getElementById('statusChart'), { type: 'doughnut', data: { labels: ['Aman', 'Menipis', 'Habis'], datasets: [{ data: statusData, backgroundColor: ['#36bd89', '#f1bc58', '#e16b5b'], borderWidth: 0, hoverOffset: 5 }] }, options: { cutout: '74%', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
}
function renderRecent(products) {
  const container = document.getElementById('recentProducts');
  const recent = [...products].reverse().slice(0, 5);
  if (!recent.length) { container.innerHTML = '<div class="empty-state">Belum ada barang. Tambahkan barang pertama Anda.</div>'; return; }
  container.innerHTML = recent.map(product => { const status = getStockStatus(product.stok); return `<div class="recent-item"><div class="product-thumb">${escapeHtml(productInitial(product))}</div><div class="product-name"><strong>${escapeHtml(product.namaBarang)}</strong><small>${escapeHtml(product.kodeBarang)}</small></div><div class="item-meta">${escapeHtml(product.kategori)}</div><div class="price">${formatCurrency(product.harga)}</div><span class="status ${statusClass(status)}">${status}</span></div>`; }).join('');
}

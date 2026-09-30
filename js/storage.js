// Data KloStock disimpan sederhana di Local Storage.
const STORAGE_KEY = 'klostock_products';
const LEGACY_STORAGE_KEY = 'legacy_products';
const DATA_VERSION_KEY = 'klostock_data_version';
const DATA_VERSION = 'grocery-v1';
const categories = ['Sembako', 'Makanan', 'Minuman', 'Camilan', 'Rumah Tangga'];
const initialProducts = [
  { id: 1, kodeBarang: 'KLS001', namaBarang: 'Beras Premium 5 kg', kategori: 'Sembako', harga: 76000, stok: 18, satuan: 'Karung', supplier: 'Sumber Pangan', gambar: '', tanggalDitambahkan: '2026-09-28', terakhirDiperbarui: '2026-09-28' },
  { id: 2, kodeBarang: 'KLS002', namaBarang: 'Minyak Goreng 1 L', kategori: 'Sembako', harga: 18000, stok: 8, satuan: 'Botol', supplier: 'Sumber Pangan', gambar: '', tanggalDitambahkan: '2026-09-28', terakhirDiperbarui: '2026-09-28' },
  { id: 3, kodeBarang: 'KLS003', namaBarang: 'Air Mineral 600 ml', kategori: 'Minuman', harga: 3500, stok: 100, satuan: 'Botol', supplier: 'Segar Makmur', gambar: '', tanggalDitambahkan: '2026-09-28', terakhirDiperbarui: '2026-09-28' },
  { id: 4, kodeBarang: 'KLS004', namaBarang: 'Mie Instan Goreng', kategori: 'Makanan', harga: 3500, stok: 45, satuan: 'Pcs', supplier: 'Karya Niaga', gambar: '', tanggalDitambahkan: '2026-09-28', terakhirDiperbarui: '2026-09-28' },
  { id: 5, kodeBarang: 'KLS005', namaBarang: 'Biskuit Cokelat', kategori: 'Camilan', harga: 9500, stok: 60, satuan: 'Pcs', supplier: 'Jaya Distribusi', gambar: '', tanggalDitambahkan: '2026-09-28', terakhirDiperbarui: '2026-09-28' }
];
function getProducts() {
  if (localStorage.getItem(DATA_VERSION_KEY) !== DATA_VERSION) { saveProducts(initialProducts); localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION); return [...initialProducts]; }
  const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!saved) { saveProducts(initialProducts); return [...initialProducts]; }
  try { const products = JSON.parse(saved).map(product => ({ ...product, kategori: migrateCategory(product.kategori) })); saveProducts(products); return products; }
  catch { saveProducts(initialProducts); return [...initialProducts]; }
}
function migrateCategory(category) { const map = { Elektronik: 'Rumah Tangga', ATK: 'Camilan', Peralatan: 'Rumah Tangga' }; return map[category] || category; }
function saveProducts(products) { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); }
function addProduct(product) { const products = getProducts(); product.id = Date.now(); product.tanggalDitambahkan = today(); product.terakhirDiperbarui = today(); products.push(product); saveProducts(products); return product; }
function updateProduct(id, changes) { const products = getProducts(); const index = products.findIndex(product => String(product.id) === String(id)); if (index === -1) return null; products[index] = { ...products[index], ...changes, id: products[index].id, terakhirDiperbarui: today() }; saveProducts(products); return products[index]; }
function deleteProduct(id) { const products = getProducts().filter(product => String(product.id) !== String(id)); saveProducts(products); }
function getProductById(id) { return getProducts().find(product => String(product.id) === String(id)); }
function today() { return new Date().toISOString().slice(0, 10); }
function formatCurrency(value) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(value) || 0).replace('IDR', 'Rp'); }
function getStockStatus(stock) { if (Number(stock) === 0) return 'Habis'; if (Number(stock) <= 10) return 'Menipis'; return 'Aman'; }
function statusClass(status) { return status.toLowerCase().replace('menipis', 'warning').replace('habis', 'empty').replace('aman', 'safe'); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character])); }

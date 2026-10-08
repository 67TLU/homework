/**
 * SERVICES PAGE - Module JS
 * Xử lý danh mục dịch vụ, tìm kiếm và bộ lọc
 */

const ServicesPage = {
  currentSearch: '',
  currentCategory: 'all',

  init() {
    this.renderCategories();
    this.renderFilterChips();
    this.renderServices();
    this.setupEventListeners();
  },

  renderCategories() {
    const list = document.getElementById('services-category-list');
    if (!list) return;

    const categories = [
      { label: 'Tất cả dịch vụ', id: 'all', count: 12 },
      { label: 'Tư vấn cá nhân', id: 'Tư vấn cá nhân', count: 5 },
      { label: 'Workshop nhóm', id: 'Workshop nhóm', count: 3 },
      { label: 'Hỗ trợ học tập', id: 'Hỗ trợ học tập', count: 2 },
      { label: 'Giấc ngủ & thư giãn', id: 'Giấc ngủ & thư giãn', count: 3 },
      { label: 'Quan hệ & giao tiếp', id: 'Quan hệ & giao tiếp', count: 3 }
    ];

    list.innerHTML = categories.map(cat => `
      <li>
        <button 
          onclick="ServicesPage.filterByCategory('${cat.id}')"
          class="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors category-filter ${this.currentCategory === cat.id ? 'active bg-sage text-white' : 'hover:bg-paper'}"
        >
          <span>${cat.label}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded-full ${this.currentCategory === cat.id ? 'bg-white/20 text-white' : 'bg-paper text-ink/60'}">${cat.count}</span>
        </button>
      </li>
    `).join('');
  },

  renderFilterChips() {
    const chips = document.getElementById('services-filter-chips');
    if (!chips) return;

    const filters = [
      { label: 'Tất cả (12)', id: 'all' },
      { label: 'Tư vấn cá nhân (5)', id: 'Tư vấn cá nhân' },
      { label: 'Workshop (3)', id: 'Workshop nhóm' },
      { label: 'Học tập (2)', id: 'Hỗ trợ học tập' },
      { label: 'Giấc ngủ (2)', id: 'Giấc ngủ & thư giãn' }
    ];

    chips.innerHTML = filters.map(chip => `
      <button 
        onclick="ServicesPage.filterByCategory('${chip.id}')"
        class="px-3 py-1.5 rounded-full border transition-all filter-chip ${this.currentCategory === chip.id ? 'active bg-sage-deep text-white border-sage-deep font-semibold' : 'bg-white border-card-border text-ink/70 hover:bg-paper'}"
      >
        ${chip.label}
      </button>
    `).join('');
  },

  renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    const services = CAMPUS_DATA.services.filter(s => {
      const matchCat = this.currentCategory === 'all' || s.category === this.currentCategory;
      const matchSearch = !this.currentSearch || 
        s.name.toLowerCase().includes(this.currentSearch.toLowerCase()) || 
        s.summary.toLowerCase().includes(this.currentSearch.toLowerCase());
      return matchCat && matchSearch;
    });

    grid.innerHTML = services.map(svc => `
      <div class="bg-white rounded-2xl p-5 border border-card-border flex flex-col justify-between service-card">
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="status-pill ${svc.badgeClass}">
              <span class="status-dot"></span>
              <span>${svc.badgeText}</span>
            </span>
            <span class="text-ink/60 font-medium">${svc.duration}</span>
          </div>

          <h3 class="font-serif font-bold text-lg text-ink leading-snug">${svc.name}</h3>
          <p class="text-xs text-ink/70 leading-relaxed line-clamp-2">${svc.summary}</p>
        </div>

        <div class="pt-4 mt-4 border-t border-card-border flex items-center justify-between text-xs">
          <span class="text-ink/60 font-medium">${svc.counselor}</span>
          <button 
            onclick="App.selectServiceForBooking('${svc.id}')"
            class="px-3 py-1.5 bg-sage hover:bg-sage-deep text-white font-semibold rounded-lg transition-colors shadow-xs"
          >
            Đặt lịch
          </button>
        </div>
      </div>
    `).join('');
  },

  filterByCategory(categoryId) {
    this.currentCategory = categoryId;
    this.renderCategories();
    this.renderFilterChips();
    this.renderServices();
    if (window.lucide) lucide.createIcons();
  },

  handleSearch(query) {
    this.currentSearch = query;
    this.renderServices();
  },

  setupEventListeners() {
    // Additional event listeners if needed
  }
};

// Auto-initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ServicesPage.init());
} else {
  ServicesPage.init();
}

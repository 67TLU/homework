/**
 * RESOURCES PAGE - Module JS
 * Xử lý thư viện tài nguyên self-help và AI-2 recommendations
 */

const ResourcesPage = {
  currentSearch: '',
  currentFilter: 'all',
  currentAiRecommendationIndex: 0,

  init() {
    this.renderTopics();
    this.renderFilterTabs();
    this.renderAI2Recommendation();
    this.renderResources();
  },

  renderTopics() {
    const list = document.getElementById('resources-topics-list');
    if (!list) return;

    const topics = [
      { label: 'Lo âu & căng thẳng', active: true },
      { label: 'Động lực học tập', active: false },
      { label: 'Giấc ngủ', active: false },
      { label: 'Mối quan hệ', active: false },
      { label: 'Tự nhận thức', active: false }
    ];

    list.innerHTML = topics.map(t => `
      <li>
        <button class="w-full text-left px-3 py-2 rounded-lg transition-colors topic-filter ${t.active ? 'active' : 'text-ink/80 hover:bg-paper'}">
          ${t.label}
        </button>
      </li>
    `).join('');
  },

  renderFilterTabs() {
    const tabs = document.getElementById('resources-filter-tabs');
    if (!tabs) return;

    const filters = [
      { label: 'Tất cả', id: 'all' },
      { label: 'Bài viết (24)', id: 'article' },
      { label: 'Video (11)', id: 'video' },
      { label: 'Sổ tay (8)', id: 'notebook' },
      { label: 'Workshop (5)', id: 'workshop' }
    ];

    tabs.innerHTML = filters.map(f => `
      <button 
        onclick="ResourcesPage.filterByType('${f.id}')"
        class="px-3 py-1.5 rounded-full ${this.currentFilter === f.id ? 'bg-sage-deep text-white font-semibold' : 'bg-white border border-card-border text-ink/70 hover:bg-paper'}"
      >
        ${f.label}
      </button>
    `).join('');
  },

  renderAI2Recommendation() {
    const card = document.getElementById('ai2-recommendation-card');
    if (!card) return;

    const aiRec = CampusAI.resourceRecommender.recommendations[this.currentAiRecommendationIndex];
    
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full text-xs font-bold">
          <span>✦</span>
          <span>AI-2 · GỢI Ý DÀNH CHO BẠN</span>
        </div>
        <span class="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
          ${aiRec.confidence}
        </span>
      </div>

      <div>
        <h3 class="font-serif text-2xl font-bold text-ink hover:text-amber-800 cursor-pointer" onclick="App.openResourceReader('res-ai-highlight')">
          ${aiRec.title}
        </h3>

        <div class="mt-3 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/80 text-xs">
          <span class="font-bold text-amber-900 block mb-0.5 uppercase text-[10px] tracking-wider">VÌ SAO CÓ KẾT QUẢ NÀY?</span>
          <p class="text-amber-950/80 leading-relaxed">
            ${aiRec.reason}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div class="flex items-center gap-2">
          <button onclick="App.openResourceReader('res-ai-highlight')" class="px-4 py-2 bg-amber-ai hover:bg-amber-600 text-ink font-bold text-xs rounded-xl shadow-xs transition-colors">
            Đọc ngay
          </button>
          <button onclick="ResourcesPage.toggleBookmark('res-ai-highlight')" class="px-4 py-2 bg-white border border-card-border hover:bg-paper text-ink text-xs font-medium rounded-xl transition-colors">
            Lưu
          </button>
          <button onclick="ResourcesPage.regenerateAI2()" class="px-4 py-2 bg-white border border-card-border hover:bg-paper text-ink text-xs font-medium rounded-xl transition-colors">
            Tạo lại
          </button>
        </div>
        <div class="text-[11px] text-ink/50">
          Cập nhật theo sở thích đọc gần nhất
        </div>
      </div>
    `;
  },

  renderResources() {
    const grid = document.getElementById('resources-grid');
    if (!grid) return;

    const resources = CAMPUS_DATA.resources
      .filter(r => r.id !== 'res-ai-highlight')
      .slice(0, 6);

    grid.innerHTML = resources.map(r => `
      <div class="bg-white rounded-2xl p-5 border border-card-border flex flex-col justify-between resource-card" onclick="App.openResourceReader('${r.id}')">
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs text-ink/60">
            <span class="inline-flex items-center gap-1 font-semibold text-sage-deep">
              <i data-lucide="${r.type.includes('Video') ? 'video' : r.type.includes('Sổ') ? 'file-text' : 'book-open'}" class="w-3.5 h-3.5"></i>
              ${r.type}
            </span>
            <span>${r.duration}</span>
          </div>

          <h4 class="font-serif font-bold text-base text-ink line-clamp-2 leading-snug">${r.title}</h4>
          <p class="text-xs text-ink/70 line-clamp-2 leading-relaxed">${r.summary}</p>
        </div>

        <div class="pt-4 mt-4 border-t border-card-border flex items-center justify-between text-xs text-ink/50">
          <span>${r.views} lượt xem</span>
          <button onclick="event.stopPropagation(); ResourcesPage.toggleBookmark('${r.id}')" class="p-1 hover:text-clay-alert">
            <i data-lucide="heart" class="w-4 h-4 ${r.bookmarked ? 'fill-clay-alert text-clay-alert' : ''}"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  filterByType(typeId) {
    this.currentFilter = typeId;
    this.renderFilterTabs();
    this.renderResources();
  },

  handleSearch(query) {
    this.currentSearch = query;
    this.renderResources();
  },

  regenerateAI2() {
    const next = CampusAI.resourceRecommender.getNextRecommendation(this.currentAiRecommendationIndex);
    this.currentAiRecommendationIndex = next.nextIndex;
    this.renderAI2Recommendation();
    App.showToast('Đã tạo gợi ý tài nguyên mới dựa trên hồ sơ của bạn', 'info');
    if (window.lucide) lucide.createIcons();
  },

  toggleBookmark(id) {
    const res = CAMPUS_DATA.resources.find(r => r.id === id);
    if (res) {
      res.bookmarked = !res.bookmarked;
      App.showToast(res.bookmarked ? `Đã lưu: ${res.title}` : `Đã bỏ lưu: ${res.title}`, 'info');
      this.renderResources();
    }
  }
};

// Auto-initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ResourcesPage.init());
} else {
  ResourcesPage.init();
}

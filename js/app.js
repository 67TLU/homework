/**
 * CampusMind - Single Page Application Core Controller
 * Orchestrates Routing, State, AI Integrations, and 16-Slide Visuals
 */

const App = {
  currentRoute: 'home',
  currentRole: 'student', // 'student', 'counselor', 'admin', 'guest'
  selectedCategory: 'all',
  searchQuery: '',
  aiQuizStep: 0,
  aiQuizAnswers: {},
  currentAiRecommendationIndex: 0,
  bookingWizardState: {
    step: 3,
    serviceId: 'srv-01',
    counselorId: 'counselor-01',
    slotTime: 'Thứ Năm, 05/06/2025 · 13:30 – 14:15',
    studentName: 'Lê Ngọc An',
    studentEmail: 'ngocan@student.edu.vn',
    topic: 'Áp lực học tập & thi cử',
    notes: 'Dạo này mình thấy quá tải với lịch thi cuối kỳ...',
    includePrepExercise: true
  },
  ai3ErrorMode: false,

  init() {
    this.renderWorkspaceButton();
    this.navigateTo('home');
    this.setupKeyboardShortcuts();
    this.renderSlideDeckModalGrid();
  },

  // Switch Roles seamlessly
  switchRole(role) {
    this.currentRole = role;
    const selector = document.getElementById('role-selector');
    if (selector) selector.value = role;

    this.renderWorkspaceButton();

    this.showToast(`Đã chuyển sang vai trò: ${this.getRoleLabel(role)}`, 'info');

    // Auto-navigate to appropriate default dashboard
    if (role === 'student' && this.currentRoute === 'home') {
      this.navigateTo('student-dashboard');
    } else if (role === 'counselor') {
      this.navigateTo('counselor-schedule');
    } else if (role === 'admin') {
      this.navigateTo('admin-dashboard');
    } else {
      this.refreshCurrentView();
    }
  },

  getRoleLabel(role) {
    switch (role) {
      case 'student': return 'Sinh viên (Lê Ngọc An)';
      case 'counselor': return 'Chuyên viên (TS. Minh Hà)';
      case 'admin': return 'Quản trị viên (Admin)';
      default: return 'Khách vãng lai';
    }
  },

  renderWorkspaceButton() {
    const container = document.getElementById('workspace-action-btn');
    if (!container) return;

    if (this.currentRole === 'student') {
      container.innerHTML = `
        <button onclick="App.navigateTo('student-dashboard')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage-tint text-sage-deep hover:bg-sage/20 text-xs font-semibold">
          <img src="${CAMPUS_DATA.currentUser.avatar}" class="w-5 h-5 rounded-full object-cover">
          <span>Không gian của An</span>
        </button>
      `;
    } else if (this.currentRole === 'counselor') {
      container.innerHTML = `
        <button onclick="App.navigateTo('counselor-schedule')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-semibold">
          <i data-lucide="stethoscope" class="w-3.5 h-3.5"></i>
          <span>Lịch TS. Minh Hà</span>
        </button>
      `;
    } else if (this.currentRole === 'admin') {
      container.innerHTML = `
        <button onclick="App.navigateTo('admin-dashboard')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 text-xs font-semibold">
          <i data-lucide="shield" class="w-3.5 h-3.5 text-sage"></i>
          <span>Admin Hub</span>
        </button>
      `;
    } else {
      container.innerHTML = `
        <button onclick="App.navigateTo('login')" class="px-3 py-1.5 rounded-lg text-ink/80 hover:bg-paper text-xs font-medium border border-card-border">
          Đăng nhập
        </button>
      `;
    }
    if (window.lucide) lucide.createIcons();
  },

  // View Navigation Router
  navigateTo(route, params = {}) {
    this.currentRoute = route;
    const viewContainer = document.getElementById('app-view');
    const quickSelect = document.getElementById('quick-screen-select');
    if (quickSelect) quickSelect.value = route;

    // Update active nav-links
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-route') === route) {
        link.classList.add('text-sage', 'bg-sage-tint/40');
      } else {
        link.classList.remove('text-sage', 'bg-sage-tint/40');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (route) {
      case 'home':
        viewContainer.innerHTML = this.renderHomeView();
        break;
      case 'services':
        viewContainer.innerHTML = this.renderServicesView();
        break;
      case 'resources':
        viewContainer.innerHTML = this.renderResourcesView();
        break;
      case 'counselor':
        viewContainer.innerHTML = this.renderCounselorProfileView();
        break;
      case 'student-dashboard':
        viewContainer.innerHTML = this.renderStudentDashboardView();
        break;
      case 'student-booking':
        viewContainer.innerHTML = this.renderBookingWizardView();
        break;
      case 'student-appointments':
        viewContainer.innerHTML = this.renderStudentAppointmentsView();
        break;
      case 'counselor-schedule':
        viewContainer.innerHTML = this.renderCounselorScheduleView();
        break;
      case 'counselor-note':
        viewContainer.innerHTML = this.renderCounselorNoteView();
        break;
      case 'admin-dashboard':
        viewContainer.innerHTML = this.renderAdminDashboardView();
        break;
      case 'admin-services':
        viewContainer.innerHTML = this.renderAdminServicesView();
        break;
      case 'login':
        viewContainer.innerHTML = this.renderLoginView();
        break;
      case '404':
        viewContainer.innerHTML = this.render404View();
        break;
      case '403':
        viewContainer.innerHTML = this.render403View();
        break;
      case 'design-system':
        viewContainer.innerHTML = this.renderDesignSystemView();
        break;
      default:
        viewContainer.innerHTML = this.render404View();
    }

    if (window.lucide) lucide.createIcons();
  },

  refreshCurrentView() {
    this.navigateTo(this.currentRoute);
  },

  /* =========================================================================
   * VIEW 1: HOME & HERO (Slide 02)
   * ========================================================================= */
  renderHomeView() {
    return `
      <div class="space-y-12">
        <!-- Hero Section -->
        <section class="bg-white rounded-3xl p-8 @sm:p-12 @lg:p-16 border border-card-border shadow-sm relative overflow-hidden">
          <div class="max-w-2xl space-y-6 relative z-10">
            <div class="inline-flex items-center gap-2 bg-sage-tint text-sage-deep px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span class="w-1.5 h-1.5 rounded-full bg-sage"></span>
              Dành cho sinh viên
            </div>
            
            <h1 class="font-serif text-4xl @sm:text-5xl @lg:text-6xl font-bold text-ink tracking-tight leading-[1.15]">
              Bạn không phải<br>đối mặt một mình.
            </h1>
            
            <p class="text-base @sm:text-lg text-ink/75 leading-relaxed">
              Đặt lịch tư vấn, khám phá dịch vụ hỗ trợ và theo dõi hành trình wellbeing của bạn — tất cả tại một nơi.
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="App.navigateTo('services')" class="bg-sage hover:bg-sage-deep text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                <i data-lucide="compass" class="w-4 h-4"></i>
                Khám phá dịch vụ
              </button>
              <button onclick="App.openAIQuizModal()" class="bg-paper hover:bg-card-border/60 text-ink px-6 py-3 rounded-xl font-semibold text-sm border border-card-border transition-all flex items-center gap-2">
                <span class="text-amber-ai font-bold">✦</span>
                Kiểm tra nhu cầu với AI
              </button>
            </div>
          </div>

          <!-- Abstract Decorative Leaf Graphics -->
          <div class="absolute right-0 -bottom-10 @lg:bottom-0 w-80 @lg:w-96 opacity-20 @lg:opacity-30 pointer-events-none text-sage">
            <svg viewBox="0 0 200 200" fill="currentColor">
              <path d="M47.7,-64.3C61.4,-54.6,71.8,-40.4,76.5,-24.5C81.3,-8.6,80.4,9,73.6,23.8C66.8,38.6,54.1,50.7,39.9,59.2C25.7,67.7,9.9,72.7,-6.2,71.2C-22.3,69.7,-38.6,61.8,-51.2,49.8C-63.8,37.8,-72.7,21.8,-74.6,4.5C-76.4,-12.8,-71.2,-31.4,-60.1,-43.3C-48.9,-55.3,-31.7,-60.5,-15.7,-64.1C0.2,-67.7,16.1,-69.7,33.9,-73.9L47.7,-64.3Z" transform="translate(100 100)" />
            </svg>
          </div>
        </section>

        <!-- 4 Entry Cards (Slide 02) -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-serif text-2xl font-bold text-ink">Bốn lối vào dịch vụ chính</h2>
            <span class="text-xs text-ink/50">Bắt đầu chỉ trong 3 giây</span>
          </div>

          <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
            <!-- Card 1: Tư vấn cá nhân -->
            <div onclick="App.navigateTo('counselor')" class="interactive-card bg-white p-6 rounded-2xl border border-card-border cursor-pointer group">
              <div class="w-12 h-12 rounded-xl bg-sage-tint text-sage-deep flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <i data-lucide="user-check" class="w-6 h-6"></i>
              </div>
              <h3 class="font-serif font-bold text-lg text-ink mb-1 group-hover:text-sage transition-colors">Tư vấn cá nhân</h3>
              <p class="text-xs text-ink/70 leading-relaxed">
                Đặt lịch với chuyên viên tâm lý học đường riêng tư và bảo mật.
              </p>
              <div class="mt-4 pt-3 border-t border-card-border flex items-center justify-between text-xs font-semibold text-sage">
                <span>Chọn lịch trống</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </div>
            </div>

            <!-- Card 2: Workshop -->
            <div onclick="App.navigateTo('services')" class="interactive-card bg-white p-6 rounded-2xl border border-card-border cursor-pointer group">
              <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <i data-lucide="users" class="w-6 h-6"></i>
              </div>
              <h3 class="font-serif font-bold text-lg text-ink mb-1 group-hover:text-amber-700 transition-colors">Workshop</h3>
              <p class="text-xs text-ink/70 leading-relaxed">
                Kỹ năng quản trị cảm xúc, vượt qua trì hoãn và áp lực học tập.
              </p>
              <div class="mt-4 pt-3 border-t border-card-border flex items-center justify-between text-xs font-semibold text-amber-700">
                <span>Xem lịch mở</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </div>
            </div>

            <!-- Card 3: Tài nguyên tự hỗ trợ -->
            <div onclick="App.navigateTo('resources')" class="interactive-card bg-white p-6 rounded-2xl border border-card-border cursor-pointer group">
              <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-info flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <i data-lucide="book-open" class="w-6 h-6"></i>
              </div>
              <h3 class="font-serif font-bold text-lg text-ink mb-1 group-hover:text-sky-info transition-colors">Tài nguyên tự hỗ trợ</h3>
              <p class="text-xs text-ink/70 leading-relaxed">
                Bài viết, audio thiền, video ngắn và sổ tay theo chủ đề.
              </p>
              <div class="mt-4 pt-3 border-t border-card-border flex items-center justify-between text-xs font-semibold text-sky-info">
                <span>48 nội dung</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </div>
            </div>

            <!-- Card 4: AI Navigator -->
            <div onclick="App.openAIQuizModal()" class="interactive-card bg-sage-deep text-white p-6 rounded-2xl border border-sage cursor-pointer group relative overflow-hidden">
              <div class="w-12 h-12 rounded-xl bg-white/10 text-amber-ai flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span class="text-xl font-bold">✦</span>
              </div>
              <div class="inline-block bg-amber-ai/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1">
                AI Navigator
              </div>
              <h3 class="font-serif font-bold text-lg text-white mb-1">Chưa rõ bắt đầu?</h3>
              <p class="text-xs text-white/80 leading-relaxed">
                Trả lời 4 câu hỏi để AI phân loại nhu cầu và gợi ý lộ trình phù hợp.
              </p>
              <div class="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-amber-300">
                <span>Khảo sát nhanh</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </div>
            </div>
          </div>
        </section>

        <!-- Quick Proof of Safety & Trust -->
        <section class="bg-paper border border-card-border rounded-2xl p-6 @sm:p-8 flex flex-col @md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-sage text-white flex items-center justify-center shrink-0">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <div>
              <h4 class="font-serif font-bold text-base text-ink">Bảo mật thông tin & Không chẩn đoán y khoa</h4>
              <p class="text-xs text-ink/70">
                Mọi chia sẻ của sinh viên đều được giữ kín theo quy chuẩn bảo mật học đường. AI chỉ hỗ trợ điều hướng, không đưa ra phán đoán tâm thần học.
              </p>
            </div>
          </div>
          <button onclick="App.switchRole('student'); App.navigateTo('student-dashboard')" class="shrink-0 px-4 py-2 bg-white border border-card-border text-xs font-semibold rounded-lg hover:bg-sage-tint/30 text-sage-deep">
            Trải nghiệm tài khoản sinh viên →
          </button>
        </section>
      </div>
    `;
  },

  /* =========================================================================
   * VIEW 2: SERVICES CATALOG (Slide 03)
   * ========================================================================= */
  renderServicesView() {
    const services = CAMPUS_DATA.services;
    const filterCat = this.selectedCategory;

    const filtered = services.filter(s => {
      const matchCat = filterCat === 'all' || s.category === filterCat;
      const matchSearch = !this.searchQuery || s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || s.summary.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    return `
      <div class="grid grid-cols-1 @lg:grid-cols-4 gap-8">
        <!-- Sidebar Filters & AI Navigator Banner (Slide 03) -->
        <div class="space-y-6">
          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-sm">
            <h3 class="text-xs font-bold uppercase tracking-wider text-ink/50 mb-3">DANH MỤC</h3>
            <ul class="space-y-1 text-xs">
              ${[
                { label: 'Tất cả dịch vụ', id: 'all', count: 12 },
                { label: 'Tư vấn cá nhân', id: 'Tư vấn cá nhân', count: 5 },
                { label: 'Workshop nhóm', id: 'Workshop nhóm', count: 3 },
                { label: 'Hỗ trợ học tập', id: 'Hỗ trợ học tập', count: 2 },
                { label: 'Giấc ngủ & thư giãn', id: 'Giấc ngủ & thư giãn', count: 3 },
                { label: 'Quan hệ & giao tiếp', id: 'Quan hệ & giao tiếp', count: 3 }
              ].map(cat => `
                <li>
                  <button onclick="App.filterCategory('${cat.id}')" class="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${filterCat === cat.id ? 'bg-sage text-white font-semibold' : 'text-ink/80 hover:bg-paper'}">
                    <span>${cat.label}</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded-full ${filterCat === cat.id ? 'bg-white/20 text-white' : 'bg-paper text-ink/60'}">${cat.count}</span>
                  </button>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- AI Navigator Callout Box (Slide 03) -->
          <div class="bg-gradient-to-br from-sage-deep to-[#143B30] text-white p-5 rounded-2xl shadow-sm border border-sage space-y-3">
            <div class="flex items-center gap-1.5 text-amber-ai text-xs font-bold">
              <span>✦</span>
              <span>AI NAVIGATOR</span>
            </div>
            <p class="text-xs text-white/90 leading-relaxed">
              Chưa biết nên chọn dịch vụ nào? Trả lời 4 câu hỏi ngắn để được gợi ý tức thì.
            </p>
            <button onclick="App.openAIQuizModal()" class="w-full py-2 bg-amber-ai hover:bg-amber-500 text-ink font-bold text-xs rounded-xl transition-all shadow">
              Bắt đầu đánh giá
            </button>
          </div>
        </div>

        <!-- Main Services Grid -->
        <div class="@lg:col-span-3 space-y-6">
          <!-- Header and search bar -->
          <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-card-border">
            <div>
              <h2 class="font-serif text-2xl font-bold text-ink">Dịch vụ hỗ trợ</h2>
              <p class="text-xs text-ink/60 mt-0.5">12 dịch vụ đang hoạt động · cập nhật 02/06/2025</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="relative">
                <i data-lucide="search" class="w-3.5 h-3.5 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2"></i>
                <input 
                  type="text" 
                  value="${this.searchQuery}"
                  oninput="App.handleServiceSearch(this.value)"
                  placeholder="Tìm dịch vụ..." 
                  class="pl-8 pr-3 py-1.5 text-xs bg-paper rounded-lg border border-card-border focus:outline-none focus:border-sage text-ink"
                />
              </div>

              <select class="text-xs bg-paper border border-card-border rounded-lg px-2.5 py-1.5 text-ink focus:outline-none focus:border-sage">
                <option>Sắp xếp: Phổ biến ▾</option>
                <option>Mới nhất</option>
                <option>Thời lượng ngắn nhất</option>
              </select>
            </div>
          </div>

          <!-- Filter Chips -->
          <div class="flex flex-wrap gap-2 text-xs">
            ${[
              { label: 'Tất cả (12)', id: 'all' },
              { label: 'Tư vấn cá nhân (5)', id: 'Tư vấn cá nhân' },
              { label: 'Workshop (3)', id: 'Workshop nhóm' },
              { label: 'Học tập (2)', id: 'Hỗ trợ học tập' },
              { label: 'Giấc ngủ (2)', id: 'Giấc ngủ & thư giãn' }
            ].map(chip => `
              <button onclick="App.filterCategory('${chip.id}')" class="px-3 py-1.5 rounded-full border transition-all ${filterCat === chip.id ? 'bg-sage-deep text-white border-sage-deep font-semibold shadow-xs' : 'bg-white text-ink/70 border-card-border hover:bg-paper'}">
                ${chip.label}
              </button>
            `).join('')}
          </div>

          <!-- Services Cards Grid (Slide 03) -->
          <div class="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-5">
            ${filtered.map(svc => `
              <div class="bg-white rounded-2xl p-5 border border-card-border flex flex-col justify-between interactive-card">
                <div class="space-y-3">
                  <!-- Badges -->
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
                  ${svc.category === 'Giấc ngủ & thư giãn' && svc.format.includes('Online') ? `
                    <button onclick="App.navigateTo('resources')" class="px-3 py-1.5 bg-paper hover:bg-card-border/60 text-ink font-semibold rounded-lg transition-colors">
                      Bắt đầu học
                    </button>
                  ` : svc.category === 'Workshop nhóm' ? `
                    <button onclick="App.showServiceDetail('${svc.id}')" class="px-3 py-1.5 bg-paper hover:bg-card-border/60 text-ink font-semibold rounded-lg transition-colors">
                      Xem chi tiết
                    </button>
                  ` : `
                    <button onclick="App.selectServiceForBooking('${svc.id}')" class="px-3 py-1.5 bg-sage hover:bg-sage-deep text-white font-semibold rounded-lg transition-colors shadow-xs">
                      Đặt lịch
                    </button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  filterCategory(cat) {
    this.selectedCategory = cat;
    this.refreshCurrentView();
  },

  handleServiceSearch(query) {
    this.searchQuery = query;
    this.refreshCurrentView();
  },

  /* =========================================================================
   * VIEW 3: SELF-HELP RESOURCES & AI-2 (Slide 04)
   * ========================================================================= */
  renderResourcesView() {
    const aiRec = CampusAI.resourceRecommender.recommendations[this.currentAiRecommendationIndex];
    const resources = CAMPUS_DATA.resources;

    return `
      <div class="grid grid-cols-1 @lg:grid-cols-4 gap-8">
        <!-- Sidebar Topics (Slide 04) -->
        <div class="space-y-6">
          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-sm">
            <h3 class="text-xs font-bold uppercase tracking-wider text-ink/50 mb-3">CHỦ ĐỀ</h3>
            <ul class="space-y-1.5 text-xs">
              ${[
                { label: 'Lo âu & căng thẳng', active: true },
                { label: 'Động lực học tập', active: false },
                { label: 'Giấc ngủ', active: false },
                { label: 'Mối quan hệ', active: false },
                { label: 'Tự nhận thức', active: false }
              ].map(t => `
                <li>
                  <button class="w-full text-left px-3 py-2 rounded-lg transition-colors ${t.active ? 'bg-sage-tint text-sage-deep font-semibold' : 'text-ink/80 hover:bg-paper'}">
                    ${t.label}
                  </button>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Saved Counter Box (Slide 04) -->
          <div class="bg-paper p-5 rounded-2xl border border-card-border text-xs space-y-2">
            <div class="flex items-center gap-2 text-ink">
              <i data-lucide="bookmark" class="w-4 h-4 text-sage"></i>
              <span>Bạn đã lưu <strong>7 tài nguyên</strong> trong tháng này.</span>
            </div>
            <button onclick="App.showToast('Hiển thị danh sách 7 tài nguyên đã lưu', 'info')" class="text-sage font-bold hover:underline block pt-1">
              Xem đã lưu →
            </button>
          </div>
        </div>

        <!-- Main Resources Area -->
        <div class="@lg:col-span-3 space-y-6">
          <!-- Header and search bar -->
          <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-card-border">
            <div>
              <h2 class="font-serif text-2xl font-bold text-ink">Kho tài nguyên</h2>
              <p class="text-xs text-ink/60 mt-0.5">48 nội dung · bài viết · video · sổ tay · workshop</p>
            </div>

            <div class="relative w-full @sm:w-64">
              <i data-lucide="search" class="w-3.5 h-3.5 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input 
                type="text" 
                placeholder="Tìm theo từ khóa..." 
                class="w-full pl-8 pr-3 py-1.5 text-xs bg-paper rounded-lg border border-card-border focus:outline-none focus:border-sage text-ink"
              />
            </div>
          </div>

          <!-- Filter Tabs -->
          <div class="flex flex-wrap gap-2 text-xs">
            <button class="px-3 py-1.5 rounded-full bg-sage-deep text-white font-semibold">Tất cả</button>
            <button class="px-3 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Bài viết (24)</button>
            <button class="px-3 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Video (11)</button>
            <button class="px-3 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Sổ tay (8)</button>
            <button class="px-3 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Workshop (5)</button>
          </div>

          <!-- AI-2 RECOMMENDATION CARD (Slide 04) -->
          <div class="bg-gradient-to-r from-[#FFFDF9] to-[#FEFBF4] border-2 border-amber-300 rounded-2xl p-6 shadow-sm relative space-y-4">
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
                <button onclick="App.toggleBookmark('res-ai-highlight')" id="ai-rec-save-btn" class="px-4 py-2 bg-white border border-card-border hover:bg-paper text-ink text-xs font-medium rounded-xl transition-colors">
                  Lưu
                </button>
                <button onclick="App.regenerateAI2Recommendation()" class="px-4 py-2 bg-white border border-card-border hover:bg-paper text-ink text-xs font-medium rounded-xl transition-colors">
                  Tạo lại
                </button>
                <button onclick="App.dismissAI2Recommendation()" class="px-3 py-2 text-ink/50 hover:text-clay-alert text-xs font-medium transition-colors">
                  Từ chối
                </button>
              </div>

              <div class="text-[11px] text-ink/50">
                Cập nhật theo sở thích đọc gần nhất
              </div>
            </div>
          </div>

          <!-- Regular Resources Grid (Slide 04) -->
          <div class="grid grid-cols-1 @md:grid-cols-3 gap-5">
            ${resources.filter(r => r.id !== 'res-ai-highlight').slice(0, 6).map(r => `
              <div class="bg-white rounded-2xl p-5 border border-card-border flex flex-col justify-between interactive-card cursor-pointer" onclick="App.openResourceReader('${r.id}')">
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
                  <button onclick="event.stopPropagation(); App.toggleBookmark('${r.id}')" class="p-1 hover:text-clay-alert">
                    <i data-lucide="heart" class="w-4 h-4 ${r.bookmarked ? 'fill-clay-alert text-clay-alert' : ''}"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  regenerateAI2Recommendation() {
    const next = CampusAI.resourceRecommender.getNextRecommendation(this.currentAiRecommendationIndex);
    this.currentAiRecommendationIndex = next.nextIndex;
    this.refreshCurrentView();
    this.showToast('Đã tạo gợi ý tài nguyên mới dựa trên hồ sơ của bạn', 'info');
  },

  dismissAI2Recommendation() {
    this.showToast('Đã ghi nhận phản hồi để tối ưu thuật toán gợi ý', 'info');
  },

  /* =========================================================================
   * VIEW 4: COUNSELOR PROFILE & SLOTS (Slide 05)
   * ========================================================================= */
  renderCounselorProfileView() {
    const counselor = CAMPUS_DATA.counselors[0]; // TS. Nguyễn Minh Hà

    return `
      <div class="space-y-8">
        <!-- Counselor Header Card -->
        <div class="bg-white rounded-3xl p-6 @sm:p-8 border border-card-border shadow-sm flex flex-col @md:flex-row items-start @md:items-center justify-between gap-6">
          <div class="flex flex-col @sm:flex-row items-start @sm:items-center gap-5">
            <img src="${counselor.avatar}" class="w-24 h-24 rounded-2xl object-cover shadow border-2 border-sage-tint" alt="${counselor.name}">
            
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="status-pill status-confirmed text-xs">
                  <span class="status-dot"></span>
                  <span>${counselor.status}</span>
                </span>
                <span class="text-xs text-ink/50 font-medium">${counselor.office}</span>
              </div>

              <h2 class="font-serif text-3xl font-bold text-ink">${counselor.name}</h2>
              <p class="text-xs text-ink/70 font-medium">${counselor.title}</p>

              <!-- Tags (Slide 05) -->
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${counselor.tags.map(tag => `
                  <span class="px-2.5 py-0.5 rounded-full bg-paper border border-card-border text-[11px] text-ink/80">${tag}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Stats (Slide 05) -->
          <div class="flex items-center gap-6 border-t @md:border-t-0 @md:border-l border-card-border pt-4 @md:pt-0 @md:pl-8 text-center w-full @md:w-auto justify-around">
            <div>
              <div class="font-serif text-2xl font-bold text-ink">${counselor.rating}</div>
              <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider">ĐÁNH GIÁ</div>
            </div>
            <div>
              <div class="font-serif text-2xl font-bold text-ink">${counselor.reviewCount}</div>
              <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider">BUỔI TƯ VẤN</div>
            </div>
            <div>
              <div class="font-serif text-2xl font-bold text-ink">${counselor.responseTime}</div>
              <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider">PHẢN HỒI</div>
            </div>
          </div>
        </div>

        <!-- Quote Card (Slide 05) -->
        <div class="bg-[#F8F5EE] border-l-4 border-sage p-5 rounded-r-2xl italic text-ink/85 text-sm @sm:text-base leading-relaxed flex flex-col @sm:flex-row items-start @sm:items-center justify-between gap-4">
          <p>${counselor.quote}</p>
          <div class="flex items-center gap-2 shrink-0 not-italic">
            <button onclick="App.startBooking()" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white font-semibold text-xs rounded-xl shadow-xs transition-colors">
              Đặt lịch tư vấn
            </button>
            <button onclick="App.showToast('Mở cửa sổ nhắn tin trao đổi sơ bộ với chuyên viên', 'info')" class="px-4 py-2 bg-white border border-card-border text-ink text-xs font-semibold rounded-xl hover:bg-paper transition-colors">
              Nhắn tin
            </button>
          </div>
        </div>

        <!-- Weekly Slot Grid (Slide 05) -->
        <div class="bg-white rounded-3xl p-6 @sm:p-8 border border-card-border shadow-sm space-y-6">
          <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4">
            <div>
              <h3 class="font-serif text-2xl font-bold text-ink">Khung giờ trống</h3>
              <p class="text-xs text-ink/60 mt-0.5">Tuần ${counselor.schedule.week} · múi giờ GMT+7</p>
            </div>

            <!-- Controls & Legend -->
            <div class="flex flex-wrap items-center gap-3">
              <div class="inline-flex rounded-lg border border-card-border bg-paper p-0.5 text-xs font-medium">
                <button class="px-2.5 py-1 hover:bg-white rounded">‹ Tuần trước</button>
                <button class="px-3 py-1 bg-white font-bold rounded shadow-xs">Tuần này</button>
                <button class="px-2.5 py-1 hover:bg-white rounded">Tuần sau ›</button>
              </div>
            </div>
          </div>

          <!-- Color Status Legend (Slide 05) -->
          <div class="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span class="status-pill status-confirmed">
              <span class="status-dot"></span>
              <span>Còn trống</span>
            </span>
            <span class="status-pill status-archived">
              <span class="status-dot"></span>
              <span>Đã kín</span>
            </span>
            <span class="status-pill status-pending">
              <span class="status-dot"></span>
              <span>Chờ duyệt</span>
            </span>
            <span class="status-pill status-cancelled">
              <span class="status-dot"></span>
              <span>Nghỉ / đóng</span>
            </span>
          </div>

          <!-- Time Grid 4 Columns -->
          <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4 pt-2">
            ${['T2 · 02/06', 'T3 · 03/06', 'T4 · 04/06', 'T5 · 05/06'].map(day => `
              <div class="bg-paper p-3 rounded-2xl border border-card-border/80 space-y-2.5">
                <div class="font-semibold text-xs text-ink/70 px-1 py-0.5 text-center border-b border-card-border/60 pb-2">
                  ${day}
                </div>

                <div class="space-y-2">
                  ${counselor.schedule.slots.filter(s => s.day === day).map(slot => {
                    let btnClass = '';
                    let label = '';
                    let clickable = false;

                    if (slot.status === 'available') {
                      btnClass = 'bg-[#EBF7F2] text-[#1D6A4E] border-[#CBEAD9] hover:bg-[#D5EFE3] hover:border-sage';
                      label = 'Còn trống';
                      clickable = true;
                    } else if (slot.status === 'booked') {
                      btnClass = 'bg-[#F2EFEA] text-[#696C6A] border-[#E0DCD4] cursor-not-allowed';
                      label = 'Đã kín';
                    } else if (slot.status === 'pending') {
                      btnClass = 'bg-[#FEF7EA] text-[#A66A12] border-[#F8E2BC] cursor-not-allowed';
                      label = 'Chờ duyệt';
                    } else {
                      btnClass = 'bg-[#FDF0EB] text-[#A3401F] border-[#F7D2C4] cursor-not-allowed';
                      label = 'Nghỉ / đóng';
                    }

                    return `
                      <button 
                        ${clickable ? `onclick="App.selectSlotForBooking('${day}', '${slot.time}')"` : 'disabled'}
                        class="w-full text-left p-2.5 rounded-xl border text-xs flex flex-col gap-1 transition-all ${btnClass}"
                      >
                        <span class="font-bold font-mono text-[11px]">${slot.time}</span>
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-medium opacity-90">${label}</span>
                          ${clickable ? '<span class="text-[10px] underline font-bold">Đặt ngay</span>' : ''}
                        </div>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /* =========================================================================
   * VIEW 5: STUDENT DASHBOARD & AI-1 (Slide 06)
   * ========================================================================= */
  renderStudentDashboardView() {
    const user = CAMPUS_DATA.currentUser;
    const apts = CAMPUS_DATA.appointments;

    return `
      <div class="space-y-8">
        <!-- Student Header -->
        <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-card-border shadow-sm">
          <div class="flex items-center gap-4">
            <img src="${user.avatar}" class="w-14 h-14 rounded-2xl object-cover border-2 border-sage-tint shadow" alt="${user.name}">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="font-serif text-2xl font-bold text-ink">Chào buổi chiều, An 👋</h2>
                <span class="px-2 py-0.5 rounded-md bg-sage-tint text-sage-deep text-[11px] font-bold">${user.code}</span>
              </div>
              <p class="text-xs text-ink/60 mt-0.5">Thứ Ba, 03/06/2025 · Bạn có <strong>1 lịch hẹn</strong> trong tuần này</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <button onclick="App.exportStudentJournal()" class="px-4 py-2 border border-card-border rounded-xl text-xs font-semibold hover:bg-paper text-ink transition-colors flex items-center gap-1.5">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              Xuất nhật ký
            </button>
            <button onclick="App.startBooking()" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              Đặt lịch tư vấn
            </button>
          </div>
        </div>

        <!-- 4 KPI Metrics Cards (Slide 06) -->
        <div class="grid grid-cols-2 @lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">LỊCH HẸN SẮP TỚI</div>
            <div class="font-serif text-3xl font-bold text-ink">2</div>
            <div class="text-xs text-ink/60 mt-1">Gần nhất: 05/06 · 13:30</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">BUỔI ĐÃ HOÀN THÀNH</div>
            <div class="font-serif text-3xl font-bold text-ink">${user.completedSessions}</div>
            <div class="text-xs text-sage font-medium mt-1">+2 so với tháng trước</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">TÀI NGUYÊN ĐÃ LƯU</div>
            <div class="font-serif text-3xl font-bold text-ink">${user.savedResourcesCount}</div>
            <div class="text-xs text-amber-700 font-medium mt-1">3 chưa đọc</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">MỨC CĂNG THẲNG TB</div>
            <div class="font-serif text-3xl font-bold text-ink">${user.avgStressScore}</div>
            <div class="text-xs text-sage font-medium mt-1">${user.stressTrend}</div>
          </div>
        </div>

        <!-- AI-1 SUPPORT NAVIGATOR (Slide 06) -->
        <div class="bg-gradient-to-r from-[#FFFDF9] to-[#FEFBF4] border-2 border-amber-300 rounded-3xl p-6 @sm:p-8 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
              <span>✦</span>
              <span>AI-1 · SUPPORT NAVIGATOR</span>
            </div>
            <span class="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              Phù hợp cao
            </span>
          </div>

          <div class="space-y-2">
            <h3 class="font-serif text-xl @sm:text-2xl font-bold text-ink">Điểm bắt đầu phù hợp với bạn</h3>
            <p class="text-xs @sm:text-sm text-ink/80 leading-relaxed max-w-3xl">
              Câu trả lời của bạn cho thấy chủ đề <strong>“áp lực học tập”</strong> đang chiếm ưu thế. Gợi ý: bắt đầu bằng buổi <strong>Tư vấn cá nhân 1-1 (45 phút)</strong> trước khi tham gia workshop.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div class="flex flex-wrap items-center gap-2">
              <button onclick="App.startBooking()" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white font-semibold text-xs rounded-xl shadow-xs transition-colors">
                Chấp nhận gợi ý
              </button>
              <button onclick="App.openAIQuizModal()" class="px-4 py-2 bg-white border border-card-border hover:bg-paper text-ink text-xs font-semibold rounded-xl transition-colors">
                Sửa câu trả lời
              </button>
              <button onclick="App.showToast('AI-1 tính toán lại dịch vụ dự phòng: Workshop kỹ năng giải tỏa căng thẳng', 'info')" class="px-4 py-2 bg-white border border-card-border hover:bg-paper text-ink text-xs font-medium rounded-xl transition-colors">
                Tạo lại
              </button>
              <button onclick="App.showToast('Đã bỏ qua gợi ý này', 'info')" class="px-3 py-2 text-ink/50 hover:text-clay-alert text-xs font-medium transition-colors">
                Từ chối
              </button>
            </div>

            <div class="text-[11px] text-ink/50 italic">
              AI phân loại nhu cầu ở mức điều hướng, tuyệt đối không chẩn đoán.
            </div>
          </div>
        </div>

        <!-- Upcoming Sessions & Progress (Slide 06) -->
        <div class="grid grid-cols-1 @lg:grid-cols-2 gap-8">
          <!-- Upcoming Sessions List -->
          <div class="bg-white rounded-3xl p-6 border border-card-border shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-serif text-xl font-bold text-ink">Lịch hẹn gần nhất</h3>
              <button onclick="App.navigateTo('student-appointments')" class="text-xs text-sage font-bold hover:underline">
                Xem tất cả
              </button>
            </div>

            <div class="space-y-3">
              <div onclick="App.openAppointmentDrawer('APT-1042')" class="p-4 rounded-2xl bg-paper hover:bg-card-border/50 border border-card-border/60 transition-colors cursor-pointer flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="bg-white px-3 py-2 rounded-xl text-center border border-card-border shadow-xs">
                    <span class="block text-base font-serif font-bold text-ink">05</span>
                    <span class="block text-[10px] uppercase font-bold text-ink/50">TH6</span>
                  </div>
                  <div>
                    <h4 class="font-serif font-bold text-sm text-ink">Tư vấn cá nhân · TS. Nguyễn Minh Hà</h4>
                    <p class="text-xs text-ink/60 mt-0.5">13:30 – 14:15 · Phòng H-204</p>
                  </div>
                </div>
                <span class="status-pill status-confirmed text-xs">
                  <span class="status-dot"></span>
                  <span>Đã xác nhận</span>
                </span>
              </div>

              <div onclick="App.openAppointmentDrawer('APT-1043')" class="p-4 rounded-2xl bg-paper hover:bg-card-border/50 border border-card-border/60 transition-colors cursor-pointer flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="bg-white px-3 py-2 rounded-xl text-center border border-card-border shadow-xs">
                    <span class="block text-base font-serif font-bold text-ink">11</span>
                    <span class="block text-[10px] uppercase font-bold text-ink/50">TH4</span>
                  </div>
                  <div>
                    <h4 class="font-serif font-bold text-sm text-ink">Workshop quản trị cảm xúc</h4>
                    <p class="text-xs text-ink/60 mt-0.5">09:00 – 10:30 · Hội trường B</p>
                  </div>
                </div>
                <span class="status-pill status-pending text-xs">
                  <span class="status-dot"></span>
                  <span>Đang chờ</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Wellbeing Progress & Energy Chart (Slide 06) -->
          <div class="bg-white rounded-3xl p-6 border border-card-border shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-serif text-xl font-bold text-ink">Tiến trình hỗ trợ</h3>
                <p class="text-xs text-ink/60 mt-0.5">Lộ trình đồng hành học kỳ này</p>
              </div>
              <span class="font-serif font-bold text-lg text-sage-deep">4 / 6 BUỔI</span>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-paper rounded-full h-3 overflow-hidden border border-card-border">
              <div class="bg-sage h-full rounded-full transition-all duration-500" style="width: 66.6%;"></div>
            </div>

            <!-- Weekly Energy Rating Chart Simulation -->
            <div class="pt-4 border-t border-card-border space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="font-medium text-ink/70">Mức năng lượng tự đánh giá theo tuần</span>
                <span class="status-pill status-confirmed text-[11px]">
                  <span class="status-dot"></span>
                  <span>Cải thiện 18%</span>
                </span>
              </div>

              <!-- Bar visualizer -->
              <div class="h-24 flex items-end justify-between gap-2 pt-2 px-2">
                ${[
                  { week: 'T1', val: 40 },
                  { week: 'T2', val: 48 },
                  { week: 'T3', val: 45 },
                  { week: 'T4', val: 65 },
                  { week: 'T5', val: 75 },
                  { week: 'T6', val: 70 },
                  { week: 'T7', val: 82 }
                ].map(bar => `
                  <div class="flex-1 flex flex-col items-center gap-1.5 group">
                    <div class="w-full bg-sage-tint group-hover:bg-sage rounded-t-lg transition-colors" style="height: ${bar.val}%;"></div>
                    <span class="text-[10px] text-ink/50 font-medium">${bar.week}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* =========================================================================
   * VIEW 6: BOOKING WIZARD 4 STEPS (Slide 07)
   * ========================================================================= */
  renderBookingWizardView() {
    const state = this.bookingWizardState;

    return `
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center space-y-1">
          <span class="text-xs uppercase font-bold tracking-wider text-sage">LUỒNG ĐẶT LỊCH HỖ TRỢ</span>
          <h2 class="font-serif text-3xl font-bold text-ink">Bốn bước, không ngõ cụt</h2>
          <p class="text-xs text-ink/60">Wizard có thanh tiến độ, kiểm tra hợp lệ tại chỗ và tóm tắt rõ ràng</p>
        </div>

        <!-- Stepper Progress Bar (Slide 07) -->
        <div class="bg-white p-4 rounded-2xl border border-card-border shadow-xs flex items-center justify-between text-xs font-semibold">
          <div class="flex items-center gap-2 text-sage">
            <span class="w-6 h-6 rounded-full bg-sage text-white flex items-center justify-center text-[11px]">✓</span>
            <span class="hidden @sm:inline">1. Chọn dịch vụ</span>
          </div>
          <div class="h-0.5 flex-1 bg-sage mx-3"></div>

          <div class="flex items-center gap-2 text-sage">
            <span class="w-6 h-6 rounded-full bg-sage text-white flex items-center justify-center text-[11px]">✓</span>
            <span class="hidden @sm:inline">2. Chọn khung giờ</span>
          </div>
          <div class="h-0.5 flex-1 bg-sage mx-3"></div>

          <div class="flex items-center gap-2 text-ink">
            <span class="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-[11px]">3</span>
            <span class="font-bold">3. Thông tin buổi tư vấn</span>
          </div>
          <div class="h-0.5 flex-1 bg-card-border mx-3"></div>

          <div class="flex items-center gap-2 text-ink/40">
            <span class="w-6 h-6 rounded-full bg-paper border border-card-border flex items-center justify-center text-[11px]">4</span>
            <span class="hidden @sm:inline">4. Xác nhận</span>
          </div>
        </div>

        <!-- Two Column: Form Left & Sticky Summary Right (Slide 07) -->
        <div class="grid grid-cols-1 @lg:grid-cols-3 gap-8 items-start">
          <!-- Form Left -->
          <div class="@lg:col-span-2 bg-white rounded-3xl p-6 @sm:p-8 border border-card-border shadow-sm space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-card-border">
              <div>
                <h3 class="font-serif text-xl font-bold text-ink">Đặt lịch tư vấn</h3>
                <p class="text-xs text-ink/60">Bước 3 / 4 · Điền thông tin buổi gặp gỡ</p>
              </div>
              <button onclick="App.showToast('Đã lưu bản nháp thông tin của bạn', 'info')" class="text-xs text-ink/60 hover:text-ink border border-card-border px-3 py-1.5 rounded-lg">
                Lưu nháp
              </button>
            </div>

            <div class="space-y-5 text-xs">
              <!-- Full Name -->
              <div>
                <label class="block font-medium text-ink mb-1">Họ và tên</label>
                <input 
                  type="text" 
                  value="${state.studentName}"
                  class="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-card-border focus:outline-none focus:border-sage text-ink text-xs"
                />
                <span class="text-[11px] text-ink/50 mt-1 block">Hiển thị trên hồ sơ buổi tư vấn</span>
              </div>

              <!-- Student Email with Inline Validation Highlight (Slide 07 & 13) -->
              <div>
                <label class="block font-medium text-ink mb-1">Email sinh viên</label>
                <input 
                  type="text" 
                  id="booking-email-input"
                  value="ngocan@student."
                  oninput="App.validateBookingEmail(this.value)"
                  class="w-full px-3.5 py-2.5 bg-red-50/40 rounded-xl border border-clay-alert focus:outline-none focus:ring-1 focus:ring-clay-alert text-ink text-xs font-mono"
                />
                <p id="booking-email-error" class="text-[11px] text-clay-alert font-medium mt-1 flex items-center gap-1">
                  <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                  Email chưa đúng định dạng — ví dụ: ngocan@student.edu.vn
                </p>
              </div>

              <!-- Discussion Topic -->
              <div>
                <label class="block font-medium text-ink mb-1">Chủ đề muốn trao đổi</label>
                <input 
                  type="text" 
                  value="${state.topic}"
                  class="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-card-border focus:outline-none focus:border-sage text-ink text-xs"
                />
              </div>

              <!-- Short Description with Character Counter (Slide 07) -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-medium text-ink">Mô tả ngắn (không bắt buộc)</label>
                  <span class="text-[11px] text-ink/50" id="booking-char-count">62 / 300 ký tự</span>
                </div>
                <textarea 
                  rows="3" 
                  oninput="document.getElementById('booking-char-count').innerText = this.value.length + ' / 300 ký tự'"
                  class="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-card-border focus:outline-none focus:border-sage text-ink text-xs leading-relaxed"
                >${state.notes}</textarea>
                <span class="text-[10px] text-ink/40 mt-0.5 block">Tối đa 300 ký tự để chuyên viên nắm trước bối cảnh.</span>
              </div>

              <!-- Navigation Buttons -->
              <div class="pt-4 border-t border-card-border flex items-center justify-between">
                <button onclick="App.navigateTo('services')" class="px-4 py-2 border border-card-border rounded-xl text-ink font-medium hover:bg-paper">
                  ← Quay lại
                </button>
                <button onclick="App.submitBooking()" class="px-6 py-2.5 bg-sage hover:bg-sage-deep text-white font-bold rounded-xl shadow transition-colors flex items-center gap-1.5">
                  <span>Tiếp tục (Xác nhận)</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Sticky Summary Card Right (Slide 07) -->
          <div class="space-y-4">
            <div class="bg-white rounded-3xl p-6 border border-card-border shadow-sm space-y-5">
              <h3 class="font-serif text-lg font-bold text-ink pb-3 border-b border-card-border">Tóm tắt lịch hẹn</h3>
              
              <div class="space-y-4 text-xs">
                <div>
                  <div class="text-ink/50 text-[11px] mb-0.5 flex items-center gap-1">
                    <span class="text-sage">✓</span> Dịch vụ
                  </div>
                  <div class="font-bold text-ink text-sm">Tư vấn cá nhân 1-1 · 45 phút</div>
                </div>

                <div>
                  <div class="text-ink/50 text-[11px] mb-0.5 flex items-center gap-1">
                    <span class="text-sage">✓</span> Chuyên viên
                  </div>
                  <div class="font-bold text-ink">TS. Nguyễn Minh Hà · Phòng H-204</div>
                </div>

                <div>
                  <div class="text-ink/50 text-[11px] mb-0.5 flex items-center gap-1">
                    <span class="text-sage">✓</span> Thời gian
                  </div>
                  <div class="font-bold text-sage-deep">${state.slotTime}</div>
                </div>

                <div>
                  <div class="text-ink/50 text-[11px] mb-0.5 flex items-center gap-1">
                    <span class="text-sage">✓</span> Hình thức
                  </div>
                  <div class="font-bold text-ink">Trực tiếp tại cơ sở chính</div>
                </div>

                <div class="pt-3 border-t border-card-border flex items-center justify-between">
                  <span class="text-[11px] uppercase font-bold text-ink/50">CHI PHÍ</span>
                  <span class="font-serif font-bold text-base text-sage-deep">Miễn phí</span>
                </div>
              </div>
            </div>

            <!-- Cross-step AI-2 Tip (Slide 07) -->
            <div class="bg-[#FFFDF6] border border-amber-300 rounded-2xl p-4 space-y-2 text-xs">
              <div class="flex items-center gap-1 text-amber-800 font-bold text-[11px]">
                <span>✦</span>
                <span>GỢI Ý AI-2</span>
              </div>
              <p class="text-ink/80 leading-relaxed">
                Trước buổi tư vấn, bạn có thể đọc <strong>“Kỹ thuật thở 4-7-8” (3 phút)</strong> để chuẩn bị tâm lý tốt hơn.
              </p>
              <div class="flex items-center gap-2 pt-1">
                <button onclick="App.showToast('Đã đính kèm kỹ thuật thở vào thư xác nhận lịch hẹn', 'success')" class="px-3 py-1 bg-amber-ai text-ink font-bold rounded-lg text-[11px]">
                  Thêm vào lịch
                </button>
                <button class="px-2 py-1 text-ink/50 hover:text-ink text-[11px]">
                  Bỏ qua
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  validateBookingEmail(val) {
    const errorEl = document.getElementById('booking-email-error');
    const inputEl = document.getElementById('booking-email-input');
    if (!errorEl || !inputEl) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(val)) {
      errorEl.classList.add('hidden');
      inputEl.classList.remove('border-clay-alert', 'bg-red-50/40');
      inputEl.classList.add('border-sage', 'bg-emerald-50/30');
    } else {
      errorEl.classList.remove('hidden');
      inputEl.classList.add('border-clay-alert', 'bg-red-50/40');
      inputEl.classList.remove('border-sage', 'bg-emerald-50/30');
    }
  },

  submitBooking() {
    this.showToast('Đặt lịch thành công! Mã cuộc hẹn: APT-1047', 'success');
    setTimeout(() => {
      this.navigateTo('student-appointments');
    }, 800);
  },

  /* =========================================================================
   * VIEW 7: STUDENT APPOINTMENTS TABLE & DRAWER (Slide 08)
   * ========================================================================= */
  renderStudentAppointmentsView() {
    const apts = CAMPUS_DATA.appointments;

    return `
      <div class="space-y-6">
        <!-- Title and Stats -->
        <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-card-border shadow-sm">
          <div>
            <h2 class="font-serif text-2xl font-bold text-ink">Lịch hẹn của tôi</h2>
            <p class="text-xs text-ink/60 mt-0.5">18 lịch hẹn · 6 đã hoàn thành · 2 đang chờ</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="relative">
              <i data-lucide="search" class="w-3.5 h-3.5 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input 
                type="text" 
                placeholder="Tìm theo dịch vụ / chuyên viên..." 
                class="pl-8 pr-3 py-1.5 text-xs bg-paper rounded-lg border border-card-border focus:outline-none focus:border-sage text-ink"
              />
            </div>
            <button onclick="App.startBooking()" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              + Đặt lịch
            </button>
          </div>
        </div>

        <!-- Filter Tabs (Slide 08) -->
        <div class="flex flex-wrap gap-2 text-xs">
          <button class="px-3.5 py-1.5 rounded-full bg-sage-deep text-white font-semibold">Tất cả (18)</button>
          <button class="px-3.5 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Đã xác nhận (6)</button>
          <button class="px-3.5 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Đang chờ (2)</button>
          <button class="px-3.5 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Bị từ chối (2)</button>
          <button class="px-3.5 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Đã hủy (3)</button>
          <button class="px-3.5 py-1.5 rounded-full bg-white border border-card-border text-ink/70 hover:bg-paper">Đã lưu trữ (5)</button>
        </div>

        <!-- Data Table (Slide 08) -->
        <div class="bg-white rounded-3xl border border-card-border shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-paper text-ink/60 uppercase font-bold text-[10px] tracking-wider border-b border-card-border">
                <tr>
                  <th class="py-3 px-4 w-10"><input type="checkbox" class="rounded text-sage"></th>
                  <th class="py-3 px-4">MÃ</th>
                  <th class="py-3 px-4">DỊCH VỤ</th>
                  <th class="py-3 px-4">CHUYÊN VIÊN</th>
                  <th class="py-3 px-4">THỜI GIAN</th>
                  <th class="py-3 px-4">TRẠNG THÁI</th>
                  <th class="py-3 px-4 text-right">CHI TIẾT</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-card-border">
                ${apts.slice(0, 6).map(apt => `
                  <tr class="hover:bg-paper/70 transition-colors cursor-pointer group" onclick="App.openAppointmentDrawer('${apt.id}')">
                    <td class="py-3 px-4" onclick="event.stopPropagation()">
                      <input type="checkbox" class="rounded text-sage">
                    </td>
                    <td class="py-3 px-4 font-mono font-bold text-ink">${apt.id}</td>
                    <td class="py-3 px-4 font-semibold text-ink">${apt.serviceName}</td>
                    <td class="py-3 px-4 text-ink/80">${apt.counselorName}</td>
                    <td class="py-3 px-4 font-medium text-ink/70">${apt.timeDisplay}</td>
                    <td class="py-3 px-4">
                      <span class="status-pill ${apt.statusClass}">
                        <span class="status-dot"></span>
                        <span>${apt.status}</span>
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right">
                      <button class="p-1.5 text-ink/40 group-hover:text-sage transition-colors">
                        <i data-lucide="more-horizontal" class="w-4 h-4"></i>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Pagination Bar (Slide 08) -->
          <div class="p-4 border-t border-card-border flex items-center justify-between text-xs text-ink/60">
            <span>Hiển thị 1–5 / 18</span>
            <div class="flex items-center gap-1">
              <button class="p-1.5 rounded hover:bg-paper">‹</button>
              <button class="px-2.5 py-1 rounded bg-sage text-white font-bold">1</button>
              <button class="px-2.5 py-1 rounded hover:bg-paper">2</button>
              <button class="px-2.5 py-1 rounded hover:bg-paper">3</button>
              <button class="p-1.5 rounded hover:bg-paper">›</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* =========================================================================
   * VIEW 8: COUNSELOR WEEKLY SCHEDULE & QUEUE (Slide 09)
   * ========================================================================= */
  renderCounselorScheduleView() {
    const queue = CAMPUS_DATA.counselorPendingQueue;

    return `
      <div class="space-y-8">
        <!-- Counselor Header -->
        <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-card-border shadow-sm">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-serif text-2xl font-bold text-ink">Lịch tuần 02 – 08/06</h2>
              <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">TS. Minh Hà</span>
            </div>
            <p class="text-xs text-ink/60 mt-0.5">12 buổi đã đặt · 4 khung giờ còn trống</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="inline-flex rounded-lg border border-card-border bg-paper p-0.5 text-xs font-medium">
              <button class="px-2.5 py-1 hover:bg-white rounded">‹ Tuần</button>
              <button class="px-3 py-1 bg-white font-bold rounded shadow-xs">Hôm nay</button>
              <button class="px-2.5 py-1 hover:bg-white rounded">Tuần ›</button>
            </div>
            <button onclick="App.showToast('Mở thêm 2 khung giờ trống vào Thứ 6', 'success')" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              Mở thêm khung giờ
            </button>
          </div>
        </div>

        <!-- 4 Counselor KPI Cards (Slide 09) -->
        <div class="grid grid-cols-2 @lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">BUỔI HÔM NAY</div>
            <div class="font-serif text-3xl font-bold text-ink">4</div>
            <div class="text-xs text-ink/60 mt-1">13:30 · 14:15 · 15:00 · 16:00</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">TUẦN NÀY</div>
            <div class="font-serif text-3xl font-bold text-ink">12</div>
            <div class="text-xs text-sage font-medium mt-1">+3 so với tuần trước</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">CHỜ DUYỆT</div>
            <div class="font-serif text-3xl font-bold text-amber-700">5</div>
            <div class="text-xs text-clay-alert font-medium mt-1">2 yêu cầu quá 24 giờ</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">GHI CHÚ ĐÃ GHI</div>
            <div class="font-serif text-3xl font-bold text-ink">9</div>
            <div class="text-xs text-amber-700 font-medium mt-1">3 bản dùng AI tóm tắt</div>
          </div>
        </div>

        <!-- Interactive Weekly Grid & Approval Queue (Slide 09) -->
        <div class="grid grid-cols-1 @lg:grid-cols-3 gap-8">
          <!-- Weekly Schedule Grid Left -->
          <div class="@lg:col-span-2 bg-white rounded-3xl p-6 border border-card-border shadow-sm space-y-4">
            <h3 class="font-serif text-xl font-bold text-ink">Lưới lịch trực ban</h3>

            <div class="grid grid-cols-4 gap-2 text-center text-xs">
              <div class="font-semibold text-ink/70 pb-2 border-b border-card-border">THỨ 2 · 02/06</div>
              <div class="font-semibold text-ink/70 pb-2 border-b border-card-border">THỨ 3 · 03/06</div>
              <div class="font-semibold text-ink/70 pb-2 border-b border-card-border">THỨ 4 · 04/06</div>
              <div class="font-semibold text-ink/70 pb-2 border-b border-card-border">THỨ 5 · 05/06</div>

              <!-- Row 08:30 -->
              <div class="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span class="block font-bold">08:30</span>
                <span class="text-[10px]">Còn trống</span>
              </div>
              <div class="p-2.5 rounded-xl bg-paper text-ink border border-card-border text-left">
                <span class="block font-bold text-[11px]">08:30</span>
                <span class="font-semibold text-sage-deep block">Lê Ngọc An</span>
                <span class="text-[9px] text-ink/50">Cá nhân 1-1</span>
              </div>
              <div class="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span class="block font-bold">08:30</span>
                <span class="text-[10px]">Còn trống</span>
              </div>
              <div class="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                <span class="block font-bold">08:30</span>
                <span class="text-[10px] font-bold">Chờ duyệt</span>
              </div>

              <!-- Row 10:00 -->
              <div class="p-2.5 rounded-xl bg-paper text-ink border border-card-border text-left">
                <span class="block font-bold text-[11px]">10:00</span>
                <span class="font-semibold text-sage-deep block">Trần Hà Linh</span>
                <span class="text-[9px] text-ink/50">Nhóm hỗ trợ</span>
              </div>
              <div class="p-2.5 rounded-xl bg-red-50 text-clay-alert border border-red-200">
                <span class="block font-bold text-[11px]">10:00</span>
                <span class="text-[10px] font-medium">Đã hủy</span>
              </div>
              <div class="p-2.5 rounded-xl bg-paper text-ink border border-card-border text-left">
                <span class="block font-bold text-[11px]">10:00</span>
                <span class="font-semibold text-sage-deep block">Vũ Đức Anh</span>
                <span class="text-[9px] text-ink/50">Cá nhân 1-1</span>
              </div>
              <div class="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span class="block font-bold">10:00</span>
                <span class="text-[10px]">Còn trống</span>
              </div>

              <!-- Row 13:30 -->
              <div class="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                <span class="block font-bold">13:30</span>
                <span class="text-[10px] font-bold">Chờ duyệt</span>
              </div>
              <div class="p-2.5 rounded-xl bg-paper text-ink border border-card-border text-left">
                <span class="block font-bold text-[11px]">13:30</span>
                <span class="font-semibold text-sage-deep block">Hoàng Yến Nhi</span>
                <span class="text-[9px] text-ink/50">Workshop</span>
              </div>
              <div class="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span class="block font-bold">13:30</span>
                <span class="text-[10px]">Còn trống</span>
              </div>
              <div onclick="App.navigateTo('counselor-note')" class="p-2.5 rounded-xl bg-sage-tint text-sage-deep border border-sage/40 text-left hover:bg-sage/20 cursor-pointer">
                <span class="block font-bold text-[11px]">13:30</span>
                <span class="font-semibold block">Lê Ngọc An</span>
                <span class="text-[9px] text-sage font-bold flex items-center gap-0.5">
                  <i data-lucide="edit-3" class="w-3 h-3"></i> Ghi chú AI
                </span>
              </div>
            </div>

            <!-- Topic Distribution Chart (Slide 09) -->
            <div class="pt-6 border-t border-card-border space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-ink">Phân bố buổi theo chủ đề</span>
                <span class="text-ink/50 font-bold uppercase text-[10px]">THÁNG 6</span>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-sage"></span>Áp lực học tập (45%)</span>
                  <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-ai"></span>Lo âu (35%)</span>
                  <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-sky-info"></span>Quan hệ (20%)</span>
                </div>
                <div class="w-full h-3 rounded-full flex overflow-hidden">
                  <div class="bg-sage h-full" style="width: 45%;"></div>
                  <div class="bg-amber-ai h-full" style="width: 35%;"></div>
                  <div class="bg-sky-info h-full" style="width: 20%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Yêu cầu chờ duyệt Right (Slide 09) -->
          <div class="bg-white rounded-3xl p-6 border border-card-border shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-serif text-lg font-bold text-ink">Yêu cầu chờ duyệt</h3>
              <span class="w-5 h-5 rounded-full bg-amber-ai text-ink font-bold text-[10px] flex items-center justify-center">5</span>
            </div>

            <div class="space-y-3 text-xs" id="counselor-queue-list">
              ${queue.map(req => `
                <div class="p-3.5 rounded-2xl bg-paper border border-card-border/70 space-y-2.5">
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 class="font-bold text-ink text-sm">${req.studentName}</h4>
                      <p class="text-ink/60 text-[11px]">${req.serviceName} · ${req.slot}</p>
                    </div>
                    ${req.urgent ? '<span class="status-pill status-cancelled text-[9px]">Quá 24h</span>' : ''}
                  </div>

                  <div class="flex items-center justify-end gap-2 pt-1 border-t border-card-border/60">
                    <button onclick="App.approveQueueItem('${req.id}', '${req.studentName}')" class="px-3 py-1 bg-sage hover:bg-sage-deep text-white font-semibold rounded-lg text-xs shadow-xs">
                      Duyệt
                    </button>
                    <button onclick="App.rejectQueueItem('${req.id}', '${req.studentName}')" class="px-3 py-1 border border-clay-alert/30 text-clay-alert hover:bg-red-50 font-semibold rounded-lg text-xs">
                      Từ chối
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  approveQueueItem(id, name) {
    this.showToast(`Đã duyệt thành công yêu cầu của ${name}`, 'success');
    const el = document.getElementById('counselor-queue-list');
    if (el) {
      CAMPUS_DATA.counselorPendingQueue = CAMPUS_DATA.counselorPendingQueue.filter(q => q.id !== id);
      this.refreshCurrentView();
    }
  },

  rejectQueueItem(id, name) {
    this.showToast(`Đã từ chối yêu cầu của ${name}. Gợi ý khung giờ khác đã gửi qua email.`, 'info');
    CAMPUS_DATA.counselorPendingQueue = CAMPUS_DATA.counselorPendingQueue.filter(q => q.id !== id);
    this.refreshCurrentView();
  },

  /* =========================================================================
   * VIEW 9: SESSION NOTE & AI-3 ASSISTANT (Slide 10)
   * ========================================================================= */
  renderCounselorNoteView() {
    const note = CAMPUS_DATA.sessionNote;
    const isError = this.ai3ErrorMode;

    return `
      <div class="max-w-5xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-card-border shadow-sm">
          <div>
            <span class="text-xs uppercase font-bold tracking-wider text-sage">GHI CHÚ BUỔI TƯ VẤN · ${note.appointmentId}</span>
            <h2 class="font-serif text-2xl font-bold text-ink">${note.studentName} · ${note.dateTime}</h2>
            <p class="text-xs text-ink/60 mt-0.5">Chuyên viên phụ trách: ${note.counselor}</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="App.showToast('Đã lưu nháp ghi chú', 'info')" class="px-4 py-2 border border-card-border rounded-xl text-xs font-semibold hover:bg-paper text-ink">
              Lưu nháp
            </button>
            <button onclick="App.showToast('Đã hoàn tất buổi tư vấn và đồng bộ hồ sơ', 'success')" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white rounded-xl text-xs font-semibold shadow-xs">
              Hoàn tất buổi
            </button>
          </div>
        </div>

        <!-- Privacy notice (Slide 10) -->
        <div class="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-center justify-between text-xs text-amber-900">
          <div class="flex items-center gap-2">
            <i data-lucide="lock" class="w-4 h-4 text-amber-ai"></i>
            <span><strong>Lưu ý quyền riêng tư:</strong> Nội dung ghi chú chỉ hiển thị với chuyên viên phụ trách.</span>
          </div>

          <!-- Slide 10 Edge Case Toggle -->
          <button onclick="App.toggleAi3ErrorMode()" class="underline font-semibold hover:text-amber-950">
            [Thử trạng thái: ${isError ? 'Bình thường' : 'Thất bại (Ghi chú quá ngắn)'}]
          </button>
        </div>

        <div class="grid grid-cols-1 @lg:grid-cols-2 gap-8 items-start">
          <!-- Note Editor Left (Slide 10) -->
          <div class="bg-white rounded-3xl p-6 border border-card-border shadow-sm space-y-5 text-xs">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="font-bold text-ink">Nội dung ghi chú</label>
                <span class="text-[11px] text-ink/50" id="note-char-counter">${note.charCount} ký tự · tự động lưu lúc ${note.autoSavedTime}</span>
              </div>
              <textarea 
                rows="7" 
                id="counselor-notes-input"
                oninput="App.handleNoteInputChange(this.value)"
                class="w-full p-4 bg-paper rounded-2xl border border-card-border focus:outline-none focus:border-sage text-ink text-xs leading-relaxed"
              >${note.content}</textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-medium text-ink mb-1">Mức độ cải thiện</label>
                <select class="w-full px-3 py-2 bg-paper border border-card-border rounded-xl text-ink focus:outline-none focus:border-sage">
                  <option selected>Tốt lên rõ rệt ▾</option>
                  <option>Có tiến triển</option>
                  <option>Chưa thay đổi</option>
                  <option>Cần theo dõi sát</option>
                </select>
              </div>

              <div>
                <label class="block font-medium text-ink mb-1">Hình thức tiếp theo</label>
                <select class="w-full px-3 py-2 bg-paper border border-card-border rounded-xl text-ink focus:outline-none focus:border-sage">
                  <option selected>Tái khám sau 2 tuần ▾</option>
                  <option>Tái khám sau 1 tuần</option>
                  <option>Tham gia workshop</option>
                  <option>Hoàn thành liệu trình</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-medium text-ink mb-1.5">Hành động theo dõi</label>
              <div class="flex flex-wrap gap-2">
                ${note.actionTags.map(tag => `
                  <span class="px-3 py-1 bg-paper border border-card-border rounded-full text-ink/80 flex items-center gap-1 font-medium">
                    <span>${tag}</span>
                    <i data-lucide="check" class="w-3 h-3 text-sage"></i>
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- AI-3 Counselor Summary Assistant Right (Slide 10) -->
          <div class="space-y-4">
            ${isError ? `
              <!-- Slide 10: Error State / Edge Case -->
              <div class="bg-red-50 border-2 border-clay-alert/60 rounded-3xl p-6 shadow-sm space-y-4 text-xs">
                <div class="flex items-center gap-2 text-clay-alert font-bold">
                  <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                  <span class="text-sm">Không thể xử lý yêu cầu lúc này.</span>
                </div>
                <p class="text-ink/80 leading-relaxed">
                  Nội dung ghi chú quá ngắn (dưới 40 ký tự) để AI tạo bản tóm tắt đáng tin cậy. Vui lòng bổ sung thêm thông tin diễn biến buổi trao đổi.
                </p>
                <div class="flex items-center gap-2 pt-2 border-t border-red-200">
                  <button onclick="App.toggleAi3ErrorMode()" class="px-3 py-1.5 bg-clay-alert text-white rounded-lg font-bold">
                    Thử lại
                  </button>
                  <button onclick="App.showToast('Chuyển sang chế độ tự viết thủ công', 'info')" class="px-3 py-1.5 bg-white border border-card-border rounded-lg text-ink font-medium">
                    Tự viết
                  </button>
                  <button onclick="App.showToast('Đã gửi phản hồi lỗi cho ban quản trị', 'info')" class="px-3 py-1.5 text-ink/60 hover:text-ink">
                    Báo cáo
                  </button>
                </div>
              </div>
            ` : `
              <!-- Slide 10: Normal AI-3 Summary -->
              <div class="bg-gradient-to-br from-[#FFFDF8] to-[#FCF8EE] border-2 border-amber-300 rounded-3xl p-6 shadow-sm space-y-5 text-xs">
                <div class="flex items-center justify-between">
                  <div class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">
                    <span>✦</span>
                    <span>AI-3 · COUNSELOR SUMMARY ASSISTANT</span>
                  </div>
                  <span class="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    ${note.aiSummaryDraft.confidence}
                  </span>
                </div>

                <div>
                  <h4 class="font-serif text-lg font-bold text-ink">Bản tóm tắt đề xuất</h4>
                  <div class="mt-2 text-ink/50 text-[10px] uppercase font-bold tracking-wider">TÓM TẮT 3 CÂU</div>
                  <p class="text-ink/85 leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-200/60 mt-1">
                    ${note.aiSummaryDraft.threeSentences}
                  </p>
                </div>

                <div>
                  <div class="text-ink/50 text-[10px] uppercase font-bold tracking-wider mb-2">HÀNH ĐỘNG ĐỀ XUẤT</div>
                  <div class="space-y-2">
                    ${note.aiSummaryDraft.suggestedActions.map(act => `
                      <div class="flex items-start gap-2.5 bg-white/70 p-2.5 rounded-xl border border-amber-200/60">
                        <span class="w-5 h-5 rounded-full bg-amber-ai text-ink font-bold flex items-center justify-center shrink-0 text-[10px]">${act.id}</span>
                        <div>
                          <div class="font-bold text-ink">${act.title}</div>
                          <div class="text-[11px] text-ink/60">${act.timing}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <button onclick="App.showToast('Đã chấp nhận bản nháp AI vào hồ sơ bảo mật', 'success')" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white font-bold rounded-xl shadow-xs transition-colors">
                      Chấp nhận bản nháp
                    </button>
                    <button onclick="App.showToast('Đã cho phép chỉnh sửa trực tiếp trên bản tóm tắt', 'info')" class="px-3 py-2 bg-white border border-card-border rounded-xl text-ink font-semibold hover:bg-paper transition-colors">
                      Chỉnh sửa
                    </button>
                    <button onclick="App.showToast('AI-3 đã tạo lại bản tóm tắt mới', 'info')" class="px-3 py-2 bg-white border border-card-border rounded-xl text-ink font-medium hover:bg-paper transition-colors">
                      Tạo lại
                    </button>
                  </div>

                  <span class="text-[10px] text-ink/50 italic">Chuyên viên phê duyệt cuối</span>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  },

  handleNoteInputChange(val) {
    const counter = document.getElementById('note-char-counter');
    if (counter) {
      counter.innerText = `${val.length} ký tự · vừa nhập xong`;
    }
  },

  toggleAi3ErrorMode() {
    this.ai3ErrorMode = !this.ai3ErrorMode;
    this.refreshCurrentView();
  },

  /* =========================================================================
   * VIEW 10: ADMIN DASHBOARD (Slide 11)
   * ========================================================================= */
  renderAdminDashboardView() {
    const stats = CAMPUS_DATA.adminStats;

    return `
      <div class="space-y-8">
        <!-- Admin Header -->
        <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-card-border shadow-sm">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-serif text-2xl font-bold text-ink">Bảng điều phối hệ thống</h2>
              <span class="px-2 py-0.5 rounded-md bg-slate-800 text-white text-[11px] font-bold">admin@campusmind</span>
            </div>
            <p class="text-xs text-ink/60 mt-0.5">Cập nhật lúc 14:32 · 03/06/2025</p>
          </div>

          <div class="flex items-center gap-3">
            <select class="text-xs bg-paper border border-card-border rounded-xl px-3 py-2 text-ink font-medium focus:outline-none focus:border-sage">
              <option>30 ngày qua ▾</option>
              <option>Học kỳ này</option>
              <option>Năm học 2024-2025</option>
            </select>
            <button onclick="App.showToast('Đang tải báo cáo tổng hợp PDF...', 'info')" class="px-4 py-2 border border-card-border rounded-xl text-xs font-semibold hover:bg-paper text-ink transition-colors flex items-center gap-1.5">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              Tải báo cáo
            </button>
            <button onclick="App.openAdminServiceModal()" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              + Thêm dịch vụ
            </button>
          </div>
        </div>

        <!-- 4 Big System KPIs (Slide 11) -->
        <div class="grid grid-cols-2 @lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">LỊCH HẸN THÁNG NÀY</div>
            <div class="font-serif text-3xl font-bold text-ink">${stats.monthlyBookings}</div>
            <div class="text-xs text-sage font-medium mt-1">↑ ${stats.monthlyTrend}</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">TÀI KHOẢN HOẠT ĐỘNG</div>
            <div class="font-serif text-3xl font-bold text-ink">${stats.activeAccounts}</div>
            <div class="text-xs text-sage font-medium mt-1">↑ ${stats.newUsers}</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">DỊCH VỤ ĐANG MỞ</div>
            <div class="font-serif text-3xl font-bold text-ink">${stats.openServices}</div>
            <div class="text-xs text-clay-alert font-medium mt-1">${stats.pausedServices} đang tạm ngưng</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-card-border shadow-xs">
            <div class="text-[10px] uppercase font-bold text-ink/50 tracking-wider mb-1">TỶ LỆ HOÀN THÀNH</div>
            <div class="font-serif text-3xl font-bold text-ink">${stats.completionRate}</div>
            <div class="text-xs text-ink/60 font-medium mt-1">${stats.cancelledCount}</div>
          </div>
        </div>

        <!-- Charts Grid (Slide 11) -->
        <div class="grid grid-cols-1 @lg:grid-cols-3 gap-8">
          <!-- Weekly Trend Chart (Slide 11) -->
          <div class="@lg:col-span-2 bg-white rounded-3xl p-6 border border-card-border shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-serif text-lg font-bold text-ink">Lịch hẹn theo tuần</h3>
                <p class="text-xs text-ink/50">TUẦN 1 → TUẦN 8 · THÁNG 4 – 6 <span class="text-sage font-bold ml-1">+12.4%</span></p>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-sage"></span>Đã hoàn thành</span>
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-card-border"></span>Đã hủy</span>
              </div>
            </div>

            <!-- Custom Clean SVG Bar Chart -->
            <div class="h-48 flex items-end justify-between gap-3 pt-4 px-2 border-b border-card-border">
              ${stats.weeklyBookingTrend.map(w => `
                <div class="flex-1 flex flex-col items-center gap-1 group">
                  <div class="w-full flex items-end justify-center gap-1 h-36">
                    <div class="w-1/2 bg-sage rounded-t transition-all group-hover:bg-sage-deep" style="height: ${(w.completed / 50) * 100}%;"></div>
                    <div class="w-1/2 bg-clay-alert/30 rounded-t transition-all" style="height: ${(w.cancelled / 10) * 100}%;"></div>
                  </div>
                  <span class="text-[11px] font-mono text-ink/60 mt-1">${w.week}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Role Usage Donut Breakdown (Slide 11) -->
          <div class="bg-white rounded-3xl p-6 border border-card-border shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-serif text-lg font-bold text-ink">Tỷ lệ theo vai trò</h3>
                <span class="text-[10px] uppercase font-bold text-ink/50">THÁNG 6</span>
              </div>

              <div class="space-y-3 text-xs">
                <div class="flex items-center justify-between p-2 rounded-lg bg-paper">
                  <span class="font-medium text-ink flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-sage"></span>
                    Sinh viên
                  </span>
                  <span class="font-bold text-sage-deep text-sm">${stats.roleDistribution.student}%</span>
                </div>

                <div class="flex items-center justify-between p-2 rounded-lg bg-paper">
                  <span class="font-medium text-ink flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-ai"></span>
                    Khách vãng lai
                  </span>
                  <span class="font-bold text-amber-700 text-sm">${stats.roleDistribution.guest}%</span>
                </div>

                <div class="flex items-center justify-between p-2 rounded-lg bg-paper">
                  <span class="font-medium text-ink flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-sky-info"></span>
                    Chuyên viên
                  </span>
                  <span class="font-bold text-sky-info text-sm">${stats.roleDistribution.counselor}%</span>
                </div>
              </div>
            </div>

            <!-- Activity Log Widget (Slide 11) -->
            <div class="pt-4 border-t border-card-border space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-serif font-bold text-xs text-ink">Nhật ký hoạt động</span>
                <span class="text-[10px] text-sage font-bold hover:underline cursor-pointer">Xem tất cả</span>
              </div>
              <div class="space-y-1.5 text-[11px]">
                ${stats.auditLogs.slice(0, 3).map(log => `
                  <div class="flex items-center justify-between text-ink/70">
                    <span class="truncate pr-2">• ${log.message}</span>
                    <span class="text-ink/40 font-mono shrink-0">${log.time}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* =========================================================================
   * VIEW 11: ADMIN SERVICES & USERS CRUD (Slide 12)
   * ========================================================================= */
  renderAdminServicesView() {
    const services = CAMPUS_DATA.services;

    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-card-border shadow-sm">
          <div>
            <h2 class="font-serif text-2xl font-bold text-ink">Quản lý dịch vụ</h2>
            <p class="text-xs text-ink/60 mt-0.5">12 dịch vụ · 10 đang mở · 2 tạm ngưng</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="relative">
              <i data-lucide="search" class="w-3.5 h-3.5 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input 
                type="text" 
                placeholder="Tìm dịch vụ..." 
                class="pl-8 pr-3 py-1.5 text-xs bg-paper rounded-lg border border-card-border focus:outline-none focus:border-sage text-ink"
              />
            </div>
            <select class="text-xs bg-paper border border-card-border rounded-lg px-2.5 py-1.5 text-ink">
              <option>Trạng thái ▾</option>
              <option>Đang bật</option>
              <option>Đang tắt</option>
            </select>
            <button onclick="App.openAdminServiceModal()" class="px-4 py-2 bg-sage hover:bg-sage-deep text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              + Thêm dịch vụ
            </button>
          </div>
        </div>

        <!-- Bulk Action Buttons (Slide 12) -->
        <div class="flex items-center gap-2 text-xs">
          <button onclick="App.showToast('Gửi thông báo cập nhật lịch bảo trì tới 1240 người dùng', 'info')" class="px-3 py-1.5 bg-white border border-card-border rounded-lg font-medium hover:bg-paper text-ink">
            Gửi thông báo
          </button>
          <button onclick="App.showToast('Đã lưu trữ hàng loạt 2 dịch vụ tạm ngưng', 'info')" class="px-3 py-1.5 bg-white border border-card-border rounded-lg font-medium hover:bg-paper text-ink">
            Lưu trữ hàng loạt
          </button>
        </div>

        <!-- CRUD Table (Slide 12) -->
        <div class="bg-white rounded-3xl border border-card-border shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-paper text-ink/60 uppercase font-bold text-[10px] tracking-wider border-b border-card-border">
                <tr>
                  <th class="py-3 px-4 w-10"><input type="checkbox" class="rounded text-sage"></th>
                  <th class="py-3 px-4">DỊCH VỤ</th>
                  <th class="py-3 px-4">DANH MỤC</th>
                  <th class="py-3 px-4">THỜI LƯỢNG</th>
                  <th class="py-3 px-4">HIỂN THỊ</th>
                  <th class="py-3 px-4">TRẠNG THÁI</th>
                  <th class="py-3 px-4 text-right">THAO TÁC</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-card-border">
                ${services.slice(0, 7).map(svc => `
                  <tr class="hover:bg-paper/70 transition-colors">
                    <td class="py-3 px-4"><input type="checkbox" class="rounded text-sage"></td>
                    <td class="py-3 px-4 font-bold text-ink">${svc.name}</td>
                    <td class="py-3 px-4 text-ink/70">${svc.category}</td>
                    <td class="py-3 px-4 font-mono text-ink/70">${svc.duration}</td>
                    <td class="py-3 px-4">
                      <!-- Toggle Switch (Slide 12) -->
                      <button 
                        onclick="App.toggleServiceActive('${svc.id}')"
                        class="px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${svc.isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}"
                      >
                        <span class="w-2 h-2 rounded-full ${svc.isEnabled ? 'bg-emerald-600' : 'bg-slate-400'}"></span>
                        <span>${svc.isEnabled ? 'Đang bật' : 'Đang tắt'}</span>
                      </button>
                    </td>
                    <td class="py-3 px-4">
                      <span class="status-pill ${svc.badgeClass}">
                        <span class="status-dot"></span>
                        <span>${svc.activeStatus}</span>
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right">
                      <button onclick="App.editService('${svc.id}')" class="p-1 hover:text-sage text-ink/50" title="Chỉnh sửa">
                        <i data-lucide="edit" class="w-4 h-4"></i>
                      </button>
                      <button onclick="App.confirmDeleteService('${svc.id}')" class="p-1 hover:text-clay-alert text-ink/50 ml-1" title="Lưu trữ / Xóa">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="p-4 border-t border-card-border flex items-center justify-between text-xs text-ink/60">
            <span>Hiển thị 1–5 / 12</span>
            <div class="flex items-center gap-1">
              <button class="px-2.5 py-1 rounded bg-sage text-white font-bold">1</button>
              <button class="px-2.5 py-1 rounded hover:bg-paper">2</button>
              <button class="px-2.5 py-1 rounded hover:bg-paper">3</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* =========================================================================
   * VIEW 12: AUTHENTICATION / LOGIN (Slide 13)
   * ========================================================================= */
  renderLoginView() {
    return `
      <div class="max-w-md mx-auto my-8 space-y-6">
        <div class="bg-white rounded-3xl p-8 border border-card-border shadow-sm space-y-6">
          <div class="text-center space-y-2">
            <div class="w-12 h-12 rounded-2xl bg-sage-deep text-white flex items-center justify-center mx-auto mb-2">
              <i data-lucide="lock" class="w-6 h-6"></i>
            </div>
            <h2 class="font-serif text-3xl font-bold text-ink">Chào mừng trở lại</h2>
            <p class="text-xs text-ink/60">Đăng nhập để quản lý lịch hẹn và tài nguyên của bạn.</p>
          </div>

          <form onsubmit="event.preventDefault(); App.switchRole('student'); App.navigateTo('student-dashboard')" class="space-y-4 text-xs">
            <div>
              <label class="block font-medium text-ink mb-1">Email sinh viên</label>
              <input 
                type="email" 
                value="ngocan@student."
                oninput="App.validateLoginEmail(this.value)"
                id="login-email-input"
                class="w-full px-3.5 py-2.5 bg-red-50/40 rounded-xl border border-clay-alert focus:outline-none text-ink text-xs font-mono"
              />
              <span id="login-email-error" class="text-[11px] text-clay-alert font-medium mt-1 block">
                Email chưa đúng định dạng
              </span>
            </div>

            <div>
              <label class="block font-medium text-ink mb-1">Mật khẩu</label>
              <input 
                type="password" 
                value="password123"
                class="w-full px-3.5 py-2.5 bg-paper rounded-xl border border-card-border focus:outline-none focus:border-sage text-ink text-xs"
              />
              <span class="text-[11px] text-ink/50 mt-1 block">Ít nhất 8 ký tự, gồm chữ và số</span>
            </div>

            <div class="flex items-center justify-between pt-1">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked class="rounded text-sage">
                <span class="text-ink/70">Ghi nhớ đăng nhập</span>
              </label>
              <a href="javascript:void(0)" class="text-sage hover:underline">Quên mật khẩu?</a>
            </div>

            <button type="submit" class="w-full py-3 bg-sage hover:bg-sage-deep text-white font-bold rounded-xl shadow-xs transition-colors text-sm">
              Đăng nhập
            </button>
          </form>

          <div class="relative py-2">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-card-border"></div></div>
            <div class="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-ink/40"><span class="bg-white px-2">HOẶC</span></div>
          </div>

          <!-- SSO & Fast Login Shortcuts (Slide 13) -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <button onclick="App.switchRole('student'); App.navigateTo('student-dashboard')" class="py-2 px-3 border border-card-border rounded-xl font-medium hover:bg-paper text-ink flex items-center justify-center gap-1.5">
              <span>Email trường</span>
            </button>
            <button onclick="App.switchRole('student'); App.navigateTo('student-dashboard')" class="py-2 px-3 border border-card-border rounded-xl font-medium hover:bg-paper text-ink flex items-center justify-center gap-1.5">
              <span>Tài khoản sinh viên</span>
            </button>
          </div>

          <!-- Evaluator Quick Switch Box -->
          <div class="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs space-y-1.5">
            <span class="font-bold text-amber-900 block">Đăng nhập nhanh cho ban giám khảo:</span>
            <div class="flex flex-wrap gap-1.5">
              <button onclick="App.switchRole('student'); App.navigateTo('student-dashboard')" class="px-2 py-1 bg-white border border-amber-300 rounded text-[11px] font-semibold text-ink">🎓 Sinh viên</button>
              <button onclick="App.switchRole('counselor'); App.navigateTo('counselor-schedule')" class="px-2 py-1 bg-white border border-amber-300 rounded text-[11px] font-semibold text-ink">🧑‍⚕️ Chuyên viên</button>
              <button onclick="App.switchRole('admin'); App.navigateTo('admin-dashboard')" class="px-2 py-1 bg-white border border-amber-300 rounded text-[11px] font-semibold text-ink">🛡️ Admin</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  validateLoginEmail(val) {
    const errorEl = document.getElementById('login-email-error');
    const inputEl = document.getElementById('login-email-input');
    if (!errorEl || !inputEl) return;

    if (val.includes('@') && val.includes('.')) {
      errorEl.classList.add('hidden');
      inputEl.classList.remove('border-clay-alert', 'bg-red-50/40');
      inputEl.classList.add('border-sage');
    } else {
      errorEl.classList.remove('hidden');
      inputEl.classList.add('border-clay-alert', 'bg-red-50/40');
      inputEl.classList.remove('border-sage');
    }
  },

  /* =========================================================================
   * VIEW 13 & 14: 404 & 403 ERROR STATES (Slide 13)
   * ========================================================================= */
  render404View() {
    return `
      <div class="max-w-xl mx-auto my-12 text-center bg-white p-10 rounded-3xl border border-card-border shadow-sm space-y-6">
        <div class="font-serif text-8xl font-bold text-sage-deep/30">404</div>
        <div class="space-y-2">
          <h2 class="font-serif text-3xl font-bold text-ink">Không tìm thấy trang</h2>
          <p class="text-xs text-ink/70 leading-relaxed max-w-md mx-auto">
            Đường dẫn có thể đã thay đổi hoặc bị xóa. Hãy thử tìm kiếm lại hoặc quay về trang chủ.
          </p>
        </div>

        <div class="flex items-center justify-center gap-3 pt-2">
          <button onclick="App.navigateTo('home')" class="px-5 py-2.5 bg-sage hover:bg-sage-deep text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
            Về trang chủ
          </button>
          <button onclick="App.navigateTo('services')" class="px-5 py-2.5 border border-card-border hover:bg-paper text-ink font-semibold text-xs rounded-xl transition-colors">
            Tìm kiếm
          </button>
        </div>

        <div class="pt-6 border-t border-card-border text-xs text-ink/60">
          <span class="block mb-2 font-semibold uppercase text-[10px] tracking-wider text-ink/40">TRUY CẬP NHANH</span>
          <div class="flex flex-wrap justify-center gap-2">
            <button onclick="App.navigateTo('services')" class="px-3 py-1 bg-paper rounded-full hover:bg-card-border/60">Dịch vụ</button>
            <button onclick="App.navigateTo('resources')" class="px-3 py-1 bg-paper rounded-full hover:bg-card-border/60">Tài nguyên</button>
            <button onclick="App.navigateTo('counselor')" class="px-3 py-1 bg-paper rounded-full hover:bg-card-border/60">Chuyên viên</button>
            <button onclick="App.startBooking()" class="px-3 py-1 bg-paper rounded-full hover:bg-card-border/60">Đặt lịch</button>
          </div>
        </div>
      </div>
    `;
  },

  render403View() {
    return `
      <div class="max-w-xl mx-auto my-12 text-center bg-white p-10 rounded-3xl border border-card-border shadow-sm space-y-6">
        <div class="font-serif text-8xl font-bold text-clay-alert/30">403</div>
        <div class="space-y-2">
          <h2 class="font-serif text-3xl font-bold text-ink">Bạn không có quyền truy cập trang này</h2>
          <p class="text-xs text-ink/70 leading-relaxed max-w-md mx-auto">
            Khu vực này yêu cầu đặc quyền chuyên viên hoặc quản trị viên hệ thống. Vui lòng liên hệ quản trị viên hoặc chuyển về vai trò của bạn.
          </p>
        </div>

        <div class="flex items-center justify-center gap-3 pt-2">
          <button onclick="App.switchRole('student'); App.navigateTo('student-dashboard')" class="px-5 py-2.5 bg-sage hover:bg-sage-deep text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
            Về bảng điều khiển
          </button>
          <button onclick="App.navigateTo('login')" class="px-5 py-2.5 border border-card-border hover:bg-paper text-ink font-semibold text-xs rounded-xl transition-colors">
            Đăng nhập lại
          </button>
        </div>
      </div>
    `;
  },

  /* =========================================================================
   * VIEW 15: DESIGN SYSTEM (Slide 15)
   * ========================================================================= */
  renderDesignSystemView() {
    return `
      <div class="space-y-10">
        <!-- Header -->
        <div class="bg-white p-8 rounded-3xl border border-card-border shadow-sm space-y-2">
          <span class="text-xs uppercase font-bold tracking-wider text-sage">SLIDE 15 · DESIGN SYSTEM</span>
          <h2 class="font-serif text-3xl font-bold text-ink">Ngôn ngữ thiết kế dùng chung</h2>
          <p class="text-xs text-ink/70 leading-relaxed max-w-3xl">
            Nguyên tắc cốt lõi: <strong>serif (Fraunces)</strong> cho tiêu đề mang cảm xúc, <strong>sans (Be Vietnam Pro)</strong> cho vận hành. 
            Màu trạng thái luôn đi kèm <strong>chấm tròn + chữ</strong>, không dùng màu làm tín hiệu duy nhất để bảo đảm khả năng tiếp cận (Accessibility).
          </p>
        </div>

        <!-- 8 Color Tokens (Slide 15) -->
        <div class="bg-white p-8 rounded-3xl border border-card-border shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-serif text-xl font-bold text-ink">Bảng màu thương hiệu (8 Tokens)</h3>
            <span class="text-xs font-mono text-ink/50">8 TOKENS</span>
          </div>

          <div class="grid grid-cols-2 @sm:grid-cols-4 gap-4 pt-2">
            ${[
              { name: 'Sage', hex: '#2F7A66', bg: 'bg-[#2F7A66]', text: 'text-white' },
              { name: 'Sage Deep', hex: '#1C5344', bg: 'bg-[#1C5344]', text: 'text-white' },
              { name: 'Amber · AI', hex: '#D79B34', bg: 'bg-[#D79B34]', text: 'text-ink' },
              { name: 'Clay · Alert', hex: '#C4643F', bg: 'bg-[#C4643F]', text: 'text-white' },
              { name: 'Ink', hex: '#16241D', bg: 'bg-[#16241D]', text: 'text-white' },
              { name: 'Paper', hex: '#F2EEE6', bg: 'bg-[#F2EEE6]', text: 'text-ink', border: true },
              { name: 'Sage Tint', hex: '#DCEAE3', bg: 'bg-[#DCEAE3]', text: 'text-ink' },
              { name: 'Sky · Info', hex: '#3B6E92', bg: 'bg-[#3B6E92]', text: 'text-white' }
            ].map(c => `
              <div class="rounded-2xl overflow-hidden border ${c.border ? 'border-card-border' : 'border-transparent'} shadow-xs">
                <div class="h-20 ${c.bg} flex items-end p-3 ${c.text}">
                  <span class="font-mono text-xs font-bold">${c.hex}</span>
                </div>
                <div class="p-3 bg-white">
                  <div class="font-semibold text-xs text-ink">${c.name}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Typography & Status Components (Slide 15) -->
        <div class="grid grid-cols-1 @lg:grid-cols-2 gap-8">
          <!-- Typography scale -->
          <div class="bg-white p-8 rounded-3xl border border-card-border shadow-sm space-y-4">
            <h3 class="font-serif text-xl font-bold text-ink">Thang chữ (Type Scale)</h3>
            <div class="space-y-4 pt-2 text-xs">
              <div class="border-b border-card-border pb-3">
                <span class="text-ink/40 font-mono block text-[10px]">DISPLAY</span>
                <span class="font-serif text-3xl font-bold text-ink">An tâm mỗi ngày</span>
              </div>
              <div class="border-b border-card-border pb-3">
                <span class="text-ink/40 font-mono block text-[10px]">H2 · 34PX</span>
                <span class="font-serif text-2xl font-bold text-ink">Dịch vụ hỗ trợ phù hợp</span>
              </div>
              <div class="border-b border-card-border pb-3">
                <span class="text-ink/40 font-mono block text-[10px]">H3 · 22PX</span>
                <span class="font-serif text-lg font-bold text-ink">Lịch tư vấn của bạn</span>
              </div>
              <div>
                <span class="text-ink/40 font-mono block text-[10px]">BODY · 16PX (BE VIETNAM PRO)</span>
                <p class="text-sm text-ink/80 leading-relaxed">Đặt lịch và theo dõi hành trình wellbeing của bạn.</p>
              </div>
            </div>
          </div>

          <!-- Status Pills & Spacing scale -->
          <div class="bg-white p-8 rounded-3xl border border-card-border shadow-sm space-y-6">
            <div>
              <h3 class="font-serif text-xl font-bold text-ink mb-3">Quy chuẩn Trạng thái (Dot + Text)</h3>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="status-pill status-confirmed"><span class="status-dot"></span>Hoàn thành</span>
                <span class="status-pill status-pending"><span class="status-dot"></span>Đang chờ</span>
                <span class="status-pill status-processing"><span class="status-dot"></span>Đang xử lý</span>
                <span class="status-pill status-rejected"><span class="status-dot"></span>Bị từ chối</span>
                <span class="status-pill status-archived"><span class="status-dot"></span>Đã lưu trữ</span>
              </div>
            </div>

            <div>
              <h3 class="font-serif text-xl font-bold text-ink mb-3">Khoảng trắng (8px Grid Scale)</h3>
              <div class="flex items-end gap-3 text-[10px] font-mono text-ink/60">
                <div class="text-center"><div class="w-6 h-2 bg-sage-tint mb-1 mx-auto rounded"></div>4px</div>
                <div class="text-center"><div class="w-8 h-4 bg-sage-tint mb-1 mx-auto rounded"></div>8px</div>
                <div class="text-center"><div class="w-10 h-8 bg-sage-tint mb-1 mx-auto rounded"></div>16px</div>
                <div class="text-center"><div class="w-12 h-12 bg-sage-tint mb-1 mx-auto rounded"></div>24px</div>
                <div class="text-center"><div class="w-14 h-16 bg-sage mb-1 mx-auto rounded"></div>32px</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* =========================================================================
   * SLIDE DECK MODAL & INTERACTIVE CONTROLLERS
   * ========================================================================= */
  renderSlideDeckModalGrid() {
    const grid = document.getElementById('slide-deck-grid');
    if (!grid) return;

    const slides = [
      { num: '01', title: 'Giới thiệu & Tổng quan', screen: 'home', tag: 'Deck 01/16' },
      { num: '02', title: 'Hero & Điều hướng', screen: 'home', tag: 'Header sticky' },
      { num: '03', title: 'Danh mục dịch vụ', screen: 'services', tag: '12 Dịch vụ' },
      { num: '04', title: 'Thư viện self-help (AI-2)', screen: 'resources', tag: '✦ AI-2' },
      { num: '05', title: 'Hồ sơ chuyên viên', screen: 'counselor', tag: 'Khung giờ trống' },
      { num: '06', title: 'Bảng điều khiển SV (AI-1)', screen: 'student-dashboard', tag: '✦ AI-1' },
      { num: '07', title: 'Luồng đặt lịch 4 bước', screen: 'student-booking', tag: 'Wizard' },
      { num: '08', title: 'Quản lý lịch hẹn & Drawer', screen: 'student-appointments', tag: 'Bảng dữ liệu' },
      { num: '09', title: 'Lịch tuần & Hàng đợi', screen: 'counselor-schedule', tag: 'TS. Minh Hà' },
      { num: '10', title: 'Ghi chú buổi tư vấn (AI-3)', screen: 'counselor-note', tag: '✦ AI-3' },
      { num: '11', title: 'Bảng điều phối Quản trị', screen: 'admin-dashboard', tag: 'KPI & Chart' },
      { num: '12', title: 'CRUD Dịch vụ & Người dùng', screen: 'admin-services', tag: 'Vận hành' },
      { num: '13', title: 'Xác thực & Trạng thái lỗi', screen: 'login', tag: 'Auth / 404 / 403' },
      { num: '14', title: 'Responsive 3 Breakpoints', screen: 'design-system', tag: 'Desktop/Tab/Mob' },
      { num: '15', title: 'Design System 8 Tokens', screen: 'design-system', tag: '8 Tokens' },
      { num: '16', title: 'Tổng kết & BTL-02 CSE122', screen: 'home', tag: 'Hoàn tất' }
    ];

    grid.innerHTML = slides.map(s => `
      <div 
        onclick="App.navigateTo('${s.screen}'); App.closeSlideDeckModal()" 
        class="p-3.5 rounded-xl border border-card-border bg-paper hover:bg-sage-tint/40 hover:border-sage cursor-pointer transition-all space-y-1.5 group"
      >
        <div class="flex items-center justify-between">
          <span class="font-mono font-bold text-sage-deep text-xs">${s.num}</span>
          <span class="text-[9px] bg-white px-1.5 py-0.5 rounded border border-card-border font-semibold text-ink/60">${s.tag}</span>
        </div>
        <div class="font-bold text-ink group-hover:text-sage transition-colors leading-snug">${s.title}</div>
      </div>
    `).join('');
  },

  openSlideDeckModal() {
    document.getElementById('slide-deck-modal').classList.remove('hidden');
  },
  closeSlideDeckModal() {
    document.getElementById('slide-deck-modal').classList.add('hidden');
  },

  // Viewport Device Simulation (Slide 14)
  setViewport(mode) {
    const container = document.getElementById('viewport-container');
    const bFull = document.getElementById('btn-vp-full');
    const bTab = document.getElementById('btn-vp-tablet');
    const bMob = document.getElementById('btn-vp-mobile');

    [bFull, bTab, bMob].forEach(b => b && b.classList.remove('bg-white/30', 'text-white'));

    container.className = 'flex-1 flex flex-col w-full transition-all duration-300';

    if (mode === 'tablet') {
      container.classList.add('viewport-tablet');
      if (bTab) bTab.classList.add('bg-white/30', 'text-white');
      this.showToast('Chuyển chế độ giả lập Tablet (768px)', 'info');
    } else if (mode === 'mobile') {
      container.classList.add('viewport-mobile');
      if (bMob) bMob.classList.add('bg-white/30', 'text-white');
      this.showToast('Chuyển chế độ giả lập Mobile (390px)', 'info');
    } else {
      if (bFull) bFull.classList.add('bg-white/30', 'text-white');
      this.showToast('Màn hình đầy đủ', 'info');
    }
  },

  // AI-1 Modal Quiz (Slide 06)
  openAIQuizModal() {
    this.aiQuizStep = 0;
    this.aiQuizAnswers = {};
    this.renderAIQuizStep();
    document.getElementById('ai1-quiz-modal').classList.remove('hidden');
  },
  closeAIQuizModal() {
    document.getElementById('ai1-quiz-modal').classList.add('hidden');
  },

  renderAIQuizStep() {
    const container = document.getElementById('ai-quiz-content');
    const questions = CampusAI.supportNavigator.questions;

    if (this.aiQuizStep < questions.length) {
      const q = questions[this.aiQuizStep];
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between text-xs text-ink/50">
            <span>Câu hỏi ${this.aiQuizStep + 1} / ${questions.length}</span>
            <span class="font-bold text-amber-700">${Math.round(((this.aiQuizStep + 1) / questions.length) * 100)}%</span>
          </div>

          <h4 class="font-serif font-bold text-base text-ink">${q.title}</h4>

          <div class="space-y-2">
            ${q.options.map(opt => `
              <button 
                onclick="App.answerAIQuiz('${q.id}', '${opt.value}')"
                class="w-full text-left p-3 rounded-xl border border-card-border hover:border-amber-ai hover:bg-amber-50/50 text-xs font-medium text-ink transition-colors flex items-center justify-between"
              >
                <span>${opt.label}</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-ink/30"></i>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Completed, evaluate!
      const result = CampusAI.supportNavigator.evaluateAnswers(this.aiQuizAnswers);
      container.innerHTML = `
        <div class="space-y-4 text-center py-2">
          <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-ai text-xl font-bold flex items-center justify-center mx-auto">✦</div>
          <h4 class="font-serif font-bold text-xl text-ink">Kết quả gợi ý từ AI Navigator</h4>
          
          <div class="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-left space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-900">${result.serviceTitle}</span>
              <span class="status-pill status-confirmed text-[10px]">${result.confidence}</span>
            </div>
            <p class="text-ink/80 leading-relaxed">${result.rationale}</p>
          </div>

          <p class="text-[11px] text-ink/50 italic">${result.disclaimer}</p>

          <div class="pt-2 flex items-center justify-center gap-2">
            <button onclick="App.closeAIQuizModal(); App.startBooking();" class="px-5 py-2.5 bg-sage hover:bg-sage-deep text-white font-bold text-xs rounded-xl shadow-xs">
              Đặt lịch theo gợi ý
            </button>
            <button onclick="App.openAIQuizModal()" class="px-4 py-2.5 border border-card-border rounded-xl text-xs font-semibold hover:bg-paper">
              Làm lại
            </button>
          </div>
        </div>
      `;
    }
    if (window.lucide) lucide.createIcons();
  },

  answerAIQuiz(qid, value) {
    this.aiQuizAnswers[qid] = value;
    this.aiQuizStep++;
    this.renderAIQuizStep();
  },

  // Resource Reader Modal (Slide 04)
  openResourceReader(id) {
    const res = CAMPUS_DATA.resources.find(r => r.id === id) || CAMPUS_DATA.resources[0];
    document.getElementById('reader-title').innerText = res.title;
    document.getElementById('reader-category-pill').innerHTML = `<span class="status-dot"></span>${res.category}`;
    document.getElementById('reader-body').innerHTML = `
      <div class="prose text-xs text-ink/85 leading-relaxed space-y-3">
        ${res.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
    `;
    document.getElementById('reader-meta').innerText = `${res.type} · ${res.duration} · ${res.views} lượt xem`;
    document.getElementById('resource-reader-modal').classList.remove('hidden');
  },
  closeResourceReader() {
    document.getElementById('resource-reader-modal').classList.add('hidden');
  },

  toggleBookmark(id) {
    const res = CAMPUS_DATA.resources.find(r => r.id === id);
    if (res) {
      res.bookmarked = !res.bookmarked;
      this.showToast(res.bookmarked ? `Đã lưu: ${res.title}` : `Đã bỏ lưu: ${res.title}`, 'info');
      this.refreshCurrentView();
    }
  },

  // Appointment Drawer (Slide 08)
  openAppointmentDrawer(aptId) {
    const apt = CAMPUS_DATA.appointments.find(a => a.id === aptId) || CAMPUS_DATA.appointments[0];
    document.getElementById('drawer-apt-id').innerText = apt.id;
    document.getElementById('drawer-apt-status').className = `status-pill ${apt.statusClass}`;
    document.getElementById('drawer-apt-status').innerHTML = `<span class="status-dot"></span><span>${apt.status}</span>`;
    document.getElementById('drawer-apt-service').innerText = `${apt.serviceName} · ${apt.serviceDuration}`;
    document.getElementById('drawer-apt-counselor').innerText = `${apt.counselorName} · ${apt.location}`;
    document.getElementById('drawer-apt-time').innerText = apt.dateTime;
    document.getElementById('drawer-apt-format').innerText = apt.format;
    document.getElementById('drawer-apt-note').innerText = apt.notes;

    document.getElementById('appointment-detail-drawer').classList.remove('hidden');
  },
  closeAppointmentDrawer() {
    document.getElementById('appointment-detail-drawer').classList.add('hidden');
  },

  rescheduleAppointment() {
    this.closeAppointmentDrawer();
    this.startBooking();
    this.showToast('Vui lòng chọn khung giờ mới để đổi lịch', 'info');
  },

  confirmCancelAppointment() {
    if (confirm('Bạn có chắc muốn hủy lịch này? Chúng tôi khuyên bạn nên chọn Lưu trữ để giữ lại lịch sử hồ sơ.')) {
      this.showToast('Đã hủy lịch hẹn theo yêu cầu', 'info');
      this.closeAppointmentDrawer();
    }
  },

  archiveAppointment() {
    this.showToast('Đã chuyển lịch hẹn sang trạng thái Đã Lưu Trữ (Không xóa vật lý)', 'success');
    this.closeAppointmentDrawer();
  },

  addToCalendar() {
    this.showToast('Đã tạo tệp calendar.ics để đồng bộ Google Calendar/Apple Calendar', 'info');
  },

  startBooking() {
    this.navigateTo('student-booking');
  },

  selectServiceForBooking(serviceId) {
    this.bookingWizardState.serviceId = serviceId;
    this.startBooking();
  },

  selectSlotForBooking(day, time) {
    this.bookingWizardState.slotTime = `${day} · ${time}`;
    this.startBooking();
  },

  // Admin Service Modal CRUD (Slide 12)
  openAdminServiceModal() {
    document.getElementById('admin-service-modal').classList.remove('hidden');
  },
  closeAdminServiceModal() {
    document.getElementById('admin-service-modal').classList.add('hidden');
  },

  saveAdminService(event) {
    event.preventDefault();
    const name = document.getElementById('svc-form-name').value;
    const cat = document.getElementById('svc-form-category').value;
    const dur = document.getElementById('svc-form-duration').value;
    const format = document.getElementById('svc-form-format').value;
    const desc = document.getElementById('svc-form-desc').value;
    const counselor = document.getElementById('svc-form-counselor').value;

    const newSvc = {
      id: 'srv-' + (CAMPUS_DATA.services.length + 1),
      name: name,
      category: cat,
      duration: dur,
      format: format,
      counselor: counselor,
      status: 'Còn lịch',
      activeStatus: 'Hoạt động',
      isEnabled: true,
      badgeText: 'Hoạt động',
      badgeClass: 'status-confirmed',
      summary: desc,
      description: desc
    };

    CAMPUS_DATA.services.unshift(newSvc);
    this.closeAdminServiceModal();
    this.showToast(`Đã thêm thành công dịch vụ: ${name}`, 'success');
    this.refreshCurrentView();
  },

  toggleServiceActive(id) {
    const svc = CAMPUS_DATA.services.find(s => s.id === id);
    if (svc) {
      svc.isEnabled = !svc.isEnabled;
      svc.activeStatus = svc.isEnabled ? 'Hoạt động' : 'Tạm ngưng';
      svc.badgeText = svc.isEnabled ? 'Hoạt động' : 'Tạm ngưng';
      svc.badgeClass = svc.isEnabled ? 'status-confirmed' : 'status-suspended';
      this.showToast(`Dịch vụ ${svc.name} hiện: ${svc.isEnabled ? 'Đang bật' : 'Đang tắt'}`, 'info');
      this.refreshCurrentView();
    }
  },

  confirmDeleteService(id) {
    if (confirm('Xác nhận lưu trữ hoặc tạm ngừng dịch vụ này khỏi danh mục công khai?')) {
      const idx = CAMPUS_DATA.services.findIndex(s => s.id === id);
      if (idx !== -1) {
        CAMPUS_DATA.services[idx].isEnabled = false;
        CAMPUS_DATA.services[idx].activeStatus = 'Đã lưu trữ';
        CAMPUS_DATA.services[idx].badgeClass = 'status-archived';
        this.showToast('Đã lưu trữ dịch vụ an toàn', 'info');
        this.refreshCurrentView();
      }
    }
  },

  exportStudentJournal() {
    this.showToast('Đang tạo và tải xuống bản xuất nhật ký PDF...', 'success');
  },

  // Global Search suggestions (Slide 02)
  handleGlobalSearch(query) {
    const dropdown = document.getElementById('search-suggestions-dropdown');
    const list = document.getElementById('search-results-list');
    if (!dropdown || !list) return;

    if (!query || query.trim().length === 0) {
      dropdown.classList.add('hidden');
      return;
    }

    const q = query.toLowerCase();
    const matchedServices = CAMPUS_DATA.services.filter(s => s.name.toLowerCase().includes(q)).slice(0, 3);
    const matchedResources = CAMPUS_DATA.resources.filter(r => r.title.toLowerCase().includes(q)).slice(0, 3);

    if (matchedServices.length === 0 && matchedResources.length === 0) {
      list.innerHTML = `<div class="p-3 text-ink/50 text-center">Không tìm thấy kết quả nào cho "${query}"</div>`;
    } else {
      list.innerHTML = `
        ${matchedServices.map(s => `
          <div onclick="App.navigateTo('services'); App.showSearchSuggestions(false)" class="p-2.5 hover:bg-paper cursor-pointer flex items-center justify-between">
            <div>
              <span class="font-semibold text-ink">${s.name}</span>
              <span class="block text-[10px] text-ink/50">${s.category} · ${s.duration}</span>
            </div>
            <span class="text-[10px] font-bold text-sage">Dịch vụ</span>
          </div>
        `).join('')}
        ${matchedResources.map(r => `
          <div onclick="App.navigateTo('resources'); App.openResourceReader('${r.id}'); App.showSearchSuggestions(false)" class="p-2.5 hover:bg-paper cursor-pointer flex items-center justify-between">
            <div>
              <span class="font-semibold text-ink">${r.title}</span>
              <span class="block text-[10px] text-ink/50">${r.type} · ${r.duration}</span>
            </div>
            <span class="text-[10px] font-bold text-amber-700">Tài nguyên</span>
          </div>
        `).join('')}
      `;
    }
    dropdown.classList.remove('hidden');
  },

  showSearchSuggestions(show) {
    const dropdown = document.getElementById('search-suggestions-dropdown');
    if (dropdown) {
      if (show) dropdown.classList.remove('hidden');
      else setTimeout(() => dropdown.classList.add('hidden'), 250);
    }
  },

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
      }
    });
  },

  toggleMobileMenu(force) {
    const drawer = document.getElementById('mobile-menu-drawer');
    if (drawer) {
      if (typeof force === 'boolean') {
        if (force) drawer.classList.remove('hidden');
        else drawer.classList.add('hidden');
      } else {
        drawer.classList.toggle('hidden');
      }
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-3 rounded-xl shadow-lg border text-xs font-medium flex items-center gap-2 pointer-events-auto transition-all duration-300 transform translate-y-2 opacity-0 ${
      type === 'success' ? 'bg-emerald-900 text-white border-emerald-700' :
      type === 'error' ? 'bg-red-900 text-white border-red-700' :
      'bg-slate-900 text-white border-slate-700'
    }`;

    toast.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info'}" class="w-4 h-4 shrink-0"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 20);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Initialize App when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});


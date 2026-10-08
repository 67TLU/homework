/**
 * HOME PAGE - Module JS
 * Xử lý logic tương tác cho trang chủ
 */

const HomePage = {
  init() {
    this.setupHeroAnimations();
    this.setupCardInteractions();
  },

  setupHeroAnimations() {
    // Animate hero elements on load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.style.animation = 'fadeInUp 0.6s ease-out';
    }
  },

  setupCardInteractions() {
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  },

  handleQuickStart(actionType) {
    console.log(`Quick start action: ${actionType}`);
    App.showToast(`Bắt đầu: ${actionType}`, 'info');
  }
};

// Auto-initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => HomePage.init());
} else {
  HomePage.init();
}

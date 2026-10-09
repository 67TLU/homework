/**
 * DESIGN SYSTEM PAGE - Module JS
 */

const DesignSystemPage = {
  init() {
    console.log('Design System page initialized');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DesignSystemPage.init());
} else {
  DesignSystemPage.init();
}


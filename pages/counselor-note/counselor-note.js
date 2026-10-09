/**
 * COUNSELOR NOTE PAGE - Module JS
 */

const CounselorNotePage = {
  init() {
    console.log('Counselor Note page initialized');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CounselorNotePage.init());
} else {
  CounselorNotePage.init();
}


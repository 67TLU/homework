/**
 * STUDENT DASHBOARD PAGE - Module JS
 */

const StudentDashboardPage = {
  init() {
    console.log('Student Dashboard page initialized');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => StudentDashboardPage.init());
} else {
  StudentDashboardPage.init();
}


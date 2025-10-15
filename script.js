// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');

// Auto-theme based on time if no manual choice is saved
if (!saved) {
  const hour = new Date().getHours();
  const isDayTime = hour >= 7 && hour < 19; // Day = 7AM–6:59PM

  if (isDayTime) {
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    root.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
} else {
  // Load saved preference
  if (saved === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
}

// Add fade transition on theme change
root.style.transition = 'background 0.3s ease, color 0.3s ease';

// Manual theme toggle button
themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  const newTheme = root.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle?.addEventListener('click', () => {
  const isOpen = navList.style.display === 'flex';
  navList.style.display = isOpen ? 'none' : 'flex';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
});

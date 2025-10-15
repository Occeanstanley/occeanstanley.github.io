// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const saved = localStorage.getItem('theme');

// Set icon based on theme
function updateIcon(theme) {
  if (theme === 'light') {
    themeIcon.textContent = '🌞';
  } else {
    themeIcon.textContent = '🌙';
  }
}

// Auto-theme based on time if no saved preference
if (!saved) {
  const hour = new Date().getHours();
  const isDayTime = hour >= 7 && hour < 19;

  if (isDayTime) {
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
    updateIcon('light');
  } else {
    root.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    updateIcon('dark');
  }
} else {
  if (saved === 'light') {
    root.classList.add('light');
    updateIcon('light');
  } else {
    root.classList.remove('light');
    updateIcon('dark');
  }
}

// Add transition effect
root.style.transition = 'background 0.3s ease, color 0.3s ease';

// Manual theme toggle
themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  const newTheme = root.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  updateIcon(newTheme);
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle?.addEventListener('click', () => {
  const isOpen = navList.style.display === 'flex';
  navList.style.display = isOpen ? 'none' : 'flex';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
});

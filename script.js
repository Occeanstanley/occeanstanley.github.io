// Simple interactivity: year, theme toggle, mobile nav
document.getElementById('year').textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');

themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle?.addEventListener('click', () => {
  const open = navList.style.display === 'flex';
  navList.style.display = open ? 'none' : 'flex';
  navToggle.setAttribute('aria-expanded', String(!open));
});
// Animate elements on scroll
const faders = document.querySelectorAll('.fade-up');
const appearOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(el => appearOnScroll.observe(el));

// Handle multiple animation types
const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .scale-in');
const appearObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(el => appearObserver.observe(el));

// Scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollTopBtn';
scrollBtn.innerHTML = '↑';
document.body.appendChild(scrollBtn);

window.onscroll = function () {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
};

scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
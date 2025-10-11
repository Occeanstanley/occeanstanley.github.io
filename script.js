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

// Prefer light mode default if not set
if (!saved) root.classList.add('light');

// Typewriter effect
(function(){
  const el = document.getElementById('typewrite');
  if (!el) return;
  const full = el.getAttribute('data-text') || el.textContent || "";
  el.textContent = "";
  let i = 0;
  const speed = 85;
  const startDelay = 250;
  setTimeout(() => {
    const timer = setInterval(() => {
      el.textContent = full.slice(0, ++i);
      if (i >= full.length) clearInterval(timer);
    }, speed);
  }, startDelay);
})();

// ---- Analytics: custom GA4 event tracking ----
function trackEvent(name, props={}) {
  if (typeof window.gtag === 'function') {
    try { window.gtag('event', name, props); } catch {}
  }
}

// Track résumé, email, and project link clicks
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;

  // Résumé
  if (a.getAttribute('href')?.includes('Stanley_Occean_Resume')) {
    trackEvent('resume_download', { link_text: a.textContent?.trim() || 'resume', href: a.href });
  }

  // Email
  if (a.getAttribute('href')?.startsWith('mailto:')) {
    trackEvent('email_click', { email: a.getAttribute('href').replace('mailto:', '') });
  }

  // Project links
  if (a.closest('.project')) {
    const title = a.closest('.project')?.querySelector('h3')?.textContent?.trim() || 'unknown_project';
    const kind = a.textContent?.toLowerCase().includes('live') ? 'live' :
                 a.textContent?.toLowerCase().includes('code') ? 'code' : 'link';
    trackEvent('project_click', { project: title, type: kind, href: a.href });
  }
});

// Chatbot iframe visibility tracking
(function(){
  const iframe = document.querySelector('#chatbot iframe');
  if (!iframe) return;
  let fired = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && !fired) {
        fired = true;
        trackEvent('chatbot_iframe_view', { section: 'chatbot' });
      }
    });
  }, { threshold: 0.25 });
  observer.observe(iframe);
})();

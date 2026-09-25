const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 45, 240)}ms`;
  observer.observe(el);
});

const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav a:not(.nav-cta)');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px', threshold:0});

sections.forEach(s => activeObserver.observe(s));

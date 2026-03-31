
// Smooth active-link highlighting + progress + back-to-top + mobile nav
(function(){
  const sections = document.querySelectorAll('main .section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const progressBar = document.getElementById('progressBar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const yearEl = document.getElementById('year');

  // Year in footer
  yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });

  // Close nav when clicking a link (mobile)
  navMenu?.addEventListener('click', (e) => {
    if(e.target.matches('a')){
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Active section highlighting
  const idFromSection = (el) => el.id || 'home';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = idFromSection(entry.target);
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { root: null, rootMargin: '-50% 0px -45% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));

  // Back to top visibility + scroll progress
  const onScroll = () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrolled / height) * 100 : 0;
    progressBar.style.width = `${progress}%`;

    if(scrolled > 400){
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top behavior
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scroll for internal links with offset handled by CSS scroll-margin-top
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if(!link) return;
    const id = link.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
  });
})();
document.addEventListener("DOMContentLoaded", function () {
  const aboutWrap = document.querySelector(".about-wrap");

  if (!aboutWrap) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutWrap.classList.remove("hidden-on-scroll");
        observer.unobserve(aboutWrap);
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(aboutWrap);
});
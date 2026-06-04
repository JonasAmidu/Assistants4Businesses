const animations = document.querySelectorAll('[data-lottie]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const anchorLinks = document.querySelectorAll('a[href^="#"]');

const easeInOutCubic = (progress) =>
  progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

const scrollToTarget = (target) => {
  const header = document.querySelector('.site-header');
  const headerOffset = header ? header.getBoundingClientRect().height + 18 : 0;
  const start = window.scrollY;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  const distance = top - start;
  const duration = Math.min(1500, Math.max(950, Math.abs(distance) * 0.85));
  let startTime = null;

  const step = (timestamp) => {
    startTime ??= timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, start + distance * easeInOutCubic(progress));

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = targetId === '#top' ? document.querySelector('main') : document.querySelector(targetId);

    if (!target || reducedMotion) {
      return;
    }

    event.preventDefault();
    scrollToTarget(target);
    history.pushState(null, '', targetId);
  });
});

animations.forEach((container) => {
  const path = container.dataset.lottie;
  container.classList.add('motion-fallback');

  if (!window.lottie) {
    container.innerHTML = '<span></span><span></span><span></span>';
    return;
  }

  const animation = window.lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: !reducedMotion,
    autoplay: !reducedMotion,
    path
  });

  animation.addEventListener('DOMLoaded', () => {
    container.classList.add('lottie-ready');
    if (!reducedMotion) {
      animation.play();
    }
  });
});

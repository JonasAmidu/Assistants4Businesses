const animations = document.querySelectorAll('[data-lottie]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

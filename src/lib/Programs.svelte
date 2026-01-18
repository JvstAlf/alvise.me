<script lang="ts">
  let {
    href,
    top,
    left,
    progressTarget,
    imgSrc,
    imgAlt,
    setCursorBig
  } = $props();

  const CIRCUMFERENCE = 301.59;

  let progressValue = $state(0);
  let animationId: number | null = null;

  let prefersReducedMotion = false;

  $effect(() => {
    if (typeof window === 'undefined') return;

    prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  });

  function animateProgress(target: number) {
    if (animationId) cancelAnimationFrame(animationId);

    if (prefersReducedMotion) {
      progressValue = target;
      return;
    }

    const duration = 500;
    const start = performance.now();
    const initial = progressValue;

    function frame(time: number) {
      const elapsed = time - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // cubic-out

      progressValue = initial + (target - initial) * eased;

      if (t < 1) {
        animationId = requestAnimationFrame(frame);
      } else {
        animationId = null;
      }
    }

    animationId = requestAnimationFrame(frame);
  }

  /* Mobile auto-fill */
  $effect(() => {
    if (typeof window === 'undefined') return;

    if (window.innerWidth < 800) {
      animateProgress(progressTarget);
    }
  });
</script>

<a
  href={href}
  target="_blank"
  class="absolute w-25 h-25 sm:w-30 sm:h-30 rounded-full z-15
         bg-purple-400/10 inner-glow flex items-center justify-center
         transition-transform duration-300 hover:scale-110 cursor-none"
  style={`top: ${top}; left: ${left};`}
  onmouseenter={() => {
    animateProgress(progressTarget);
    setCursorBig(true);
  }}
  onmouseleave={() => {
    animateProgress(0);
    setCursorBig(false);
  }}
  title={imgAlt}
>
  <svg
    class="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
  >
    <circle
      cx="50"
      cy="50"
      r="47"
      fill="none"
      stroke="#9a6bf8"
      stroke-width="5"
      stroke-opacity="0.7"
      transform="rotate(-90 50 50)"
      stroke-dasharray={CIRCUMFERENCE}
      stroke-dashoffset={
        CIRCUMFERENCE - (CIRCUMFERENCE * progressValue) / 100
      }
    />
  </svg>

  <img
    src={imgSrc}
    alt={imgAlt}
    class="absolute w-[60%] h-[60%] z-10"
  />
</a>

<style>
  .inner-glow {
    background: rgba(154, 107, 248, 0.15);
    box-shadow: inset 0 0 24px 8px rgba(154, 107, 248, 0.3);
    animation: float-slow 4s infinite alternate;
  }

  @supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
    .inner-glow {
      backdrop-filter: blur(4px);
      background: rgba(154, 107, 248, 0.05);
    }
  }

  @keyframes float-slow {
    0% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(5px, -10px) scale(1.05);
    }
    100% {
      transform: translate(0, 0) scale(1);
    }
  }
</style>

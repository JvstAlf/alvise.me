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

  let progressValue = $state(0);
  let animationId: number | null = null;

  function animateProgress(target: number) {
    if (animationId) cancelAnimationFrame(animationId);

    const duration = 500;
    const start = performance.now();
    const initial = progressValue;

    function frame(time: number) {
      const elapsed = time - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // cubic out

      progressValue = initial + (target - initial) * eased;

      if (t < 1) {
        animationId = requestAnimationFrame(frame);
      } else {
        animationId = null;
      }
    }

    animationId = requestAnimationFrame(frame);
  }

  if(window.innerWidth < 800) {
    animateProgress(progressTarget)
  }

</script>

<a
  href={href}
  target="_blank"
  class="absolute w-25 h-25 xs:w-25 xs:h-25 sm:w-30 sm:h-30 lg:w-30 lg:h-30 xl:w-30 xl:h-30 cursor-none z-15 rounded-full bg-purple-400/10 backdrop-blur-xs inner-glow flex items-center justify-center inner-glow hover:scale-110 transition-all duration-400"
  style={`top: ${top}; left: ${left}; --progress: ${progressValue}`}
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
    class="absolute top-0 left-0 w-full h-full pointer-events-none"
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
      style="stroke-dasharray: 301.59; stroke-dashoffset: calc(301.59 - (301.59 * var(--progress) / 100));"
    />
  </svg>

  <img
    src={imgSrc}
    alt={imgAlt}
    class="absolute w-[60%] h-[60%] z-50"
  />
</a>

<style>
  .inner-glow {
    box-shadow: inset 0 0 24px 8px rgba(154, 107, 248, 0.3);
    animation: float-slow 4s infinite alternate;
  }

  @keyframes float-slow {
    0% {
      transform: translateX(0) translateY(0) scale(1);
    }
    50% {
      transform: translateX(5px) translateY(-10px) scale(1.05);
    }
    100% {
      transform: translateX(0) translateY(0) scale(1);
    }
  }
</style>

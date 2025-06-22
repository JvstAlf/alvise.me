<script lang="ts">
import { onMount } from 'svelte'

let element: HTMLElement
let isVisible = $state(false);

onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.6 }
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<div class="absolute w-100 h-screen-dvh flex justify-center items-center transition-all duration-500" bind:this={element}
class:opacity-100={isVisible}
  class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}>
<div class="bubble absolute"></div>
</div>

<style>
.bubble {
    width: 200vw;
    aspect-ratio: 1;
    border-radius: 9999px;
    background: rgba(196, 166, 255, 0.3);
    backdrop-filter: blur(8px);
    box-shadow: inset 0 0 64px 24px rgba(196, 166, 255, 0.6);
    animation: float-slow 6s ease-in-out infinite;
    will-change: transform, opacity;
    overflow: visible;
    z-index: 1;
}

@keyframes float-slow {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate3d(5px, -10px, 0) scale(1.05);
    opacity: 0.95;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
}
</style>
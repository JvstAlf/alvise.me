<script lang="ts">
  import { onMount } from 'svelte';

  let animationKeys = $state<Record<number, number>>({});

  let scale = $state(0)

  window.addEventListener('onscroll', () => {
    console.log(window.innerHeight)
  })

function checkScroll() {
  if (window.scrollY >= window.innerHeight * 1.5) {
    scale = 1;
  } else {
    scale = 0;
  }
}

  interface Bubble {
    id: number;
    size: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
    type: 'foreground' | 'background';
  }

  let bubbles = $state<Bubble[]>([]);

  interface SizeRange {
    min: number;
    max: number;
  }

  let bubbleSizeRange: SizeRange = { min: 40, max: 110 };

  function updateSizeRanges() {
    const width = window.innerWidth;

    if (width < 640) {
      bubbleSizeRange = { min: 100, max: 200 };
    } else if (width < 1024) {
      bubbleSizeRange = { min: 150, max: 300 };
    } else {
      bubbleSizeRange = { min: 200, max: 400 };
    }
  }

  function randomSize(range: SizeRange) {
    return range.min + Math.random() * (range.max - range.min);
  }

  function generateBubbles() {
    bubbles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: randomSize(bubbleSizeRange),
      left: 0 + Math.random() * 100,
      top: 0 + Math.random() * 100,
      delay: -(i * 0.5),
      duration: 8 + Math.random() * 6,
      type: i % 2 === 0 ? 'foreground' : 'background',
    }));
  }

  onMount(() => {
  updateSizeRanges();
  generateBubbles(); // ← generate immediately, not on scroll
  window.addEventListener('scroll', checkScroll);
  return () => window.removeEventListener('scroll', checkScroll);
});

</script>

<section class="fixed w-full h-screen top-0 transition-all duration-700 pointer-events-none"
  class:scale-0={scale === 0}
  class:scale-100={scale === 1}
>
  {#each bubbles as bubble (bubble.id)}
    {#key animationKeys[bubble.id] ?? 0}
      <div
        class="absolute rounded-full backdrop-blur-xl inner-glow bubble bg-purple-400/10 border-purple-300/20 {scale ? 'visible' : ''}"
        style="
          z-index: -10;
          width: {bubble.size}px;
          height: {bubble.size}px;
          left: {bubble.left}%;
          top: {bubble.top}%;
          animation-delay: {bubble.delay}s;
          animation-duration: {bubble.duration}s;
          opacity: {scale}; /* only animate this, not scale */
        "
      ></div>
    {/key}
  {/each}
</section>


<style>
  .bubble {
  /* Remove will-change entirely if animation is already smooth */
  animation-name: float;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  transition: box-shadow 0.3s ease;
  animation-duration: 10s;
  transform-origin: center;
  user-select: none;
  opacity: 0.3 !important;
  animation-play-state: paused;
  }

  .bubble.visible {
  animation-play-state: running;
}

  .inner-glow {
    box-shadow: inset 0 0 40px 10px rgba(196, 166, 255, 0.75);
  }

  @keyframes float {
    0% {
      transform: translate(0, 5vh) rotate(0deg) scale(0.9);
      opacity: 0.7;
    }
    25% {
      transform: translate(5px, 0vh) rotate(5deg) scale(1.1);
      opacity: 0.85;
    }
    50% {
      transform: translate(0, -5vh) rotate(0deg) scale(1.3);
      opacity: 1;
    }
    75% {
      transform: translate(-5px, 0vh) rotate(-5deg) scale(1.1);
      opacity: 0.85;
    }
    100% {
      transform: translate(0, 5vh) rotate(0deg) scale(0.9);
      opacity: 0.7;
    }
  }
</style>

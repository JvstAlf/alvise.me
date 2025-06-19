<script lang="ts">
  import { onMount } from 'svelte';

  let bubbleScale = $state(0);
  let xOffset = $state(0);
  const maxOffset = 75;

  let draggingId = $state<number | null>(null);
  let offsetX = 0;
  let offsetY = 0;

  let animationKeys = $state<Record<number, number>>({});
  let hoveringId = $state<number | null>(null);

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

  function onMouseDown(event: MouseEvent, bubbleId: number) {
    if (window.innerWidth > 800) {
      draggingId = bubbleId;
      const el = document.querySelector(`[data-id="${bubbleId}"]`) as HTMLElement;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
  }

  function onMouseMove(event: MouseEvent) {
    if (draggingId === null) return;

    const section = document.querySelector('section')!;
    const rect = section.getBoundingClientRect();

    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));
    const percentLeft = clamp(((event.clientX - rect.left - offsetX) / rect.width) * 100, 0, 100);
    const percentTop = clamp(((event.clientY - rect.top - offsetY) / rect.height) * 100, 0, 100);

    const idx = bubbles.findIndex((b) => b.id === draggingId);
    if (idx !== -1) {
      const bubble = bubbles[idx];
      bubbles = [
        ...bubbles.slice(0, idx),
        { ...bubble, left: percentLeft, top: percentTop },
        ...bubbles.slice(idx + 1)
      ];
    }
  }

  function onMouseUp() {
    if (draggingId !== null) {
      animationKeys = {
        ...animationKeys,
        [draggingId]: (animationKeys[draggingId] ?? 0) + 1
      };
    }
    draggingId = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  interface SizeRange {
    min: number;
    max: number;
  }

  let bubbleSizeRangeForeground: SizeRange = { min: 40, max: 110 };
  let bubbleSizeRangeBackground: SizeRange = { min: 120, max: 320 };

  function updateSizeRanges() {
    const width = window.innerWidth;
    if (width < 640) {
      bubbleSizeRangeForeground = { min: 10, max: 50 };
      bubbleSizeRangeBackground = { min: 80, max: 150 };
    } else if (width < 1024) {
      bubbleSizeRangeForeground = { min: 30, max: 80 };
      bubbleSizeRangeBackground = { min: 100, max: 200 };
    } else {
      bubbleSizeRangeForeground = { min: 50, max: 130 };
      bubbleSizeRangeBackground = { min: 150, max: 250 };
    }
  }

  function randomSize(range: SizeRange) {
    return range.min + Math.random() * (range.max - range.min);
  }

function generateBubbles() {
  const newForegroundBubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: randomSize(bubbleSizeRangeForeground),
    left: 10 + Math.random() * 70,              // Random horizontal pos
    top: 20 + Math.random() * 60,               // Random vertical pos
    delay: -(i * 0.5),
    duration: 8 + Math.random() * 6,
    type: 'foreground' as const
  }));

  const newBackgroundBubbles = Array.from({ length: 8 }, (_, i) => ({
    id: 100 + i,
    size: randomSize(bubbleSizeRangeBackground),
    left: 10 + Math.random() * 70,
    top: 10 + Math.random() * 60,
    delay: -(i * 0.5),
    duration: 8 + Math.random() * 6,
    type: 'background' as const
  }));

  bubbles = [...newForegroundBubbles, ...newBackgroundBubbles];
}


  let previousScale = 0;
  function updateScale() {
    const scrollY = window.scrollY;
    const width = window.innerWidth;
    const vh = window.innerHeight;
    const minScale = 0;

    let newScale = 0;
if (width < 800) {
  if (scrollY <= 0.9 * vh) {
    newScale = scrollY / (0.9 * vh);
  } else if (scrollY <= 1.1 * vh) {
    newScale = 1;
  } else if (scrollY <= 1.75 * vh) {
    newScale = 1 - ((scrollY - 1 * vh) / (0.75 * vh)) * (1 - minScale);
  } else if (scrollY <= 3.5 * vh) {
    // Hold at minScale between 1.75vh and 3.5vh
    newScale = minScale;
  } else if (scrollY <= 4 * vh) {
    newScale = minScale + ((scrollY - 3.5 * vh) / (0.5 * vh)) * (1 - minScale);
  } else {
    newScale = 1;
  }
} else {
  if (scrollY <= 0.9 * vh) {
    newScale = scrollY / (0.9 * vh);
  } else if (scrollY <= 1.1 * vh) {
    newScale = 1;
  } else if (scrollY <= 1.9 * vh) {
    newScale = 1 - ((scrollY - 1.1 * vh) / (0.8 * vh)) * (1 - minScale);
  } else if (scrollY <= 3.5 * vh) {
    newScale = minScale;
  } else if (scrollY <= 4 * vh) {
    newScale = minScale + ((scrollY - 3.5 * vh) / (0.5 * vh)) * (1 - minScale);
  } else {
    newScale = 1;
  }
}


    // Only update if different enough
    if (Math.abs(newScale - previousScale) > 0.01) {
      bubbleScale = newScale;
      previousScale = newScale;
      xOffset = Math.sin(bubbleScale * Math.PI * 2) * maxOffset;
    }
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScale();
        ticking = false;
      });
      ticking = true;
    }
  }

  let currentSizeCategory: 'small' | 'medium' | 'large' | null = null;

  function getSizeCategory(width: number): typeof currentSizeCategory {
    if (width < 640) return 'small';
    if (width < 1024) return 'medium';
    return 'large';
  }

  onMount(() => {
    currentSizeCategory = getSizeCategory(window.innerWidth);
    updateSizeRanges();
    generateBubbles();
    updateScale();

    const resizeHandler = () => {
      const newCategory = getSizeCategory(window.innerWidth);
      if (newCategory !== currentSizeCategory) {
        currentSizeCategory = newCategory;
        updateSizeRanges();
        generateBubbles();
      }
    };

    window.addEventListener('resize', resizeHandler);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('scroll', onScroll);
    };
  });
</script>

<section class="relative w-full h-screen flex items-center justify-center overflow-y-visible text-black overflow-x-hidden">
  <img src="assets/logo.png" alt="logo" class="w-[75%] absolute top-[50%] left-[50%] translate-[-50%] opacity-10" />

  {#each bubbles as bubble (bubble.id)}
    {#key animationKeys[bubble.id] ?? 0}
      <div
        class="absolute rounded-full pointer-events-auto backdrop-blur-xs inner-glow bubble {bubble.type === 'foreground' ? 'bg-purple-400/10 border-purple-300/20' : 'bg-purple-400/25 border-purple-300/40'}"
        data-id={bubble.id}
        onmousedown={(e) => onMouseDown(e, bubble.id)}
        onmouseenter={() => (hoveringId = bubble.id)}
        onmouseleave={() => (hoveringId = null)}
        role="button"
        tabindex="0"
        style="
  z-index: {bubble.type === 'foreground' ? 50 : 6};
  width: {bubble.size}px;
  height: {bubble.size}px;
  left: {bubble.left}vw;
  top: {bubble.top}vh;
  animation-delay: {bubble.delay}s;
  animation-duration: {bubble.duration}s;
  animation-play-state: {(draggingId === bubble.id || hoveringId === bubble.id) ? 'paused' : 'running'};
"
      ></div>
    {/key}
  {/each}

  <h1 class="text-scale relative z-10 fungky text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] selection:bg-[var(--main-color)] selection:text-white text-animation text-center">
    Alvise Zurlandi
  </h1>
</section>

<div
  class="fixed top-1/2 left-1/2 pointer-events-auto special-bubble-wrapper"
  style="transform: translate(calc(-50% + {xOffset}px), -50%) scale({bubbleScale}); transition: transform 0.1s ease-out;"
>
  <div class="special-bubble"></div>
</div>

<style>
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

  .bubble {
    animation-name: float;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    will-change: transform, opacity;
    transition: box-shadow 0.3s ease;
    animation-duration: 10s;
    transform-origin: center;
    user-select: none;
    -moz-user-select: none;
  }

  .bubble:hover:not(.dragging) {
  filter: drop-shadow(0 0 6px rgba(196, 166, 255, 0.8));
  animation-play-state: paused;
  transform: scale(1.2);
}

  .inner-glow {
    box-shadow: inset 0 0 12px 4px rgba(196, 166, 255, 0.6);
  }

  .special-bubble-wrapper {
    will-change: transform;
  }

  .special-bubble {
    position: relative;
    width: 90vw;
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

  @media screen and (max-width: 800px) and (orientation: portrait) {
    .special-bubble {
      width: 200vw;
    }
  }

  .special-bubble::before {
    content: "";
    position: absolute;
    top: 15%;
    left: 15%;
    width: 40%;
    height: 40%;
    background: radial-gradient(circle at 30% 30%, rgba(255 255 255 / 0.7), transparent 60%);
    border-radius: 50%;
    pointer-events: none;
    filter: blur(10px);
    transform: rotate(-15deg);
  }

  @keyframes float-slow {
    0% {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateX(5px) translateY(-10px) scale(1.05);
      opacity: 0.95;
    }
    100% {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
    }
  }

  .text-animation {
    animation: text 3s infinite alternate ease-in-out;
    -webkit-text-stroke: 1px var(--main-color);
  }

  @keyframes text {
    0% {
      scale: 1;
      transform: rotateX(0deg);
    }
    100% {
      scale: 1.05;
      transform: rotateX(20deg);
    }
  }
</style>

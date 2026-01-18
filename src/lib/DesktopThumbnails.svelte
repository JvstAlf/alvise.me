<script lang="ts">
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte'

    const slides = [
    'https://old.alvise.me/images/cytokinesis.webp',
    'https://old.alvise.me/images/euouae.webp',
    'https://old.alvise.me/images/napalm.webp',
    'https://old.alvise.me/images/5000.webp',
    'https://old.alvise.me/images/subsonic.webp',
    'https://old.alvise.me/images/cytokinesis.webp',
    'https://old.alvise.me/images/euouae.webp',
    'https://old.alvise.me/images/napalm.webp',
    'https://old.alvise.me/images/5000.webp',
    'https://old.alvise.me/images/subsonic.webp',
  ];

const rotation = writable(0);
const slideCount = slides.length;
const angleStep = 36;
let radius = $state(600)

let hoveredIndex: number | null = null;

  let startX = 0;
  let currentRotation = 0;
  let isDragging = false;

function rotate(direction: 'left' | 'right') {
  rotation.update(r => {
    if (direction === 'left') {
      currentRotation = r + angleStep;  // rotate carousel positively
    } else {
      currentRotation = r - angleStep;  // rotate carousel negatively
    }
    return currentRotation;
  });
}

function normalizeRotation(rot: number) {
  const fullRotation = slideCount * angleStep;
  return ((rot % fullRotation) + fullRotation) % fullRotation;
}

  function onPointerDown(event: PointerEvent) {
    isDragging = true;
    startX = event.clientX;
  }

  function onPointerMove(event: PointerEvent) {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    const rotationDelta = deltaX * 0.5;
    rotation.set(currentRotation + rotationDelta);
  }

  function onPointerUp() {
  if (!isDragging) return;
  isDragging = false;
  rotation.update(r => {
    // Snap rotation to closest slide
    const snapped = Math.round(r / angleStep) * angleStep;
    const normalized = normalizeRotation(snapped);
    currentRotation = snapped;  // keep snapped angle unnormalized for smoothness
    rotation.set(snapped);
    return snapped;
  });
}

let { setCursorBig } = $props()

let isVisible = $state(false);
  let element: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.5 }
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  });

</script>

<section class="w-full h-screen-dvh flex flex-col items-center justify-center relative transition-all duration-500 overflow-x-hidden"
bind:this={element}
  class:opacity-100={isVisible}
  class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}>

  <div class="absolute top-5 left-15 xl:w-40 xl:h-40 l:w-40 l:h-40 md:w-35 md:h-35 h-30 w-30 cursor-none z-15 rounded-full inner-glow bg-purple-400/15 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400">
  <p class="bagel md:text-2xl text-xl">Thumbnails</p>
  </div>

<div
  class="carousel-wrapper transition-all duration-500"
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
  onpointercancel={onPointerUp}
  onmouseleave={onPointerUp}
  style="touch-action: pan-y;"
  role="region"
  aria-label="Image Carousel"
>
  <div class="carousel" style="transform: rotateY({$rotation}deg);">
    {#each slides as src, i}
  <div
    class="carousel__slide transition-transform duration-300"
    role="listitem"
    style="transform: rotateY({i * angleStep}deg) translateZ({radius}px);"
  >
    <a
      class="absolute top-2 right-2 w-8 h-8 cursor-none z-15 rounded-full bg-purple-400/10 border border-purple-300/50 backdrop-blur-xs flex items-center justify-center transition-all duration-400 text-white font-bold text-xl hover:scale-110"
      href={src}>➦</a>

    <img
      src={src} 
      alt="Slide {i + 1}"
      class="carousel__image"
      onmouseenter={() => setCursorBig(true)}
      onmouseleave={() => setCursorBig(false)}
    />
  </div>
{/each}
  </div>

  <button class="absolute left-10 top-[50%] translate-y-[-50%] w-15 h-15 lg:w-20 lg:h-20 md:w-20 md:h-20 xl:w-20 xl:h-20 cursor-none z-50 rounded-full bg-purple-400/10 border-2 border-purple-300/50 backdrop-blur-xs inner-glow flex items-center justify-center inner-glow hover:scale-110 transition-all duration-400 text-purple-400 font-bold text-4xl md:text-5xl" onclick={() => rotate('left')} onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}><span class="w-full h-full flex justify-center items-center absolute bottom-1">&#x2039;</span></button>
  <button class="absolute right-10 top-[50%] translate-y-[-50%] w-15 h-15 lg:w-20 lg:h-20 md:w-20 md:h-20 xl:w-20 xl:h-20 cursor-none z-50 rounded-full bg-purple-400/10 border-2 border-purple-300/50 backdrop-blur-xs inner-glow items-center justify-center inner-glow hover:scale-110 transition-all duration-400 text-purple-400 font-bold text-4xl md:text-5xl flex" onclick={() => rotate('right')} onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}><span class="w-full h-full flex justify-center items-center absolute bottom-1">&#x203A;</span></button>

</div>

</section>

<style>
  .carousel-wrapper {
    perspective: 1200px;
    height: 100%;
    margin: auto;
    width: 100%;
    position: relative;
    user-select: none;
    overflow: hidden;
  }

  .carousel {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
    backface-visibility: hidden;
  }

  .carousel__slide {
    position: absolute;
  width: 350px;
  height: 198px;
  left: calc(50% - 175px);
  top: calc(50% - 99px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  overflow: hidden;
  backface-visibility: hidden;
  isolation: isolate;
  outline: 1px solid transparent;
  border: 1px solid transparent;
  }

  @media screen and (max-width: 800px) and (orientation: portrait) {
    .carousel__slide {
      width: 200px;
      height: 113px;
      left: calc(50% - 100px);
      top: calc(50% - 56.5px);
    }
  }

  .carousel__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  /* Firefox fixes */
  transform: translateZ(0.01px); /* force GPU layer */
  backface-visibility: hidden;
  image-rendering: auto;
}

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

<script lang="ts">
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte'

  const slides = [
    'https://www.alvise.me/images/norainnoflowers.webp',
    'https://www.alvise.me/images/sicfnmt.webp',
    'https://www.alvise.me/images/eyesneverlies.webp',
    'https://www.alvise.me/images/eyesnsmile.webp',
    'https://www.alvise.me/images/shootingforthestars.webp',
    'https://www.alvise.me/images/norainnoflowers.webp',
    'https://www.alvise.me/images/sicfnmt.webp',
    'https://www.alvise.me/images/eyesneverlies.webp',
    'https://www.alvise.me/images/eyesnsmile.webp',
    'https://www.alvise.me/images/shootingforthestars.webp',
  ];

const rotation = writable(0);
const slideCount = slides.length;
const angleStep = 36;
let radius = $state()
if(window.innerWidth < 800) {
   radius = 300
} else {
   radius = 500;
}

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

<section class="w-full h-screen-dvh flex flex-col items-center justify-center relative transition-all duration-500"
bind:this={element}
  class:opacity-100={isVisible}
  class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}>

    {#if window.innerWidth > 800}

  <div class="absolute top-5 left-15 xl:w-40 xl:h-40 l:w-40 l:h-40 md:w-35 md:h-35 h-30 w-30 cursor-none z-15 rounded-full inner-glow bg-purple-400/15 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400">
  <p class="bagel xl:text-3xl lg:text-3xl md:text-3xl text-2xl">Posters</p>
  </div>

  {:else}

  <div
   class="absolute top-[-7%] right-[-10%] h-50 w-50 cursor-none z-15 rounded-full inner-glow bg-purple-400/15 border border-purple-300/80 backdrop-blur-xs transition-all duration-500">
  </div>
  <p class="bagel text-3xl z-20 absolute right-0 top-5 p-2.5 text-an">Posters</p>

  {/if}

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
<a class="absolute top-2 right-2 w-8 h-8 cursor-none z-15 rounded-full bg-purple-400/10 border border-purple-300/50 backdrop-blur-xs flex items-center justify-center transition-all duration-400 text-white font-bold text-xl hover:scale-110" href={src}>➦</a>
  <img
    src={src}
    alt="Slide {i + 1}"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
  />
  
</div>
    {/each}
  </div>

  <button class="absolute left-10 top-[50%] translate-y-[-50%] w-15 h-15 lg:w-20 lg:h-20 md:w-20 md:h-20 xl:w-20 xl:h-20 cursor-none z-15 rounded-full bg-purple-400/10 border-2 border-purple-300/50 backdrop-blur-xs inner-glow flex items-center justify-center inner-glow hover:scale-110 transition-all duration-400 text-purple-400 font-bold text-3xl md:text-4xl" onclick={() => rotate('left')} onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}><span class="w-full h-full flex justify-center items-center absolute bottom-1">&#8678;</span></button>
  <button class="absolute right-10 top-[50%] translate-y-[-50%] w-15 h-15 lg:w-20 lg:h-20 md:w-20 md:h-20 xl:w-20 xl:h-20 cursor-none z-15 rounded-full bg-purple-400/10 border-2 border-purple-300/50 backdrop-blur-xs inner-glow items-center justify-center inner-glow hover:scale-110 transition-all duration-400 text-purple-400 font-bold text-3xl md:text-4xl flex" onclick={() => rotate('right')} onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}><span class="w-full h-full flex justify-center items-center absolute bottom-1">&#8680;</span></button>

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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
  }

  .carousel__slide {
    position: absolute;
    width: 280px;   /* narrower width to match A4 ratio */
    height: 420px;  /* taller height for poster */
    left: calc(50% - 140px);
    top: calc(50% - 210px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    overflow: hidden;
    backface-visibility: hidden;
    user-select: none;
    transform-origin: center center;
    will-change: transform;
    backface-visibility: hidden;
    isolation: isolate;
  }

  @media screen and (max-width: 800px) and (orientation: portrait) {
    .carousel__slide {
      width: 175px;
      height: 247px;
      left: calc(50% - 87.5px);
      top: calc(50% - 123.5px);
    }

    .carousel-wrapper {
      perspective: 1000px;
    }
  }

  .carousel__slide img {
    object-fit: cover;
    display: block;
    width: 100%;
    height: 100%;
  }

  .inner-glow {
    box-shadow: inset 0 0 24px 8px rgba(154, 107, 248, 0.3);
    animation: float-slow 4s infinite alternate;
  }

  .text-an {
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

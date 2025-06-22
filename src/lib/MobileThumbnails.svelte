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
let radius = $state(225)

let carouselWrapper: HTMLElement;

function handleTouchStart(e: TouchEvent) {
  startY = e.touches[0].clientY;
}

function handleTouchMove(e: TouchEvent) {
  const deltaY = e.touches[0].clientY - startY;

  // Prevent vertical scrolling if dragging vertically
  if (Math.abs(deltaY) > 5) {
    e.preventDefault();
  }
}

  let startY = 0;
  let currentRotation = 0;
  let isDragging = false;

function rotate(direction: 'down' | 'up') {
  rotation.update(r => {
    if (direction === 'down') {
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
    event.preventDefault()
    isDragging = true;
    startY = event.clientY;
  }

  function onPointerMove(event: PointerEvent) {
    if (!isDragging) return;
    event.preventDefault()
    const deltaY = event.clientY - startY;
    const rotationDelta = -deltaY * 0.5;
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

let isVisible = $state(false);
  let element: HTMLElement;

  onMount(() => {
  if (!carouselWrapper) return;

  carouselWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
  carouselWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });

  return () => {
    carouselWrapper.removeEventListener('touchstart', handleTouchStart);
    carouselWrapper.removeEventListener('touchmove', handleTouchMove);
  };
});

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.7 }
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  });

</script>

<section class="w-full h-screen-dvh flex flex-col relative transition-all duration-500 overflow items-center"
bind:this={element}
  class:opacity-100={isVisible}
  class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}>

  <div
  bind:this={element}
  class:opacity-100={isVisible}
  class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
   class="absolute top-[-7%] left-[-10%] h-50 w-50 cursor-none z-15 rounded-full inner-glow bg-purple-400/15 border border-purple-300/80 backdrop-blur-xs transition-all duration-500">
  </div>
  <p class="bagel text-2xl z-20 absolute left-0 top-5 p-2.5 text-an">Thumbnails</p>

<div
  class="carousel-wrapper transition-all duration-500 absolute bottom-0"
  role="region"
  aria-label="Image Carousel"
>
  <div class="carousel" style="transform: rotateX({$rotation}deg);"
  bind:this={carouselWrapper}>
    {#each slides as src, i}
      <div
  class="carousel__slide transition-transform duration-300"
  role="listitem"
  style="transform: rotateX({i * angleStep}deg) translateZ({radius}px); touch-action: none;"
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
  onpointercancel={onPointerUp}
  onmouseleave={onPointerUp}
>
<a class="absolute top-2 right-2 w-8 h-8 cursor-none z-15 rounded-full bg-purple-400/10 border border-purple-300/50 backdrop-blur-xs flex items-center justify-center transition-all duration-400 text-white font-bold text-xl hover:scale-110" href={src}>➦</a>
  <img
    src={src}
    alt="Slide {i + 1}"
  />
  
</div>
    {/each}
  </div>

  <button class="absolute left-[50%] top-[5%] translate-x-[-50%] w-15 h-15 lg:w-20 lg:h-20 md:w-20 md:h-20 xl:w-20 xl:h-20 cursor-none z-50 rounded-full bg-purple-400/10 border-2 border-purple-300/50 backdrop-blur-xs inner-glow flex items-center justify-center inner-glow hover:scale-110 transition-all duration-400 text-purple-400 font-bold text-3xl md:text-4xl" onclick={() => rotate('up')}><span class="w-full h-full flex justify-center items-center absolute bottom-1">&#8679;</span></button>
  <button class="absolute left-[50%] bottom-[5%] translate-x-[-50%] w-15 h-15 lg:w-20 lg:h-20 md:w-20 md:h-20 xl:w-20 xl:h-20 cursor-none z-50 rounded-full bg-purple-400/10 border-2 border-purple-300/50 backdrop-blur-xs inner-glow items-center justify-center inner-glow hover:scale-110 transition-all duration-400 text-purple-400 font-bold text-3xl md:text-4xl flex" onclick={() => rotate('down')}><span class="w-full h-full flex justify-center items-center absolute bottom-1">&#8681;</span></button>

</div>

</section>

<style>
  .carousel-wrapper {
    perspective: 1200px;
    height: 85%;
    min-width: 80%;
    user-select: none;
    overflow: hidden;
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
    width: 225px;
    height: 127px;
    left: calc(50% - 112.5px);
    top: calc(50% - 63.5px);
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

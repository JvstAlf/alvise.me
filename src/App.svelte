<script lang="ts">
  import Header from './lib/Header.svelte';
  import DesktopInfo from './lib/DesktopInfo.svelte';
  import MobileInfo from './lib/MobileInfo.svelte'
  import Posters from './lib/Posters.svelte';
  import MobileThumbnails from './lib/MobileThumbnails.svelte';
  import DesktopThumbnails from './lib/DesktopThumbnails.svelte';
  import Bubbles from './lib/Bubbles.svelte';
  import Websites from './lib/Websites.svelte'
  import Footer from './lib/Footer.svelte'
  import { onMount } from 'svelte';
  import MobileBubble from './lib/MobileBubble.svelte';

let cursorX = $state(0);
let cursorY = $state(0);
let cursorVisible = $state(false);
let cursorBig = $state(false);
let cursorWhite = $state(false)

  function onMouseMove(e: MouseEvent) {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorVisible = true;
  }

  function onMouseLeave() {
    cursorVisible = false;
  }

  function setCursorBig(value: boolean) {
    cursorBig = value;
  }

  function setCursorWhite(value: boolean) {
    cursorWhite = value
  }

  function resetHash() {
  if (window.location.hash && document.getElementById(window.location.hash.substring(1))) {
    history.replaceState('', document.title, window.location.pathname);
  }
}

  onMount(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    resetHash()

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  });
</script>

<main class="w-full h-auto cursor-none relative overflow-x-hidden">
  <!-- Custom cursor -->
  {#if cursorVisible && window.innerWidth > 800}
  <div
    class="pointer-events-none fixed z-999 rounded-full backdrop-blur-xs transition-all duration-200 ease-out"
    style="
      width: {cursorBig ? '42px' : '20px'};
      height: {cursorBig ? '42px' : '20px'};
      border: {cursorBig ? '2px' : '1px'} solid {cursorBig ? '#985cff' : '#c05cff' };
      transform: translate(-50%, -50%);
      left: {cursorX}px;
      top: {cursorY}px;
      box-shadow: 0 0 {cursorBig ? '50px' : '25px'} 5px rgba(180,100,255,0.7);
      background-color: {cursorWhite ? 'rgba(226, 196, 255, 0.4)' : 'rgba(168, 85, 247, 0.3)'}
    "
  ></div>
  {/if}

  <Header setCursorBig={setCursorBig}/>

  <Bubbles />

  <div id="info"></div>
  {#if window.innerWidth < 800}
  <MobileBubble />
  <MobileInfo />
  {:else}
  <DesktopInfo setCursorBig={setCursorBig}/>
  {/if}

  <div id="posters"></div>
  <Posters setCursorBig={setCursorBig}/>

  <div id="thumbnails"></div>
  {#if window.innerWidth < 800}
  <MobileThumbnails />
  {:else}
  <DesktopThumbnails setCursorBig={setCursorBig}/>
  {/if}

  {#if window.innerWidth < 800}\
  <MobileBubble />
  {/if}
  <div id="websites"></div>
  <Websites setCursorBig={setCursorBig}/>

  <Footer setCursorBig={setCursorBig} setCursorWhite={setCursorWhite}/>

  <p class="p-5 w-full text-center text-xs text-white/50 absolute bottom-0 z-150">Built with Svelte + Tailwind CSS + Typescript<br>© 2025 Zurlandi Alvise</p>

</main>
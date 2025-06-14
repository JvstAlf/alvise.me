<script lang="ts">
  import Header from './lib/Header.svelte';
  import DesktopInfo from './lib/DesktopInfo.svelte';
  import MobileInfo from './lib/MobileInfo.svelte'
  import Posters from './lib/Posters.svelte';
  import Thumbnails from './lib/Thumbnails.svelte';
  import Bubbles from './lib/Bubbles.svelte';
  import Websites from './lib/Websites.svelte'
  import { onMount } from 'svelte';

let cursorX = $state(0);
let cursorY = $state(0);
let cursorVisible = $state(false);
let cursorBig = $state(false);
$inspect(cursorBig)

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

  onMount(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  });
</script>

<main class="w-full min-h-screen cursor-none relative">
  <!-- Custom cursor -->
  {#if cursorVisible && window.innerWidth > 800}
  <div
    class="pointer-events-none fixed z-999 rounded-full bg-purple-500/30 backdrop-blur-xs transition-all duration-200 ease-out"
    style="
      width: {cursorBig ? '42px' : '20px'};
      height: {cursorBig ? '42px' : '20px'};
      border: {cursorBig ? '2px' : '1px'} solid {cursorBig ? '#985cff' : '#c05cff' };
      transform: translate(-50%, -50%);
      left: {cursorX}px;
      top: {cursorY}px;
      box-shadow: 0 0 {cursorBig ? '50px' : '25px'} 5px rgba(180,100,255,0.7)
    "
  ></div>
  {/if}

  <Header />

  <Bubbles />

  {#if window.innerWidth < 800}
  <MobileInfo />
  {:else}
  <DesktopInfo setCursorBig={setCursorBig}/>
  {/if}

  <Posters setCursorBig={setCursorBig}/>

  <Thumbnails setCursorBig={setCursorBig}/>

  <Websites setCursorBig={setCursorBig}/>

  <p class="p-5 w-full text-center text-xs text-gray-500 absolute bottom-0">Built with Svelte + Tailwind CSS + Typescript</p>

</main>
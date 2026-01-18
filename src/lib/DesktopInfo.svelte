<script lang="ts">
  import { onMount } from 'svelte';
  import Pfp from '../assets/pfp.png';
  import Program from './Programs.svelte'

  let isVisible = $state(false);
  let element: HTMLElement;
  let threshold = $state(0.5)

  if(window.innerWidth < 640) {
    threshold = 0.8
  } else {
    threshold = 0.7
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: threshold}
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  });

  let { setCursorBig } = $props()

</script>

<section class="w-full h-screen-dvh flex relative z-10 overflow-x-hidden" bind:this={element}>

  <div
    class="transition-all duration-700 ease-in-out w-70 h-70 flex justify-center items-center rounded-full bg-purple-400/10 border border-purple-300/30 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow absolute top-[20%] left-[15%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
  >
    <img src={Pfp} alt="me" class="rounded-full h-[75%] w-[75%] object-cover" />
  </div>

  <div
    class="transition-all duration-700 ease-in-out w-60 h-60 flex justify-center items-center rounded-full bg-violet-400/10 border border-violet-300/50 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow-indigo absolute top-[16%] left-[40%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
  >
    <p class="w-[90%] text-center text-4xl bagel">Zurlandi Alvise</p>
  </div>

  <a
    class="transition-all text-center duration-700 ease-in-out w-40 h-40 hover:scale-110 flex justify-center text-2xl bagel cursor-none items-center rounded-full bg-violet-400/20 border border-violet-400/50 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow-indigo absolute top-[55%] left-[10%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    href="https://drive.google.com/file/d/1nrTgpdwTIjI2ywoTlYrzBeXJNUphGwae/view?usp=drive_link"
    target="_blank"
    onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}
  >Portfolio
  </a>

  <a
    class="transition-all text-center duration-700 ease-in-out w-40 h-40 hover:scale-110 flex justify-center text-2xl bagel cursor-none items-center rounded-full bg-purple-400/20 border border-purple-400/50 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow absolute top-[75%] left-[15%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    href="/assets/Curriculum.pdf"
    target="_blank"
    onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}
  >Curriculum
  </a>

  <div
    class="transition-all duration-700 ease-in-out w-100 h-100 flex justify-center items-center rounded-full bg-violet-400/10 border border-violet-300/30 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow-indigo absolute top-[50%] left-[30%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
  >
  <p class="w-[85%] text-center text-lg bagel leading-relaxed">
    Graduated at <br>
    <a 
      class="text-violet-500 hover:scale-110 inline-block transition-all duration-200 underline-offset-1 hover:underline cursor-none" 
      href="https://www.liceoguggenheim.edu.it/" target="_blank"
      onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}
    >
    Michelangelo Guggenheim's Art High School
    </a><br>
    Work Experience:<br>
    <a 
      class="text-violet-500 hover:scale-110 inline-block transition-all duration-200 underline-offset-1 hover:underline cursor-none" 
      href="https://www.deminternationalveniceartgallery.com/" target="_blank"
      onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}
    >
    D'E.M. International Venice Art Gallery
    </a><br>
    <a 
      class="text-violet-500 hover:scale-110 inline-block transition-all duration-200 underline-offset-1 hover:underline cursor-none" 
      href="https://www.winofsk.com/" target="_blank"
      onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}
    >
    Winofsk Art Oasis
    </a><br>
    <a 
      class="text-violet-500 hover:scale-110 inline-block transition-all duration-200 underline-offset-1 hover:underline cursor-none" 
      href="https://emvisia.com/" target="_blank"
      onmouseenter={() => setCursorBig(true)} onmouseleave={() => setCursorBig(false)}
    >
    Emvisia by HENOTO S.P.A.
    </a><br>
    <span class="text-sm opacity-30">Hover Programs to see experience level</span>
  </p>

  </div>

  <div class="w-full h-screen-dvh transition-all duration-600"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}>

  <Program
  href="https://en.wikipedia.org/wiki/HTML"
  top="12%"
  left="62%"
  progressTarget={90}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
  imgAlt="HTML"
  setCursorBig={setCursorBig}
  />

  <Program
  href="https://en.wikipedia.org/wiki/CSS"
  top="15%"
  left="75%"
  progressTarget={85}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/ab/Official_CSS_Logo.svg"
  imgAlt="CSS"
  setCursorBig={setCursorBig}
  />

  <Program
  href="https://en.wikipedia.org/wiki/Javascript"
  top="30%"
  left="65%"
  progressTarget={75}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
  imgAlt="Javascript"
  setCursorBig={setCursorBig}
  />

  <Program
  href="https://en.wikipedia.org/wiki/Photoshop"
  top="33%"
  left="77%"
  progressTarget={85}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
  imgAlt="Photoshop"
  setCursorBig={setCursorBig}
  />

  <Program
  href="https://en.wikipedia.org/wiki/Illustrator"
  top="47%"
  left="60%"
  progressTarget={90}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
  imgAlt="Illustrator"
  setCursorBig={setCursorBig}
  />

  <Program
  href="https://en.wikipedia.org/wiki/Figma"
  top="50%"
  left="72%"
  progressTarget={50}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
  imgAlt="Figma"
  setCursorBig={setCursorBig}
  />

  <Program
  href="https://en.wikipedia.org/wiki/Svelte"
  top="65%"
  left="63%"
  progressTarget={45}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
  imgAlt="Svelte"
  setCursorBig={setCursorBig}
  />

  <Program
  href="https://en.wikipedia.org/wiki/Adobe_XD"
  top="68%"
  left="75%"
  progressTarget={45}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg"
  imgAlt="Adobe XD"
  setCursorBig={setCursorBig}
  />

  <Program
  href="https://en.wikipedia.org/wiki/InDesign"
  top="82%"
  left="67%"
  progressTarget={60}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg"
  imgAlt="InDesign"
  setCursorBig={setCursorBig}
  />

  </div>

</section>

<style>
  .inner-glow {
    box-shadow: inset 0 0 24px 8px rgba(154, 107, 248, 0.3);
    animation: float-slow 4s infinite alternate;
  }

  .inner-glow-indigo {
    box-shadow: inset 0 0 24px 8px rgba(133, 107, 248, 0.3);
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

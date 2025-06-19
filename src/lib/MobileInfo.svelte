<script lang="ts">
  import { onMount } from 'svelte';
  import Pfp from '../assets/pfp.png';
  import Program from './Programs.svelte'

  let isVisible = $state(false);
  let element: HTMLElement;

  let info: HTMLElement; let info1: HTMLElement; let info2: HTMLElement; let info3: HTMLElement; let info4: HTMLElement; let info5: HTMLElement; let button1: HTMLElement; let button2: HTMLElement
  let programs: HTMLElement;

function showPrograms(value: boolean) {
  programs.style.pointerEvents = value ? 'auto' : 'none'
  if(value === true) {
    programs.style.display = 'flex'
    setTimeout(() => {
    programs.style.translate = '0'
  }, 100);
  } else {
    programs.style.translate = '1000px'
    setTimeout(() => {
    programs.style.display = 'none'
  }, 250)
  }
  info.style.pointerEvents = value ? 'none' : 'auto'
  info1.style.translate = value ? '-1000px' : '0'
  info2.style.translate = value ? '1000px' : '0'
  info3.style.translate = value ? '-1000px' : '-50%'
  info4.style.translate = value ? '-1000px' : '0'
  info5.style.translate = value ? '1000px' : '0'
  button1.style.translate = value ? '-1000%': '-50%'
  button2.style.translate = value ? '-25%' : '1000px'
}

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.7}
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  });

</script>

<section class="w-full h-screen-dvh flex relative z-10 transition-all duration-500 overflow-x-hidden" bind:this={element}
  class:opacity-100={isVisible}
  class:opacity-0={!isVisible}
  class:translate-y-15={!isVisible}
  class:translate-y-0={isVisible}
  class:scale-0={!isVisible}
  class:scale-100={isVisible}>

  <div bind:this={info} class="w-full h-screen-dvh absolute">

  <div
    class="transition-all duration-700 ease-in-out w-30 h-30 flex justify-center items-center rounded-full bg-purple-400/10 border border-purple-300/30 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow absolute top-[10%] left-[10%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    bind:this={info1}
  >
    <img src={Pfp} alt="me" class="rounded-full h-[75%] w-[75%] object-cover" />
  </div>

  <div
    class="transition-all duration-700 ease-in-out w-40 h-40 flex justify-center items-center rounded-full bg-violet-400/10 border border-violet-300/50 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow-indigo absolute top-[8%] right-[10%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    bind:this={info2}
  >
    <p class="w-[90%] text-center text-2xl bagel">Zurlandi Alvise</p>
  </div>

  <div
    class="transition-all duration-700 ease-in-out w-80 h-80 flex justify-center items-center rounded-full bg-violet-400/10 border border-violet-300/50 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow-indigo absolute top-[30%] left-[50%] translate-x-[-50%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    bind:this={info3}
  >
  <p class="w-[85%] text-center text-md bagel leading-relaxed">
    Graduated at <br>
    <a 
      class="text-violet-500 hover:scale-110 inline-block transition-all duration-200 underline-offset-1 hover:underline cursor-none" 
      href="https://www.liceoguggenheim.edu.it/" target="_blank"
    >
    Michelangelo Guggenheim's Art High School
    </a><br>
    Work Experience:<br>
    <a 
      class="text-violet-500 hover:scale-110 inline-block transition-all duration-200 underline-offset-1 hover:underline cursor-none" 
      href="https://www.deminternationalveniceartgallery.com/" target="_blank"
    >
    D'E.M. International Venice Art Gallery
    </a><br>
    <a 
      class="text-violet-500 hover:scale-110 inline-block transition-all duration-200 underline-offset-1 hover:underline cursor-none" 
      href="https://www.winofsk.com/" target="_blank"
    >
    Winofsk Art Oasis
    </a><br>
  </p>

  </div>

  <a
    class="transition-all text-center duration-700 ease-in-out w-25 h-25 flex justify-center text-lg bagel cursor-none items-center rounded-full bg-purple-400/20 border border-purple-400/50 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow absolute top-[70%] left-[5%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    href="https://drive.google.com/file/d/1nrTgpdwTIjI2ywoTlYrzBeXJNUphGwae/view?usp=drive_link"
    target="_blank"
    bind:this={info4}
  >Portfolio
  </a>

  <a
    class="transition-all text-center duration-700 ease-in-out w-25 h-25 flex justify-center text-lg bagel cursor-none items-center rounded-full bg-purple-400/20 border border-purple-400/50 pointer-events-auto z-15 backdrop-blur-xs transform inner-glow absolute top-[70%] right-[5%]"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    href="/assets/Curriculum.pdf"
    target="_blank"
    bind:this={info5}
  >Curriculum
  </a>

  <button onclick={() => showPrograms(true)} class="transition-all duration-700 ease-in-out w-30 h-30 flex justify-center items-center rounded-full bg-violet-400/15 border border-violet-300/50 pointer-events-auto z-15 backdrop-blur-xs transform text-lg inner-glow-indigo absolute bottom-[10%] left-[50%] translate-x-[-50%] bagel"
    bind:this={button1}>Click to see Skills</button>

  </div>


  <div class="w-full h-screen-dvh transition-all duration-600 absolute translate-x-[1000px] pointer-events-none hidden" bind:this={programs}>

  <Program
  href="https://en.wikipedia.org/wiki/HTML"
  top="10%"
  left="15%"
  progressTarget={90}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
  imgAlt="HTML"
  setCursorBig='0'
  />

  <Program
  href="https://en.wikipedia.org/wiki/CSS"
  top="12%"
  left="60%"
  progressTarget={85}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/ab/Official_CSS_Logo.svg"
  imgAlt="CSS"
  setCursorBig='0'
  />

  <Program
  href="https://en.wikipedia.org/wiki/Javascript"
  top="25%"
  left="25%"
  progressTarget={75}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
  imgAlt="Javascript"
  setCursorBig='0'
  />

  <Program
  href="https://en.wikipedia.org/wiki/Photoshop"
  top="28%"
  left="65%"
  progressTarget={85}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
  imgAlt="Photoshop"
  setCursorBig='0'
  />

  <Program
  href="https://en.wikipedia.org/wiki/Illustrator"
  top="40%"
  left="10%"
  progressTarget={90}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
  imgAlt="Illustrator"
  setCursorBig='0'
  />

  <Program
  href="https://en.wikipedia.org/wiki/Figma"
  top="43%"
  left="50%"
  progressTarget={50}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
  imgAlt="Figma"
  setCursorBig='0'
  />

  <Program
  href="https://en.wikipedia.org/wiki/Svelte"
  top="56%"
  left="25%"
  progressTarget={45}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
  imgAlt="Svelte"
  setCursorBig='0'
  />

  <Program
  href="https://en.wikipedia.org/wiki/Adobe_XD"
  top="60%"
  left="60%"
  progressTarget={45}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg"
  imgAlt="Adobe XD"
  setCursorBig='0'
  />

  <Program
  href="https://en.wikipedia.org/wiki/InDesign"
  top="70%"
  left="6%"
  progressTarget={60}
  imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg"
  imgAlt="InDesign"
  setCursorBig='0'
  />

  <button onclick={() => showPrograms(false)} class="transition-all duration-700 ease-in-out w-30 h-30 flex justify-center items-center rounded-full bg-violet-400/15 border border-violet-300/30 pointer-events-auto z-15 backdrop-blur-xs text-lg transform inner-glow-indigo absolute bottom-[10%] left-[50%] translate-x-[-50%] bagel"
    bind:this={button2}>Click to see Info</button>

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

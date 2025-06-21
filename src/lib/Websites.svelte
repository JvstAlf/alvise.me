<script lang="ts">
  import { onMount } from 'svelte'
  let { setCursorBig } = $props()

  let isVisible = $state(false);
  let element: HTMLElement;
  let iframeHref = $state('iframe.html')

  const handleIframeLinkClick = (href: string) => {
    if(window.innerWidth < 800) {
      window.open(href)
    } else {
      iframeHref = href;
    }
  };

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

<section class="w-full h-screen-dvh flex justify-center items-center relative transition-all duration-500" bind:this={element} id="websites"
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    >

    {#if window.innerWidth > 800}

    <div class="w-[70%] h-auto aspect-video relative">
    <div class=" absolute w-75 inner-glow h-75 z-1 top-[-10%] right-[5%] cursor-none rounded-full inner-glow bg-purple-400/30 border border-purple-300/80 backdrop-blur-xs transition-all duration-400"></div>
    <div class=" absolute w-100 inner-glow h-100 z-1 bottom-[-15%] left-[-5%] cursor-none rounded-full inner-glow bg-purple-400/30 border border-purple-300/80 backdrop-blur-xs transition-all duration-400"></div>
    <iframe src={iframeHref} frameborder="0" class="w-full h-full bg-white rounded-3xl border-2 border-purple-500 shadow-purple-300 shadow-2xl z-10 absolute" name="iframe" title="Websites"></iframe>
    <a target="_blank" href={iframeHref} class="text-center absolute w-15 inner-glow h-15 top-[5%] right-[3%] cursor-none z-20 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-2xl text-purple-400"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}>➦</a>
    
    </div>

    {/if}

    {#if window.innerWidth > 800}

    <p class="text-center absolute w-40 inner-glow h-40 top-[5%] right-[5%] cursor-none z-15 rounded-full inner-glow bg-violet-400/20 border border-violet-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-2xl">Websites</p>

    {:else}

    <div
   class="absolute top-[-7%] right-[-10%] h-50 w-50 cursor-none z-15 rounded-full inner-glow bg-violet-400/15 border border-violet-300/80 backdrop-blur-xs transition-all duration-500">
  </div>
  <p class="bagel text-3xl z-20 absolute right-0 top-5 p-2.5 text-an">Websites</p>
    
    {/if}

    {#if window.innerWidth > 800}

    <a href="https://portfolio.alvise.me/" target="iframe" class="text-center absolute w-30 inner-glow h-30 top-[15%] left-[10%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://portfolio.alvise.me/')}
    >Portfolio</a>

    <a href="https://off-white.alvise.me/" target="iframe" class="text-center absolute w-30 inner-glow h-30 top-[30%] left-[8%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://off-white.alvise.me/')}
    >Off-White</a>

    <a href="https://demonlist.alvise.me/" target="iframe" class="text-center absolute w-30 inner-glow h-30 top-[45%] left-[7%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://demonlist.alvise.me/')}
    >Svelte App</a>

    <a href="https://old.alvise.me/" target="iframe" class="text-center absolute w-30 inner-glow h-30 top-[7%] left-[20%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://old.alvise.me/')}
    >Old alvise.me</a>

    {:else}

    <a href="https://portfolio.alvise.me/" target="iframe" class="text-center absolute w-40 inner-glow h-40 top-[12%] left-[10%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://portfolio.alvise.me/')}
    ><img src="https://portfolio.alvise.me/images/logo.png" class="absolute w-[40%] white-glow object-center p-1 rounded-full z-20 bg-white/70 inner-glow2 top-[-10%] left-[-10%] backdrop-blur-2xl" alt="logo">
    Portfolio</a>

    <a href="https://off-white.alvise.me/" target="iframe" class="text-center absolute w-40 inner-glow h-40 top-[48%] left-[8%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://off-white.alvise.me/')}
    ><img src="https://off-white.alvise.me/images/logo.svg" class="absolute w-[40%] object-center p-1 rounded-full bg-white/70 inner-glow2 top-[-10%] right-[-10%] backdrop-blur-2xl" alt="logo">
    Off-White</a>

    <a href="https://demonlist.alvise.me/" target="iframe" class="text-center absolute w-40 inner-glow h-40 top-[65%] right-[7%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://demonlist.alvise.me/')}
    ><img src="https://demonlist.alvise.me/assets/icon-qKxQj6EV.png" class="absolute w-[40%] object-center p-1 rounded-full bg-white/70 inner-glow2 top-[-10%] left-[-10%] backdrop-blur-2xl" alt="logo">
    Svelte App</a>

    <a href="https://old.alvise.me/" target="iframe" class="text-center absolute w-40 inner-glow h-40 top-[30%] right-[8%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://old.alvise.me/')}
    ><img src="https://www.alvise.me/favicon.ico" class="absolute w-[40%] object-center p-1 rounded-full bg-white/70 inner-glow2 top-[-10%] left-[-10%] backdrop-blur-2xl" alt="logo">
    Old alvise.me</a>

    {/if}


</section>

<style>
.inner-glow {
    box-shadow: inset 0 0 12px 4px rgba(154, 107, 248, 0.3);
    animation: float-slow 4s infinite alternate;
  }

  .inner-glow2 {
    box-shadow: inset 0 0 12px 4px rgba(154, 107, 248, 0.3);
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
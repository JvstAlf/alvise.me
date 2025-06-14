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
      { threshold: 0.5 }
    );

    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<section class="w-full h-screen flex justify-center items-center relative transition-all duration-500" bind:this={element}
    class:opacity-100={isVisible}
    class:opacity-0={!isVisible}
    class:translate-y-15={!isVisible}
    class:translate-y-0={isVisible}
    class:scale-0={!isVisible}
    class:scale-100={isVisible}
    >

    {#if window.innerWidth > 800}

    <div class="w-[70%] h-auto aspect-video relative">
    <iframe src={iframeHref} frameborder="0" class="w-full h-full bg-white rounded-3xl border-2 border-purple-500 shadow-purple-300 shadow-2xl" name="iframe" title="Websites"></iframe>
    <a target="_blank" href={iframeHref} class="text-center absolute w-15 inner-glow h-15 top-[5%] right-[3%] cursor-none z-20 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-2xl text-purple-400"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}>➦</a>
    </div>

    {/if}

    <p class="text-center absolute w-40 inner-glow h-40 top-[5%] right-[5%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-2xl">Websites</p>

    <a href="https://portfolio.alvise.me/" target="iframe" class="text-center absolute w-30 inner-glow h-30 top-[15%] left-[10%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://portfolio.alvise.me/')}
    >Portfolio</a>

    <a href="https://off-white.alvise.me/" target="iframe" class="text-center absolute w-30 inner-glow h-30 md:top-[30%] md:left-[8%] top-[30%] left-[50%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://off-white.alvise.me/')}
    >Off-White</a>

    <a href="https://demonlist.alvise.me/" target="iframe" class="text-center absolute w-30 inner-glow h-30 top-[45%] md:left-[7%] left-[12%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://demonlist.alvise.me/')}
    >Svelte App</a>

    <a href="https://old.alvise.me/" target="iframe" class="text-center absolute w-30 inner-glow h-30 md:top-[7%] md:left-[20%] top-[60%] left-[52%] cursor-none z-15 rounded-full inner-glow bg-purple-400/20 border border-purple-300/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 transition-all duration-400 bagel text-xl"
    onmouseenter={() => setCursorBig(true)}
    onmouseleave={() => setCursorBig(false)}
    onclick={() => handleIframeLinkClick('https://old.alvise.me/')}
    >Old alvise.me</a>

</section>

<style>
.inner-glow {
    box-shadow: inset 0 0 12px 4px rgba(154, 107, 248, 0.3);
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
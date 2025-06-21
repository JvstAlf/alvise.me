<script lang="ts">
    let { setCursorBig } = $props()
</script>

<section class="h-screen-dvh w-full flex items-end z-5">
    <footer class="w-full md:h-[70%] h-[80%] bg-linear-to-t from-violet-500/70 to-purple-500/70 z-5 flex md:justify-around justify-start items-center md:p-5 p-3 md:gap-10 gap-2 text-center flex-col md:flex-row">

        <div class="md:h-[80%] w-[100%] md:p-6 p-2 flex flex-col justify-start items-center">
            <h1 class="md:text-3xl lg:text-4xl text-2xl bagel text-white p-6">Sections:</h1>
            <div class="flex w-full md:flex-col flex-wrap justify-center items-center">
            <a href="#header" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Header</a>
            <a href="#info" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Info</a>
            <a href="#posters" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Posters</a>
            <a href="#thumbnails" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Thumbnails</a>
            <a href="#websites" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Websites</a>
            </div>
        </div>

        <div class="md:h-[80%] w-[100%] md:p-6 p-2 flex flex-col justify-start items-center">
            <h1 class="md:text-3xl lg:text-4xl text-2xl bagel text-white p-6">Contacts:</h1>
            <div class="flex w-full md:flex-col flex-wrap justify-center items-center">
            <a href="mailto:zurlandi@alvise.me" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>zurlandi@alvise.me</a>
            <a href="https://www.linkedin.com/in/alvise-zurlandi-165705293/" target="_blank" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Linkedin</a>
            <a href="https://github.com/JvstAlf" target="_blank" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Github</a>
            </div>
        </div>

        <div class="md:h-[80%] w-[100%] md:p-6 p-2 flex flex-col justify-start items-center">
            <h1 class="md:text-3xl lg:text-4xl text-2xl bagel text-white p-6">Links:</h1>
            <div class="flex w-full md:flex-col flex-wrap justify-center items-center">
            <a href="assets/Curriculum.pdf" target="_blank" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Curriculum</a>
            <a href="https://drive.google.com/file/d/1nrTgpdwTIjI2ywoTlYrzBeXJNUphGwae/view?usp=drive_link" target="_blank" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Portfolio</a>
            <a href="https://old.alvise.me" target="_blank" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Old alvise.me</a>
            <a href="https://portfolio.alvise.me" target="_blank" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Thumbnails Website</a>
            <a href="https://off-white.alvise.me" target="_blank" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Off-White Website</a>
            <a href="https://demonlist.alvise.me" target="_blank" class="cursor-none text-white md:text-2xl text-xl bagel text-stroke hover:scale-110 transition-all duration-200 inline-block md:p-3 p-2 border-b-2 border-transparent hover:border-white"
            onmouseenter={() => setCursorBig(true)}
            onmouseleave={() => setCursorBig(false)}>Svelte App</a>
            </div>
        </div>

    </footer>
</section>

<style>
    .text-stroke {
        text-shadow: 0 3px 5px rgba(81, 0, 187, 0.7)
    }
</style>
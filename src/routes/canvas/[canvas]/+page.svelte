<script lang="ts">
  import { enhance } from "$app/forms";
  import { redirect } from "@sveltejs/kit";
  import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';
  import { onDestroy } from "svelte";


  let color: string =  "#000000" // black start color
  
  export let data;
  let isFavorite: boolean;
  if (data.user.id == data.prisma_canvas.userId) {
    isFavorite = true;
  }
  else {
    isFavorite = false;
  }
  let eraserIsActive = false;
  let pixelHeight: number = 640/Math.sqrt(data.prisma_canvas.pixel.length); 
  let pixelWidth: number = 640/Math.sqrt(data.prisma_canvas.pixel.length);


  if (browser) {
    let interval = setInterval(() => {
        invalidateAll();
    }, 200);
    onDestroy(() => {
      clearInterval(interval);
    });
}

  if (!data.user) {
    redirect(301, "/guest");
  }

  function fillBrush() {
    for (let pixel of data.prisma_canvas.pixel) {
      pixel.color = color;
    }
  }
  
 
</script>

<nav id="navbar">
  <div>
      <a id="link" href="/canvas">Menu</a>
  </div>
  <form method="post" action="/guest/login?/logout" use:enhance>
      <button class="button">Logout</button>
  </form>
</nav>

<div class="container">
  <div id="clear">
    <form method="post" action="?/clear" use:enhance>
      <button>clear</button>
    </form>
  </div>
  <div id="grid">
    {#each data.prisma_canvas.pixel as pixel, i}
    <form method="post" action="?/paint" use:enhance>
    <input type="hidden" name="color" value="{color}">
    <input type="hidden" name="id" value={pixel.id}>
    <input type="hidden" name="eraserIsActive" value="{eraserIsActive?true:null}">
      <button class="pixel" style="background-color: {pixel.color || 'white'}; border-color: {pixel.userColor}; width: {pixelWidth}px; height: {pixelHeight}px;"
      on:mousemove={(event) => {
          if (event.buttons === 1 && data.user && (pixel.color !== color || eraserIsActive)) {
            pixel.color = eraserIsActive? 'white':color; 
            pixel.userColor = data.user.color;

            if (event.currentTarget) event.currentTarget.click();
          }
      }}
      ></button>
      </form>
    {/each}
  </div>
  <div id="options" class="container">
    <form id="favoritForm" method="post" action="?/favorite" use:enhance>
      <input name="isFavorite" type="checkbox" id="favoriteBox" bind:checked={isFavorite} on:change={() => {
        document.getElementById('favoritForm')?.submit()}}>
    </form>
    <input type="color" id="color_picker" class="color_picker" bind:value={color}/>
    <button id="eraser" on:click={() => {eraserIsActive = !eraserIsActive}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16">
        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
      </svg>
    </button>
    <button id="bucket" on:click={fillBrush}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paint-bucket" viewBox="0 0 16 16">
        <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a3 3 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1 1 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4 4 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067S8.857 3.052 8.23 2.704c-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.3 3.3 0 0 1-.131-.673q.137.09.337.274m.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088q.081.181.183.365c.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626q.183.103.365.183l-4.861 4.862-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46s-1.168-1.32-1.46-1.846c-.147-.265-.225-.47-.251-.607l-.01-.068zm2.87-1.935a2.4 2.4 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.5 3.5 0 0 0-1.066.091 11 11 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"/>
      </svg>
    </button> <!-- Add the fill brush button -->
  </div>
</div>
 
<style>

  .container {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    margin: 10px;
  }
  #clear{
    display: flex;
    width: fit-content;
    margin: 10px;
    background-color: white;
    color: black;
  }

  .pixel {
    height: 20px;
    width: 20px;
    border: 0.1px solid #ddd;
    float: left;
  }

  #grid {
    display: table;
    width: 640px;
  }

  #options{
    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
  }

  .color_picker {
    height: 25px;
    width: 25px;
    border: none;
  }
  #eraser {
    height: 25px;
    width: 25px;
    border: none;
  }

  #bucket {
    height: 25px;
    width: 25px;
    border: none;
  }

  nav{
        position: fixed;
        top: 0%;
        height: fit-content;
        width: 100vw;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        background-color: black;
    }
    nav div{
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 300px;
    }

    nav form button{
        position: absolute;
        display: inline-block;
        right:30px;
        top: 50%;
        transform: translateY(-50%);
        text-align: right;
    }

    a{
        text-decoration: none;
        color: white;
    }

    a:hover, button:hover{
        color: rgb(202, 202, 202);
    }

    .button{
        border: none;
        background-color: black;
        color: white;
    }
</style>

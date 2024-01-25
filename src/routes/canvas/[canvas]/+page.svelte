<script lang="ts">
  import { enhance } from "$app/forms";

  let color: string =  "#000000" // black start color
  export let data;
</script>

<div id="grid">
  {#each data.prisma_canvas.pixel as pixel, i}
  <form method="post" action="?/paint" use:enhance>
  <input type="hidden" name="color" value="{color}">
  <input type="hidden" name="id" value={pixel.id}>
    <button class="pixel" style="background-color: {pixel.color || 'white'}"
    on:mousemove={(e) => {
        if (e.buttons === 1 && pixel.color !== color) {
          //ts-ignore
          pixel.color = color;
          // dont perform the click if color hasnt changed!

          e.target.click();
        }
    }}
    ></button>
    </form>
  {/each}
</div>
<input type="color" id="color_picker" class="color_picker" bind:value={color} />
<form method="post" action="?/clear" use:enhance>
  <button>Clear</button>
</form>

<style>
  .pixel {
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    float: left;
  }

  #grid {
    width: 640px;
    margin: 10px auto;
  }
  .color_picker {
    height: 30px;
    width: 30px;
  }
</style>

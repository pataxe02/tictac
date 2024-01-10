<script lang="ts">
  let color: string =  "#000000" // black start color
  let pixels : Record<number,string> = {}
</script>

<div id="grid">
  {#each Array(1024) as _, i}
    <button class="pixel" style="background-color: {pixels[i] || 'white'}"
    on:click={() => {
        pixels[i] = color;
    }}
    on:mousemove={(e) => {
        if (e.buttons === 1) {
            pixels[i] = color;
        }
    }}
    ></button>
  {/each}
</div>
<input type="color" id="color_picker" class="color_picker" bind:value={color} />
<button id="clearButton" on:click={()=>{
  for(let i = 0; i < 1024; i++){
    pixels[i] = 'white';
  }
}}>Clear</button>

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

<script lan='ts'>
  import { enhance } from '$app/forms';


export let data;
export let form;

$: console.log(data.canvasses)
</script>


<div id="canvas_create">
    <form action="?/create" method="post" use:enhance>
        <label for="canvasName">New Canvas</label>
        <input type="text" name="canvasName">
        <button>Create</button>
        {#if form?.canvasName}
            <span>{form.canvasName}</span>
        {/if}
    </form>
</div>


<div id="canvas_list">
    {#each data.canvasses as canvas}
        <p><a href='/canvas/{canvas.name}'>{canvas.name}</a></p>
    {/each}
</div>




<style>

    div{
        margin: 10px;
        display: flex;
        border: none;
    }

    #canvas_list{
        position: relative;
        display: block;
        height: fit-content;
        width: fit-content;
        left: 80%;
        top: 30%;
        transform: scale(1.1);
    }

    #canvas_create{
        position: absolute;
        display: flex;
        left: 37%;
        width: fit-content;
        transform: scale(1.3);
    }

    a{
        text-decoration: none;
        color: black
    }
    a:hover{
        text-decoration: underline;
    }

</style>
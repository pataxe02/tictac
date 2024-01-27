<script lan='ts'>
  import { enhance } from '$app/forms';

export let data;
export let form;

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
    <div id="canvas_create">
        <form action="?/create" method="post" use:enhance>
            <label for="canvasName">Name:</label>
            <input type="text" name="canvasName">
            <label for="resolution">Resolution:</label>
            <select name="resolution" id="resolution">
                <option value="4096">64x64</option>
                <option value="1024">32x32</option>
                <option value="256">16x16</option>
                <option value="64">8x8</option>
                <option value="16">4x4</option>
            </select>
            <button>Create</button>
            {#if form?.canvasName}
                <span>{form.canvasName}</span>
            {/if}
        </form>
    </div>

    <div id="canvas_list">
        {#each data.canvasses as canvas}
            <form method="post" action="?/delete" use:enhance><ul><a href='/canvas/{canvas.name}'>{canvas.name}</a><button name="canvasId" value="{canvas.id}" id="delete">❌</button></ul></form>
        {/each}
    </div>
</div>




<style>
    #delete{
        border: none;
        background-color: transparent;
        font-size: 10px;
    }
    #delete:hover{
        scale: 1.05;
    }
    .container{
        margin: 20px;
        display: flex;
        padding-top: 50px;
        justify-content: center;
    }

    #canvas_list{
        display: flex;
        margin-left: 35px;
        padding: 5px;
        height: fit-content;
        width: fit-content;
        color: black;
        flex-direction: column;
        border: 1px solid black;
    }

    #canvas_create{
        display: flex;
        width: fit-content;
        justify-content: center;
    }

    #canvas_create form{
        display: grid;
        scale: 1.2;
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
        color: black;
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
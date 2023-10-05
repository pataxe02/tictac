<script lan='ts'>
  import { enhance } from '$app/forms';


export let data;
export let form;

$: console.log(data.session)
</script>


<div id="session_create">
    <form action="?/create" method="post" use:enhance>
        <label for="sessionName">New Session</label>
        <input type="text" name="sessionName">
        <button>Create</button>
        {#if form?.sessionName}
            <span>{form.sessionName}</span>
        {/if}
    </form>
</div>


<div id="session_list">
    {#each data.session as session}
        <p><a href='/sessions/{session.name}'>{session.name} - {session.message.length} Messages</a></p>
    {/each}
</div>




<style>

    div{
        margin: 10px;
        display: flex;
        border: none;
    }

    #session_list{
        position: relative;
        display: block;
        height: fit-content;
        width: fit-content;
        left: 80%;
        top: 30%;
        transform: scale(1.1);
    }

    #session_create{
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
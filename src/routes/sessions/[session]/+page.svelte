<script>
    import { browser } from "$app/environment";
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    
    export let form;
    export let data;

    browser ? setInterval(invalidateAll, 1000) : null;

</script>

<form method="post" action="?/message" use:enhance>
    <input type="text" name="message">
    <button>Send</button>
    {#if form?.message}
        <span>{form.message}</span>
    {/if}
</form>

{#each [...data.messages].reverse() as message}
    <div>
        <p>
            <span>{message.userName}:  {message.message}</span>
        </p>
    </div>
{/each}
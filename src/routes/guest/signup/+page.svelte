<script lang="ts">
    import { enhance } from "$app/forms";
    
    let userColor = "#000000";
    
    export let form;

</script>

<form method="post" action="?/signup" use:enhance>

    <label for="username">Username</label>
    <input type="text" name ="username">
    <label for="password">Password</label>
    <input type="password" name='password'>
    <input name = "userColor" type="color" value="{userColor}">
    <button>Sign Up</button>
    {#if form?.username}
        <span>{form.username}</span>
    {/if}
</form>
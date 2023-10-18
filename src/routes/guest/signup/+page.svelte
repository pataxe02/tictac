<form method="post" action="?/signup" use:enhance>

    <label for="username">Username</label>
    <input type="text" name ="username">
    <label for="password">Password</label>
    <input type="password" name='password'>
    <button>Sign Up</button>
    {#if form?.username}
        <span>{form.username}</span>
    {/if}
</form>

<script lang="ts">
    import { enhance } from "$app/forms";
    
    export let form;

</script>
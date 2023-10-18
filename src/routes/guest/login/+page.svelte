<form method="post" action="?/login" use:enhance>

    <label for="username">Username</label>
    <input type="text" name ="username">
    <label for="password">Password</label>
    <input type="password" name='password'>
    <button>Login</button>

</form>

<script lang="ts">
    import { enhance } from "$app/forms";


</script>
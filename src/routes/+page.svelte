<html lang="en">

    <title>Login</title>

    <nav id="navbar">
        <div>
            <a id="link" href="/sessions">Chat Sessions</a>
        </div>
        <form method="post" action="/guest/login?/logout" use:enhance>
            <button class="button">Logout</button>
        </form>
    </nav>

</html>



<script lang="ts">

    import { enhance } from "$app/forms";

</script>

<style>

    *{
        overflow: hidden;
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

    button{
        border: none;
        background-color: black;
        color: white;
    }

</style>
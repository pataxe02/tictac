import { fail, redirect, type Cookies, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib';

export const load = (async ({cookies}) => {
    let username = cookies.get('username')
    if (username){
        console.log('signup')
        throw redirect(307, '/')
    }
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    signup: async ({request, cookies})=> {

        let data = await request.formData();
        let username = data.get("username")?.toString();
        let password = data.get('password')?.toString();

        if(!username){
            return fail(404, {username:'Please submit a username'})
        }
        if(!password){
            return fail(404, {username:'Please submit a password'})
        }

        let user = await prisma.user.findUnique({where:{name:username}})

        if(user){
            return fail(400, {username:'Username is taken'})
        }

        await prisma.user.create({
            data: 
            {name: username, password: password}
        })

        cookies.set('username', username,{path: '/' , secure: false, expires: new Date(2044,10,12)});
        throw redirect(307, '/');

    }
}

import { fail, redirect, type Cookies, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib';
import { randomBytes, pbkdf2Sync } from 'crypto';

function hashPassword(password:string) {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}
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
        let userColor = data.get('userColor')?.toString();

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
        const { salt, hash } = hashPassword(password);
        await prisma.user.create({
            data: 
            {name: username, password: hash, salt: salt, color:userColor? userColor : '#FFFFFF'}
            
        })

        cookies.set('username', username,{path: '/' , secure: false, expires: new Date(2044,10,12)});
        throw redirect(307, '/');

    }
}

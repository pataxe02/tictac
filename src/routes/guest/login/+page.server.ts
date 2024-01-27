import { fail, redirect, type Cookies, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib';
import { randomBytes, pbkdf2Sync } from 'crypto';

function validatePassword(inputPassword:string, storedSalt:string, storedHash:string) {
    const hash = pbkdf2Sync(inputPassword, storedSalt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
}



export const load = (async ({cookies}) => {
    let username = cookies.get('username')
    if (username){
        console.log('login')
        throw redirect(307, '/')
    }
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({request, cookies})=> {

        let data = await request.formData();
        let username = data.get("username")?.toString();
        let password = data.get('password')?.toString();
        

        if(!username){
            return fail(400,{username:"user doesnt exist"})
        }
        // check if user extists

        let user = await prisma.user.findUnique({where:{name:username}})

        if(user){

            if(validatePassword(password!, user.salt, user.password)){   
                cookies.set('username', username,{path: '/' , secure: false, expires: new Date(2044,10,12)});
                throw redirect(307, '/');
            }

            else{
                return fail(400, {password:'Incorrect password'});
            }
        }
    }, 

    logout: async ({request, cookies})=> {
        cookies.delete('username',{path:'/'});
        throw redirect(307, '/guest');
    } 
};
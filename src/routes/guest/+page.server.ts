import { fail, redirect, type Cookies, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';


export const load = (async ({cookies}) => {
    let username = cookies.get('username')
    if (username){
        console.log('guest')
        throw redirect(307, '/')
    }
    return {};
}) satisfies PageServerLoad;
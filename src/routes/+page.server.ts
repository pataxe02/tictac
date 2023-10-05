import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load = (async ({cookies}) => {
    let username = cookies.get('username');
    if(!username){
        throw redirect(303, '/guest');
    }
    return {username};
}) satisfies PageServerLoad;
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib';

export let _sessions = new Map();
export const load = (async() => {
    let session = await prisma.session.findMany({include:{message:{select:{id:true}}}})
return {session}
}) satisfies PageServerLoad

export const actions: Actions = {
    create: async({request})=>{
        let data = await request.formData();
        let sessionName = data.get('sessionName')?.toString().replaceAll(' ', '');

        if(!sessionName)
        return fail(422, {sessionName: 'Session name cannot be empty'});
        if(sessionName){
            await prisma.session.create({
                data: {name: sessionName}
            });
        }
    }
};
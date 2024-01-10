import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import { prisma } from '$lib';

export let _canvasses = new Map();
export const load = (async() => {
    return {canvasses: await prisma.canvas.findMany()};
}) satisfies PageServerLoad

export const actions: Actions = {
    create: async({request, cookies})=>{
        let data = await request.formData();
        let canvasName = data.get('canvasName')?.toString().replaceAll(' ', '');
        let username = cookies.get('username')

        if(!canvasName)
        return fail(422, {canvasName: 'canvas name cannot be null'});

        if(canvasName){
            await prisma.canvas.create({
                data: {name: canvasName, pixel: {
                    createMany: {
                        data:[{color: '#000000', userName: username}]
                    }
                }},
                
            });
        }
    }
};
import { error, fail, redirect } from '@sveltejs/kit';
import { _canvasses } from '../+page.server';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib';


export const load = (async ({params, cookies}) => {
    let canvas = params.canvas;
    let username = cookies.get('username');
    let prisma_canvas = await prisma.canvas.findFirst({where: {name: canvas}, include: {pixel: true}});

    if(!prisma_canvas){
        throw redirect(301, '/');
    }

    let user = await prisma.user.findUnique({
        where: {name:username}
    });

    if(typeof username === 'undefined'){
        throw redirect(303, '/');
    }

    return {canvas, prisma_canvas, user};
}) satisfies PageServerLoad;

export const actions: Actions = {
    pixel: async({request, params, cookies})=>{
        let canvas = params.canvas;
        let username = cookies.get('username');
        let prisma_canvas = await prisma.canvas.findFirst({where: {name: canvas}, include:{pixel: true}});
        let author = await prisma.user.findUnique({where: {name: username}})

        if(!prisma_canvas){
            throw error(404, 'canvas "${canvas}" not found')
        }

        if(!author){
            console.log(author)
            throw redirect(307, '/guest')
        }
    }
};
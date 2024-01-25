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
    },

    paint: async({request, params, cookies})=>{
        let canvasName = params.canvas;
        let username = cookies.get('username');
        let data = await request.formData();
        let color = data.get('color')?.toString();
        let id = data.get('id')?.toString();

        let attempts = 0;

        while (attempts < 5){
            try {
                await prisma.canvas.update({
                    where: {name: canvasName},
                    data: {
                        pixel: {
                            update: {
                                where: {id: id?parseInt(id):0},
                                data: {color: color, userName: username}
                            }
                        }
                    }
                });
                break;
            } catch (error) {
                attempts++;
                console.log(attempts)
            }
        }

      
        // update the pixel id to the new color
    },
        clear: async({request, params, cookies})=>{
    
            let canvasName = params.canvas;

            await prisma.canvas.update({
                where: {name: canvasName},
                data: {
                    pixel: {
                        updateMany: {
                            where : {},
                            data: {color: "white"}
                        }
                    }
                }
            });
    }
};
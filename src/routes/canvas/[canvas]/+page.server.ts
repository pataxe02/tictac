import { error, fail, redirect } from '@sveltejs/kit';
import { _canvasses } from '../+page.server';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib';
import { connect } from 'http2';
import { disconnect } from 'process';



export const load = (async ({params, cookies}) => {
    let canvas = params.canvas;
    let username = cookies.get('username');
    let prisma_canvas = await prisma.canvas.findFirst({where: {name: canvas}, include: {pixel: true}});
    let user = await prisma.user.findUnique({where: {name:username}});

    if(!prisma_canvas){
        throw redirect(301, '/');
    }

    if(!user){
        throw redirect(307, '/guest')
    }

    // todo: postgres does not return pixels sorted by id.
    prisma_canvas.pixel.sort((a, b)=>a.id-b.id);

    return {canvas, prisma_canvas, user};
})satisfies PageServerLoad;

export const actions: Actions = {
    pixel: async({request, params})=>{
        let canvas = params.canvas;
        let prisma_canvas = await prisma.canvas.findFirst({where: {name: canvas}, include:{pixel: true}});

        if(!prisma_canvas){
            throw error(404, 'canvas "${canvas}" not found')
        }
    },

    paint: async({request, params, cookies})=>{
        let canvasName = params.canvas;
        let data = await request.formData();
        let color = data.get('color')?.toString();
        let eraser = data.get('eraserIsActive');
        let id = data.get('id')?.toString();
        let username = cookies.get('username');
        let user = await prisma.user.findUnique({where: {name:username}});


        let attempts = 0;
        while (attempts < 3){
            try {
                await prisma.canvas.update({
                    where: {name: canvasName},
                    data: {
                        pixel: {
                            update: {
                                where: {id: id?parseInt(id):0},
                                data: {color: eraser?'white':color!, userColor: user!.color}
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

      
    },
    clear: async({request, params})=>{
    
        let canvasName = params.canvas;

        await prisma.canvas.update({
            where: {name: canvasName},
            data: {
                pixel: {
                    updateMany: {
                        where : {},
                        data: {color: "white", userColor: null}
                    }
                }
            }
        });
    },
    favorite: async({request, params, cookies})=>{
        let canvasName = params.canvas;
        let data = await request.formData();
        let isFavorite = Boolean(data.get('isFavorite'));
        let username = cookies.get('username');
        console.log(isFavorite)

        await prisma.user.update({
            where: { name: username },
            data: {
                Canvas: {
                    [isFavorite ? 'connect' : 'disconnect']: { name: canvasName }
                }
            }
        });
    }
};
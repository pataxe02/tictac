import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import { prisma } from '$lib';
import { connect } from 'http2';

export let _canvasses = new Map();
export const load = (async() => {

    let temp = await prisma.canvas.findMany();

    return {canvasses: temp};
}) satisfies PageServerLoad

export const actions: Actions = {
    create: async({request})=>{
        let data = await request.formData();
        let canvasName = data.get('canvasName')?.toString().replaceAll(' ', '');
        let resolution = Number(data.get('resolution'))


        if(!canvasName)
        return fail(422, {canvasName: 'canvas name cannot be null'});

        if(canvasName){
            await prisma.canvas.create({
                data: {name: canvasName, pixel: {
                    create: 
                        Array(resolution).fill({color: '#FFFFFF'})
                    
                }},
                
            });
        }
    },
    delete: async({request})=>{
        let data = await request.formData();
        let canvasId = Number(data.get('canvasId')?.toString().replaceAll(' ', ''));


        await prisma.canvas.update({
            data: {pixel: {deleteMany: {}}},
            where: {id: canvasId}});
        await prisma.canvas.delete({where: {id: canvasId}});
    }
};
import { error, fail, redirect } from '@sveltejs/kit';
import { _sessions } from '../+page.server';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib';

export const load = (async ({params, cookies}) => {
    let session = params.session;
    let username = cookies.get('username');
    let prisma_session = await prisma.session.findFirst({where: {name: session}});

    if(!prisma_session){
        throw redirect(301, '/');
    }
    let messages = await prisma.message.findMany({
        where: {sessionId: prisma_session.id}
    });
    let user = await prisma.user.findUnique({
        where: {name:username}
    });

    if(typeof username === 'undefined'){
        throw redirect(303, '/');
    }

    return {session, messages, prisma_session, user};
}) satisfies PageServerLoad;

export const actions: Actions = {
    message: async({request, params, cookies})=>{
        let session = params.session;
        let username = cookies.get('username');
        let prisma_session = await prisma.session.findFirst({where: {name: session}});
        let author = await prisma.user.findUnique({where: {name: username}})

        if(!prisma_session){
            throw error(404, 'Session "${session}" not found')
        }

        if(!author){
            throw redirect(307, '/guest')
        }

        let data = await request.formData();
        let message = data.get('message')?.toString();

        if(!message){
            return fail(400, {message: 'Message cannot be empty'});
        }
        else{
            await prisma.message.create({
                data:{
                    message: message, sessionId : prisma_session?.id, userName : author.name
                }
            })
        }
    }
};
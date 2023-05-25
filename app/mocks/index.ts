
export async function setupMock(){

    if(typeof window !== 'undefined'){
        const {worker} = await import('./api/browser')
        worker.start({onUnhandledRequest: 'bypass' });
    } else {
        const { server} = await import('./api/server')
        server.listen({onUnhandledRequest: 'bypass' })
    }
}


// export const setupMock = async () => {
//     if (typeof window === 'undefined') { 
//         const { server } = await import('./api/server') 
//         server.listen({onUnhandledRequest: 'bypass' }) } 
//     else { 
//         const { worker } = await import('./api/browser') 
//         worker.start({ onUnhandledRequest: 'bypass' }) 
//     } 
// }

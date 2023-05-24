const IS_BROWSER = typeof window !== 'undefined'

export const setupMock = async () => {

    if(IS_BROWSER){
        const {worker} = await import('./api/browser')
        worker.start();
    } else {
        const { server} = await import('./api/server')
        server.listen()
    }
}
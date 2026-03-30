import { shutdown, start } from 'live-server'

export function startDevServer(): void {
    shutdown()

    start({
        host: 'localhost',
        port: 5500,
        open: false,
        logLevel: 0,
        middleware: [
            (_, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                next()
            }
        ]
    })
    console.log('Đã bắt đầu dev server.')
}

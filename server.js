import http from "http";
import dotenv from "dotenv";

dotenv.config();
const host = process.env.HOST||'localhost';
const port = process.env.PORT||'4000';

http
.createServer()
.on('request',(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain')

    //routing
    var url = req.url
    const startTime = process.hrtime.bigint();
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/command',
        headers: {
            'User-Agent': `NodeRuntim/${process.version}`
        }
    };
    switch (url) {
        case '/command':
        case '/command-async':
        case '/command-async-annotation':
            options.path = url
            http.get(options, api_res => {
                console.log(`${url} ${api_res.statusCode} ${calculateResponseTimeInMs(startTime)} ms`);
                // console.log(res);
                // res.end(`${url} called`);
            });
            // console.log(res);
            res.end(`${url} called`);
            break;
        default:
            res.end('Hello World');
    }
})
.listen(port, host, () => {
    console.log(`Server running on host: ${host} port : ${port}`);
})



function calculateResponseTimeInMs(startTime) {
    return BigInt(process.hrtime.bigint() - startTime) / BigInt(1e6);
}

function callAPI() {
    
}
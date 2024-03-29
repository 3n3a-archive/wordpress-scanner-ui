export async function onRequestPost({ params, env }) {
    let result;
    try {

        if (!params.url) {
            return new Response(JSON.stringify({error: "Please enter a url"}))
        }

        let input_url = new URL(atob(params.url))
        let request = new Request('https://wordpress-scanner.fly.dev/scan', {
            method: 'POST',
            headers: {
                'x-api-key': env.API_KEY
            },
            body: JSON.stringify({
                url:input_url.toString()
            })
        })
        request.headers.set('Content-Type', 'application/json')
        request.headers.set('Origin', input_url.origin)
        const res = await fetch(request);
        const data = await res.text();
        result = new Response(data)
        result.headers.set('Content-Type', 'application/json')
        result.headers.set('Cache-Control', 'max-age=604800')
    } catch (e) {
        result = new Response(JSON.stringify({
            line: "main", 
            message: e.message, 
            stack: e.hasOwnProperty("stack") ? e.stack : "", 
        }, null, 2), { 
            status: 500 
        });
    }
    return result;
}

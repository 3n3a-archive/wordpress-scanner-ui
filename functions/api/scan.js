export async function onRequestPost({ request }) {

    const body = await request.json();

    let result;
    try {

        if (!body.hasOwnProperty('url')) {
            return new Response(JSON.stringify({error: "Please enter a url"}))
        }

        const res = await fetch('https://wpscan-api.enea.tech/scan', {body: {url:body.url}});
        const data = await res.json();
        result = new Response(JSON.stringify(data))
    } catch (e) {
        result = new Response(JSON.stringify({line: "main", message: e.message, stack: e.hasOwnProperty("stack") ? e.stack : "", }, null, 2), { status: 500 });
    }
    return result;
}
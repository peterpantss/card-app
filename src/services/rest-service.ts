export async function GET(url: string) {
    const headers = {
        // 'Access-Control-Allow-Origin': '*'
    }
    return await fetch(url, {
        method: "GET",
        headers: headers
    })
    .then(res => res.json())
    .then((res => {
        console.log(res);
        return res;
    }))
}
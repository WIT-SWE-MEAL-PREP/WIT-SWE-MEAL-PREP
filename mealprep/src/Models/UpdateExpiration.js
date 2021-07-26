export default async function updateExpiration(url, jsonBody) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(jsonBody),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
        })
        .then(data => data.json())
}
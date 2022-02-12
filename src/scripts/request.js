const END_POINT = 'https://api.github.com';

async function request({ method = 'GET', path }) {
    const url = `${END_POINT}${path}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try{
        const response = await fetch(url, options);
        const result = await response.json();

        if(response.ok) {
            return result;
        }
        else {
            result.status = response.status;
            return result;
        }
    }
    catch{
        throw new Error('Invalid API');
    }
}

export default request;
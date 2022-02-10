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

        if(response.ok) {
            const res = await response.json();
            return res;
        }
        else {
            const error = await response.json();
            error.status = response.status;
            return error;
        }
    }
    catch{
        throw new Error('Invalid API');
    }
}

export default request;
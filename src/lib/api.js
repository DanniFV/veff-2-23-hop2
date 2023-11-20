const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/';

export async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(undefined), ms);
    });
}


// Fallið sem sér um url fyrir forsíðuna
export async function searchProducts(query, limit = 10) {
    const url = new URL('products', API_URL);
    console.log(url);
    url.searchParams.set('items', query);
    url.searchParams.set('limit', limit);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(
                'Villa við að sækja gögn, ekki 200 staða',
                response.status,
                response.statusText
            );
            return null;
        }

        const json = await response.json();
        console.log('API Resonse: ', json);

        return json.items;
    } catch (error) {
        console.error('Villa við að vinna úr JSON: ', error);
        return null;
    }
}

// Fallið sem sér um að búa til url fyrir sérstaka síðu

export async function getVoru(id) {
    const url = new URL(`products/${id}`, API_URL);
    console.log(url);
    let response;
    try {
        response = await fetch(url);
    } catch (e) {
        console.error('Villa kom upp við að sækja gögn');
        return null;
    }

    if (!response.ok) {
        console.error(
            'Villa við að sækja gögn, ekki 200 staða',
            response.status,
            response.statusText
        );
        return null;
    }

    let json;
    try {
        json = await response.json();
    } catch (e) {
        console.error('Villa við að vinna úr JSON');
        return null;
    }

    return json;
}


// Fallið sem sér um að sækja flokka síðuna
export async function fetchCategories() {
    const url = `${API_URL}categories`;
    console.log(url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Failed to fetch categories. Status: ${response.status}`);
            return null;
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}
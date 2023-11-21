const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/';

export async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(undefined), ms);
    });
}

async function fetchDataFromAPI(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Error fetching data:', response.status, response.statusText);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error processing JSON:', error);
        return null;
    }
}
// Fallið sem sér um url fyrir forsíðuna
export async function searchProducts(query, limit = 10) {
    const url = new URL('products', API_URL);
    url.searchParams.set('items', query);
    url.searchParams.set('limit', limit);

    console.log(url);

    const json = await fetchDataFromAPI(url);
    return json ? json.items : null;
}
// Fallið sem sér um að búa til url fyrir sérstaka síðu
export async function getVoru(id) {
    const url = new URL(`products/${id}`, API_URL);
    console.log(url);

    const json = await fetchDataFromAPI(url);
    return json;
}
// Fallið sem sér um að sækja flokka fyrir forsíðuna
export async function fetchCategories(query, limit = 12) {
    const url = new URL('categories', API_URL);
    url.searchParams.set('items', query);
    url.searchParams.set('limit', limit);

    console.log(url);

    const json = await fetchDataFromAPI(url);
    return json ? json.items : null;
}

// Fallið sem sér um að sækja url fyrir products/category síðuna
export async function categorySite(query, limit = 13, id) {
    const url = new URL('products', API_URL);
    url.searchParams.set('category', id);
    url.searchParams.set('items', query);
    url.searchParams.set('limit', limit);

    console.log(url);

    const json = await fetchDataFromAPI(url);
    return json ? json.items : null;
}

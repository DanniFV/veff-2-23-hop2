//Grunnslóð á API
const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/';

//Leita í API eftir id
export async function searchProducts(query) {
    const url = new URL('products', API_URL);
    url.searchParams.set('items', query);
    url.searchParams.set('limit', '6');

    let response;
    try {
        response = await fetch(url);
    } catch (e) {
        console.error('Villa við að sækja gögn', e);
        return null;
    }

    if (!response.ok) {
        console.error('Fékk ekki 200 status frá API', response);
        return null;
    }

    let data;

    try {
        data = await response.json();
    } catch (e) {
        console.error('Villa við að lesa gögn', e);
        return null;
    }

    const results = data?.items ?? [];
    console.log(results);
    return results;
}
//Kristín að fikta
export async function getVoru(id) {
    const url = new URL(`products/${id}`, API_URL);

    let response;
    try {
        response = await fetch(url);
    } catch (e) {
        console.error('Villa við að sækja gögn um vöru', e);
        return null;
    }

    if (!response.ok) {
        console.error('Fékk ekki 200 status frá API fyrir voru', response);
        return null;
    }

    let data;

    try {
        data = await response.json();
    } catch (e) {
        console.error('Villa við að lesa gögn um vöru', e);
        return null;
    }

    return data;
}

const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/';


export async function searchProducts(query) {
    const url = new URL('products', API_URL);
    url.searchParams.set('items', query);
    url.searchParams.set('limit', '6');

    // await sleep(1000);

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

    // Smá varkárni: gerum ekki ráð fyrir að API skili alltaf
    // réttum gögnum, en `json()` skilar alltaf *öllu* með `any`
    // týpunni sem er of víðtæk til að vera gagnleg.
    // (en hvað ef gögnin eru ekki eins og týpan??)
    /** @type {LaunchSearchResults | null} */
    let data;

    try {
        data = await response.json();
    } catch (e) {
        console.error('Villa við að lesa gögn', e);
        return null;
    }

    console.log(data);


    /** @type {Launch[]} */
    const results = data?.items ?? [];
    console.log(results);

    return results;
}
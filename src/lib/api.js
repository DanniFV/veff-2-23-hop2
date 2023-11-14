// import { name } from '../browser-sync';
/**
 * API föll.
 * @see https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/
 */

export async function searchProducts(query) {
    const url = new URL('products', API_URL);
    url.searchParams.set('items', query);

    //await sleep(1000);

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

    /** @type {Launch[]} */
    const results = data?.results ?? [];

    return results;
}
///**
// * Hérna er kóðinn fyrir stakt geimskot
// * Skilar stöku geimskoti eftir auðkenni eða `null` ef ekkert fannst.
// * @param {string} id Auðkenni geimskots.
// * @returns {Promise<LaunchDetail | null>} Geimskot.
// */
//export async function getLaunch(id) {
//    const url = new URL(`launch/${id}`, API_URL);

//    let response;
//    try {
//        response = await fetch(url);
//    } catch (e) {
//        console.error('Villa við að sækja gögn um geimskot', e);
//        return null;
//    }

//    if (!response.ok) {
//        console.error('Fékk ekki 200 status frá API fyrir geimskot', response);
//        return null;
//    }

//    /** @type {LaunchDetail | null} */
//    let data;

//    try {
//        data = await response.json();
//    } catch (e) {
//        console.error('Villa við að lesa gögn um geimskot', e);
//        return null;
//    }

//    return data;
//}
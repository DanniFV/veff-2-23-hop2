import { empty } from './lib/elements.js';
import {
    renderDetails, renderFrontpage,
    renderCategory, renderCategories, renderAllProducts
} from './lib/ui.js';


/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 * Ef `id` er gefið er stakt geimskot birt, annars er forsíða birt með
 * leitarniðurstöðum ef `query` er gefið.
 */
function route() {
    const { search } = window.location;
    const qs = new URLSearchParams(search);

    const id = qs.get('id');
    const category = qs.get('category');
    const products = qs.get('products');
    const categories = qs.get('categories');
    const parentElement = document.body;
    empty(parentElement);

    if (category) {
        renderCategory(parentElement, category);
    } else if (id) {
        renderDetails(parentElement, id);
    } else if (products) {
        renderAllProducts(parentElement, id);
    } else if (categories) {
        renderCategories(parentElement, id);
    } else {
        renderFrontpage(parentElement);
    }
}

// Bregst við því þegar við notum vafra til að fara til baka eða áfram.
window.onpopstate = () => {
    empty(document.body);
    route();
};

// Athugum í byrjun hvað eigi að birta.
route();

import { empty } from './lib/elements.js';
import {
    renderDetails, renderFrontpage, searchAndRender,
    renderCategory, renderCategories, renderCategoryBoxes, renderAllProducts
} from './lib/ui.js';

/**
 * Fall sem keyrir við leit.
 * @param {SubmitEvent} e
 * @returns {Promise<void>}
 */
async function onSearch(e) {
    e.preventDefault();

    if (!e.target || !(e.target instanceof Element)) {
        return;
    }

    const { value } = e.target.querySelector('input') ?? {};

    if (!value) {
        return;
    }
    console.log(value);

    await searchAndRender(document.body, e.target, value);
    window.history.pushState({}, '', `/?query=${value}`);
}

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 * Ef `id` er gefið er stakt geimskot birt, annars er forsíða birt með
 * leitarniðurstöðum ef `query` er gefið.
 */
function route() {
    const { search } = window.location;
    const qs = new URLSearchParams(search);

    const query = qs.get('query') ?? undefined;
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

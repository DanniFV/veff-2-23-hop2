import { empty } from './lib/elements.js';
import { renderFrontpage } from './lib/ui.js';

/**
* Athugar hvaða síðu við erum á út frá query - string og birtir.
* Ef`id` er gefið þá er það birt, annars er forsíða birt með
* leitarniðurstöðum ef `query` er gefið.
*/
function route() {
    const { search } = window.location;

    const qs = new URLSearchParams(search);

    const query = qs.get('query') ?? undefined;
    const id = qs.get('id');

    const parentElement = document.body;

    if (id) {
        renderDetails(parentElement, id);
    } else {
        renderFrontpage(parentElement, query);
    }
}
// Bregst við því þegar við notum vafra til að fara til baka eða áfram.
window.onpopstate = () => {
    /* TODO bregðast við */
    empty(document.body);

    route();
};

// Athugum í byrjun hvað eigi að birta.
route();

import { empty } from './lib/elements.js';
import { renderFrontpage } from './lib/ui.js';

async function onSearch(e) {
    e.preventDefault();

    if (!e.target || !(e.target instanceof Element)) {
        return;
    }

    const { value } = e.target.querySelector('input') ?? {};

    if (!value) {
        return;
    }

    // This is an await, searchAndRender is waiting for it to finish displaying the result
    // from this search. When it's done, it changes our URL and sets the query as the value,
    // so now we have connected these together and are letting our entire program
    // respond at specific points in different contexts.

    await searchAndRender(document.body, e.target, value);
    window.history.pushState({}, '', `/?query=${value}`);
}

/**
 * Checks which page we are on based on the query string and displays it.
 * If `id` is given, it is displayed, otherwise, the front page is displayed
 * with search results if `query` is given.
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
        renderFrontpage(parentElement, onSearch, query);
    }
}

// Responds when using the browser to go back or forward.
window.onpopstate = () => {
    /* TODO: Respond */
    empty(document.body);

    route();
};

// Check initially what should be displayed.
route();

import { getVoru, searchProducts } from './api.js';
import { el } from './elements.js';

// Render the search form used on category pages
export function renderSearchForm(searchHandler, query = '') {
    const search = el('input', {
        type: 'search',
        placeholder: 'Leitarorð',
        value: query,
    });
    const button = el('button', {}, 'Leita');

    const container = el('form', { class: 'search' }, search, button);
    container.addEventListener('submit', searchHandler);
    return container;
}

// Set loading state
function setLoading(parentElement, searchForm = undefined) {
    let loadingElement = parentElement.querySelector('.loading');

    if (!loadingElement) {
        loadingElement = el('div', { class: 'loading' }, 'Sæki gögn...');
        parentElement.appendChild(loadingElement);
    }

    if (!searchForm) {
        return;
    }

    const button = searchForm.querySelector('button');

    if (button) {
        button.setAttribute('disabled', 'disabled');
    }
}

// Set not loading state
function setNotLoading(parentElement, searchForm = undefined) {
    const loadingElement = parentElement.querySelector('.loading');

    if (loadingElement) {
        loadingElement.remove();
    }

    if (!searchForm) {
        return;
    }

    const disabledButton = searchForm.querySelector('button[disabled]');

    if (disabledButton) {
        disabledButton.removeAttribute('disabled');
    }
}

// Render frontpage content
export async function renderFrontpage(parentElement, query = '') {
    const List = el('section', { class: 'kassar' });
    const searchResults = await searchProducts(query, 6);

    // Render new products section
    const nyjarvorur = el('h1', { class: 'nyjarvorur_title' }, 'Nýjar vörur');
    parentElement.appendChild(nyjarvorur);

    for (const hlutur of searchResults) {
        const resultEl = el(
            'div',
            { class: 'kassi' },
            el('img', { class: 'result__image', src: hlutur.image, alt: hlutur.title }),
            el('div', { class: 'result__textar' },
                el('p', { class: 'result__title' }, ` ${hlutur.title}`),
                el('p', { class: 'result__category' }, ` ${hlutur.category_title}`),
                el('p', { class: 'result__price' }, ` ${hlutur.price} kr.-`),
            )
        );
        List.appendChild(resultEl);
    }

    parentElement.appendChild(List);

    // Render category section
    const heading = el('h2', { class: 'skoda_voruflokka' }, 'Skoðaðu vöruflokkana okkar');
    const takki = el('p', { class: 'takki_forsida' }, el('a', { href: '/' }, 'Skoða alla flokkana'));
    takki.addEventListener('click', getVoru);
    // Ég skil ekki hvað ég þarf að gera hér til að fá þennan takka til að virka....

    parentElement.appendChild(heading);
    parentElement.appendChild(takki);

    const categoryBoxes = renderCategoryBoxes();
    const container = el('main', {}, nyjarvorur, List, takki, heading, categoryBoxes);
    parentElement.appendChild(container);
}

// Render category content page
export async function renderCategory(parentElement, query = '') {
    const heading = el('h2', { class: 'skoda_voruflokka' }, 'Skoðaðu vöruflokkana okkar');
    const categoryBoxes = renderCategoryBoxes();

    const container = el('main', {}, heading, categoryBoxes);
    parentElement.appendChild(container);
}

// Render category page 2 content
export async function renderCategoryPage2(parentElement, query = '') {
    const heading = el('h2', { class: 'Titill_voruflokk' }, ` ${hlutur.category_title}`);
    const leitasida2 = renderSearchForm();
    const List = el('section', { class: 'kassar' });
    const searchResults = await searchProducts(query, 6);
    for (const hlutur of searchResults) {
        const resultEl = el(
            'div',
            { class: 'kassi' },
            el('img', { class: 'result__image', src: hlutur.image, alt: hlutur.title }),
            el('div', { class: 'result__textar' },
                el('p', { class: 'result__title' }, ` ${hlutur.title}`),
                el('p', { class: 'result__category' }, ` ${hlutur.category_title}`),
                el('p', { class: 'result__price' }, ` ${hlutur.price} kr.-`),
            )
        );
        List.appendChild(resultEl);
    }

    const categoryBoxes = renderCategoryBoxes();
    const container = el('main', {}, heading, leitasida2, categoryBoxes, List);
    parentElement.appendChild(container);
}

// Helper function to render category boxes
function renderCategoryBoxes() {
    return el(
        'section',
        { class: 'boxes' },
        el('div', { class: 'box' }, el('a', { href: '?category=' + category.id }, category.title)),


        el('div', { class: 'box' }, el('a', { href: '#' }, 'Shoes')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Garden')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Computers')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Movies')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Books')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Jewelry')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Electronics')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Grocery')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Outdoors')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Sports')),
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Tools'))
    );
}


// renderDetails á að búa til síðu fyrir sérstaka vöru


export async function renderDetails(parentElement, id) {
    const container = el('main', {});
    parentElement.appendChild(container);

    setLoading(container);
    const result = await getVoru(id);
    setNotLoading(container);

    // Check for error in fetching data
    if (!result) {
        container.appendChild(el('p', {}, 'Villa við að sækja gögn um geimskot!'));
        return;
    }

    const hlutur = result; // Assuming result is the data structure you want to work with

    // Render main details
    const voruElement = el(
        'article',
        { class: 'vara' },
        el(
            'section',
            { class: 'info' },
            el('h1', {}, hlutur.title),
            el(
                'div',
                { class: 'info' },
                el('h2', {}, `${hlutur.title}`),
                el('p', {}, `Flokkur: ${hlutur.category_title}`),
                el('p', {}, hlutur.status.description),
            ),
        ),
        el('div', { class: 'image' }, el('img', { src: hlutur.image, alt: hlutur.title })),
    );

    // Render related products
    const meiraVorur = el('h2', {}, `Meira úr ${hlutur.title}`);
    const List = el('section', { class: 'kassar' });
    const searchResults = await searchProducts(query, 6);

    for (const hlutur of searchResults) {
        const resultEl = el(
            'div',
            { class: 'kassi' },
            el('img', { class: 'result__image', src: hlutur.image, alt: hlutur.title }),
            el('div', { class: 'result__textar' },
                el('p', { class: 'result__title' }, ` ${hlutur.title}`),
                el('p', { class: 'result__category' }, ` ${hlutur.category_title}`),
                el('p', { class: 'result__price' }, ` ${hlutur.price} kr.-`),
            )
        );
        List.appendChild(resultEl);
    }

    container.appendChild(meiraVorur, voruElement, List);
}
import { fetchCategories, getVoru, searchProducts, fetchCategorySite } from './api.js';
import { el } from './elements.js';

// Render the search form used on category pages
export function renderSearchForm(searchHandler, query = '') {
    const search = el('input', {
        // type: 'search'
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

export async function searchAndRender(parentElement, searchForm, query) {
    const mainElement = parentElement.querySelector('main');

    if (!mainElement) {
        console.warn('fann ekki <main> element');
        return;
    }

    // Remove previous results
    const resultsElement = mainElement.querySelector('.results');
    if (resultsElement) {
        resultsElement.remove();
    }

    setLoading(mainElement, searchForm);
    try {
        console.log(query);
        const results = await searchProducts(query);

        console.log('Search Results: ', results);
        setNotLoading(mainElement, searchForm);

        if (!results) {
            console.error('Error fetching search results: Results are undefined.');
            return null;
        }

        return results;
    } catch (error) {
        console.error('Error fetching search results: ', error);
        setNotLoading(mainElement, searchForm);
        return null;
    }
}
// Render kassi div
export async function renderKassiDiv(hlutur) {
    return el(
        'div',
        { class: 'kassi' },
        el(
            'a',
            { href: `products/${hlutur.id}` },
            el('img', { class: 'result__image', src: hlutur.image, alt: hlutur.title }),
        ),
        el('div', { class: 'result__textar' },
            el('p', { class: 'result__title' }, ` ${hlutur.title}`),
            el('p', { class: 'result__price' }, ` ${hlutur.price} kr.-`),
            el('p', { class: 'result__category' }, ` ${hlutur.category_title}`),
        )
    );
}

// Render navigation bar
export async function renderNavigation() {
    return el(
        'header',
        { class: 'header' },
        el(
            'nav',
            { class: 'navigation' },
            el(
                'ul',
                { class: 'index-title' },
                el(
                    'li',
                    {},
                    el(
                        'a',
                        { href: '#', class: 'title-link' },
                        el(
                            'strong',
                            { class: 'title' },
                            'Vefforitunarbúðin'
                        )
                    )
                )
            ),
            el(
                'div',
                { class: 'nav-right-index' },
                el(
                    'ul',
                    { class: 'nav-top-right-index' },
                    el('li', {}, el('a', { href: '/' }, 'Nýskrá')),
                    el('li', {}, el('a', { href: '/' }, 'Inniskrá')),
                    el('li', {}, el('a', { href: '/' }, 'Karfa'))
                ),
                el(
                    'ul',
                    { class: 'nav-bottom-right-index' },
                    el('li', {}, el('a', { href: '/' }, 'Nýjar vörur')),
                    el('li', {}, el('a', { href: '/' }, 'Flokkar'))
                )
            )
        )
    );
}
// Helper function to render category boxes
export async function renderCategoryBoxes() {
    const categoryResponse = await fetchCategories();
    console.log(categoryResponse);
    const categoryContainer = el('section', { class: 'boxes' });

    for (const items of categoryResponse) {
        categoryContainer.appendChild(
            el(
                'div',
                { class: 'box' },
                el('a', { href: `?category=${items.id}` }, items.title)
            )
        );
    }

    return categoryContainer;
}

// Render frontpage content
export async function renderFrontpage(parentElement, query = '') {
    console.log('Rendering front page with query:', query);
    const List = el('section', { class: 'kassar' });
    const searchResults = await searchProducts(query, 6);

    // Render new products section
    const nyjarvorur = el('h1', { class: 'nyjarvorur_title' }, 'Nýjar vörur');
    parentElement.appendChild(nyjarvorur);

    // Hérna er kóðinn fyrir div kassi
    for (const hlutur of searchResults) {
        const resultEl = await renderKassiDiv(hlutur);
        List.appendChild(resultEl);
    }

    parentElement.appendChild(List);
    try {
        const navigation = await renderNavigation();
        parentElement.appendChild(navigation);
    } catch (error) {
        console.error(error);
    }

    // Render category section
    const heading = el('h2', { class: 'skoda_voruflokka' }, 'Skoðaðu vöruflokkana okkar');
    const takki = el('p', { class: 'takki_forsida' }, el('a', { href: '/' }, 'Skoða alla flokkana'));
    takki.addEventListener('click', getVoru);
    parentElement.appendChild(heading);
    parentElement.appendChild(takki);
    const categoryBoxes = await renderCategoryBoxes(); // Note the 'await' here
    const container = el('main', {}, nyjarvorur, List, takki, heading, categoryBoxes);
    parentElement.appendChild(container);
}

// Render category content page síðan sem sér um flokkana
export async function renderCategorypage(parentElement, query = '') {
    const heading = el('h2', { class: 'skoda_voruflokka' }, 'Skoðaðu vöruflokkana okkar');
    const categoryBoxes = await renderCategoryBoxes(); // Note the 'await' here

    const container = el('main', {}, heading, categoryBoxes);
    parentElement.appendChild(container);
}


// Render síðu 2 fyrir ákveðið product
export async function renderCategory(parentElement, id, query = '',) {
    const container = el('main', {});
    //    const fetchCategoryTitle = await fetchCategorySite(id);
    //    var selectedCategory = [];

    //    for (const box of fetchCategoryTitle) {
    //        if (box.id == id) {
    //            selectedCategory = box;
    //        }
    //    }
    const categoryResponse = await fetchCategories();
    const category = categoryResponse.items.find(
        (c) => c.id === Number.parseInt(categoryId)
    );

    if (!category) {
        console.error('Flokkur fannst ekki');
        return;
    }

    // Render nav
    try {
        const navigation = await renderNavigation();
        parentElement.appendChild(navigation);
    } catch (error) {
        console.error(error);
    }

    console.log(id);
    const categorySiteData = await fetchCategorySite(id);
    console.log(categorySiteData[0].category_title)

    const nafn = el('h2', {}, categorySiteData[id].category_title);
    const searchContainer = el(
        'form',
        {},
        'Leita: ',
        el('input', { value: query ?? '', name: 'query' }),
        el('button', {}, 'Leita')
    );


    const List = el('section', { class: 'kassar' });
    const searchResults2 = await fetchCategorySite(id);

    // Hérna er kóðinn fyrir div kassi
    for (const hlutur of searchResults2) {
        const resultEl = await renderKassiDiv(hlutur);
        List.appendChild(resultEl);
    }

    const backButton = el(
        'div',
        { class: 'back' },
        el('a', { href: '/' }, 'Til baka')
    );
    parentElement.appendChild(nafn);
    parentElement.appendChild(searchContainer);
    parentElement.appendChild(List);
    parentElement.appendChild(backButton);
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
    const searchResults = await searchProducts(hlutur.title, 6);

    // Hérna er kóðinn fyrir div kassi
    for (const hlutur of searchResults) {
        const resultEl = await renderKassiDiv(hlutur);
        List.appendChild(resultEl);
    }


    container.appendChild(meiraVorur, voruElement, List);
}


import { fetchCategories, getVoru, searchProducts, fetchCategorySite, allCategories } from './api.js';
import { el } from './elements.js';

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
        const results = await searchProducts(query);
        setNotLoading(mainElement, searchForm);

        if (!results) {
            return console.error('Error fetching search results: Results are undefined.');
        }

        return results;
    } catch (error) {
        console.error('Error fetching search results: ', error);
        setNotLoading(mainElement, searchForm);
        return;
    }
}
// Render kassi div
function renderKassiDiv(hlutur) {
    return el(
        'div',
        { class: 'kassi' },
        el(
            'a',
            { href: `?id=${hlutur.id}` },
            el('img', { class: 'result__image', src: hlutur.image, alt: hlutur.title }),
        ),
        el('div', { class: 'result__textar' },
            el('div', { class: 'result__info' },
                el('h4', { class: 'result__title' }, ` ${hlutur.title}`),
                el('p', { class: 'result__category' }, ` ${hlutur.category_title}`)
            ),
            el('p', { class: 'result__price' }, ` ${hlutur.price} kr.-`))
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
                        { href: '/', class: 'title-link' },
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
                    el('li', {}, el('a', { href: '?categories=categories' }, 'Flokkar'))
                )
            )
        )
    );
}
// Helper function to render category boxes
export async function renderCategoryBoxes() {
    const categoryResponse = await fetchCategories();
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
    const List = el('section', { class: 'kassar' });
    const searchResults = await searchProducts(query, 6);

    // Render new products section
    const nyjarvorur = el('h1', { class: 'nyjarvorur_title' }, 'Nýjar vörur');
    parentElement.appendChild(nyjarvorur);

    // Hérna er kóðinn fyrir div kassi
    for (const hlutur of searchResults) {
        const resultEl = renderKassiDiv(hlutur);
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
    const takki = el('p', { class: 'takki_forsida' },
        el('a', { href: '?categories=categories' }, 'Skoða alla flokkana'));
    parentElement.appendChild(heading);
    parentElement.appendChild(takki);
    const categoryBoxes = await renderCategoryBoxes(); // Note the 'await' here
    const container = el('main', {}, nyjarvorur, List, takki, heading, categoryBoxes);
    parentElement.appendChild(container);
}

// Render category content page síðan sem sér um flokkana
export async function renderCategorypage(parentElement) {
    const heading = el('h2', { class: 'skoda_voruflokka' }, 'Skoðaðu vöruflokkana okkar');
    const categoryBoxes = await renderCategoryBoxes(); // Note the 'await' here

    const container = el('main', {}, heading, categoryBoxes);
    parentElement.appendChild(container);
}
// Render síðu 1 fyrir þegar að "flokkar" er ýtt á þá fer það hingað og renderar sá síðu
export async function renderCategoryCatelog(parentElement) {
    const heading = el('h2', { class: 'skoda_voruflokka' }, 'Skoðaðu vöruflokkana okkar');
    const categoryBoxes = await renderCategoryBoxes(); // Note the 'await' here

    const container = el('main', {}, heading, categoryBoxes);
    parentElement.appendChild(container);
}

// Render síðu 2 fyrir ákveðið product
export async function renderCategory(parentElement, id, query = '') {
    // Render nav
    try {
        const navigation = await renderNavigation();
        parentElement.appendChild(navigation);
    } catch (error) {
        console.error(error);
    }
    const fetchCategoryTitle = await fetchCategorySite(id);
    let selectedCategory = [];

    for (const box of fetchCategoryTitle) {
        if (box.id === id) {
            selectedCategory = box;
        }
    }

    // const nafn = el('h2', {}, categorySiteData[id].category_title);

    const searchContainer = el(
        'form',
        { class: 'leita' },
        'Leita: ',
        el('input', { value: query ?? '', name: 'query', placeholder: 'Skrifaðu vöru...' }),
        el('button', { class: 'leitatakki' }, 'Leita')

    );


    const List = el('section', { class: 'kassar' });
    const searchResults2 = await fetchCategorySite(id);

    // Hérna er kóðinn fyrir div kassi
    for (const hlutur of searchResults2) {
        const resultEl = renderKassiDiv(hlutur);
        List.appendChild(resultEl);
    }
    // Hérna er ég að reyna að láta titil fyrir leita/catergory síðuna virka -Sigrún ef hún spyr
    const nafnASerCategory = el('h2', { class: 'nafnASerFlokk' }, `${searchResults2[0].category_title}`)
    const container = el('main', {}, nafnASerCategory, searchContainer, List);
    parentElement.appendChild(container)
}

// renderDetails á að búa til síðu fyrir sérstaka vöru
export async function renderDetails(parentElement, id, query) {
    const container = el('main', {});

    setLoading(container);
    const hlutur = await getVoru(id);
    setNotLoading(container);
    try {
        const navigation = await renderNavigation();
        parentElement.appendChild(navigation);
    } catch (error) {
        console.error(error);
    }

    // Check for error in fetching data
    if (!hlutur) {
        container.appendChild(el('p', {}, 'Villa við að sækja gögn um vöru!'));
        return;
    }

    const voruElement = el(
        'div',
        { class: 'vara' },
        el(
            'section',
            { class: 'info' },
            el('h2', { class: 'title_voru' }, `${hlutur.title}`),
            el('p', { class: 'verd_voru' }, `Verð: ${hlutur.price} kr,-`),
            el('p', { class: 'flokkur_title' }, `Flokkur: ${hlutur.category_title}`),
            el('p', { class: 'description' }, hlutur.description)
        ),
        el('div', { class: 'result__image' }, el('img', { src: hlutur.image, alt: hlutur.title }))
    )
    parentElement.appendChild(voruElement);
    // Render related products -Sigrún ef að hún spyr
    const meiraVorur = el('h1', { class: 'meira_ur' }, `Meira úr ${hlutur.category_title}`);
    parentElement.appendChild(meiraVorur)
    const meiraVorurhlutir = await fetchCategorySite(`${hlutur.category_id}`, 3);
    const List = el('section', { class: 'kassar' });
    // Hérna er kóðinn fyrir div kassi
    for (const hlutur of meiraVorurhlutir) {
        const resultEl = renderKassiDiv(hlutur);
        List.appendChild(resultEl);
    }
    parentElement.appendChild(List)
}


// Vantar að gera Vörulisti
// Fyrir neðan vörur í vörulista skal vera hlekkur sem fer á forsíðu.
// Ha? Fyrir neðan vörur skal vera hlekkur sem fer á vörulista með öllum vörum.


//Síða fyrir öll gategories(kemur þegar er ýtt á Flokka)
export async function renderCategories(parentElement, id) {
    try {
        const navigation = await renderNavigation();
        parentElement.appendChild(navigation);
    } catch (error) {
        console.error(error);
    }

    let listi = el('section', { class: 'listi2' })
    const boxes = await allCategories();

    for (const hlutur of boxes) {
        const category = el(
            'div',
            { class: "kassar" },
            el('p', { class: 'kassi' }, el('a', { href: `?category=${hlutur.id}` }, `${hlutur.title}`))
        );
        listi.appendChild(category)
    }

    parentElement.appendChild(listi)
}

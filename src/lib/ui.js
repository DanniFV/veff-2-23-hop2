import { getVoru, searchProducts } from './api.js';
import { el } from './elements.js';

//Leitarformið sem á að nota á category síðunum
export function renderSearchForm(searchHandler, query = undefined) {
    const search = el('input', {
        type: 'search',
        placeholder: 'Leitarorð',
        value: query ?? '',
    });
    const button = el('button', {}, 'Leita');

    const container = el('form', { class: 'search' }, search, button);
    container.addEventListener('submit', searchHandler);
    return container;
}

//Loading
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
//Not loading
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

// Allt sem að tengist forsíðunni

export async function renderFrontpage(
    parentElement,
    query = undefined,
) {
    let List = el('section', { class: 'kassar' })
    const searchResults = await searchProducts(query, 6)

    const nyjarvorur = el('h1', { class: "nyjarvorur_title" }, 'Nýjar vörur');
    const heading = el('h2', { class: "skoda_voruflokka" }, 'Skoðaðu vöruflokkana okkar');
    const takki = el('p', { class: "takki_forsida" }, el('a', { href: '%' }, 'Skoða alla flokkana'));
    takki.addEventListener('click', function () {
    });
    parentElement.appendChild(nyjarvorur);

    for (const hlutur of searchResults) {
        console.log(hlutur.price)
        const resultEl = el(
            'div',
            { class: 'kassi' },
            el('img', { class: 'result__image', src: hlutur.image, alt: hlutur.title }),
            el('p', { class: 'result__title' }, ` ${hlutur.title}`),
            el('p', { class: 'result__category' }, ` ${hlutur.category_title}`),
            el('p', { class: 'result__price' }, ` ${hlutur.price} kr.-`),
        );
        List.appendChild(resultEl);
        console.log(resultEl);
        parentElement.appendChild(List);
    }

    parentElement.appendChild(heading);
    parentElement.appendChild(takki);

    const categoryBoxes = el(
        'section',
        { class: 'boxes' },
        el('div', { class: 'box' }, el('a', { href: '#' }, 'Clothing')),
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

    const container = el('main', {}, nyjarvorur, List, takki, heading, categoryBoxes);
    parentElement.appendChild(container);

    if (!query) {
        return;
    }
}

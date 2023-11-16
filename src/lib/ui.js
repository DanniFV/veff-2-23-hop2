import { getVoru, searchProducts } from './api.js';
import { el } from './elements.js';

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

//Allt sem að tengist forsíðunni
export async function renderFrontpage(
    parentElement,
    query = undefined,
) {
    let List = el('section', { class: 'kassar' })
    const searchResults = await searchProducts(query, 6)
    console.log(searchResults);
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
    const nyjarvorur = el('h1', { class: "nyjarvorur_title" }, 'Nýjar vörur');
    const takki = el('p', { class: "takki_forsida" }, el('a', { href: '%' }, 'Skoða alla flokkana'));
    const heading = el('h2', { class: "wassup" }, 'Skoðaðu vöruflokkana okkar')
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

    const container = el('main', {}, nyjarvorur, takki, heading, categoryBoxes);
    parentElement.appendChild(categoryBoxes);

    if (!query) {
        return;
    }

    searchAndRender(parentElement, categoryBoxes, query);
}

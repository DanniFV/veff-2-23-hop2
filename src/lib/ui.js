import { el } from './elements.js';


export function renderFrontpage(
    parentElement,
    query = undefined,
) {
    const nyjarvorur = el('h1', { class: "nyjarvorur_title" }, 'Nýjar vörur');
    const takki = el('p', { class: "takki_forsida" }, el('a', { href: '%' }, 'Skoða alla flokkana'));
    const heading = el('h2', { class: "wassup" }, 'Skoðaðu vöruflokkana okkar')
    const boxes = el(
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

    const container = el('main', {}, nyjarvorur, takki, heading, boxes);
    parentElement.appendChild(container);

    if (!query) {
        return;
    }

    searchAndRender(parentElement, boxes, query);
}

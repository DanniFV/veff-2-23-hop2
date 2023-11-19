import { getVoru, searchProducts } from './api.js';
import { el } from './elements.js';

// Search form used on category pages
export function renderSearchForm(searchHandler, query = undefined) {
    const search = el('input', {
        type: 'search',
        placeholder: 'Search term',
        value: query ?? '',
    });
    const button = el('button', {}, 'Search');

    const container = el('form', { class: 'search' }, search, button);
    container.addEventListener('submit', searchHandler);
    return container;
}

// Loading
function setLoading(parentElement, searchForm = undefined) {
    let loadingElement = parentElement.querySelector('.loading');

    if (!loadingElement) {
        loadingElement = el('div', { class: 'loading' }, 'Fetching data...');
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

// Not loading
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

// Everything related to the front page

export async function renderFrontpage(parentElement, query = undefined) {
    let productList = el('section', { class: 'products' })
    const searchResults = await searchProducts(query, 6)

    const newProductsTitle = el('h1', { class: "new-products-title" }, 'New Products');
    const heading = el('h2', { class: "explore-categories" }, 'Explore our product categories');
    const button = el('p', { class: "front-page-button" }, el('a', { href: '%' }, 'View all categories'));
    button.addEventListener('click', renderCategoryPage);
    parentElement.appendChild(newProductsTitle);

    for (const item of searchResults) {
        console.log(item.price)
        const productElement = el(
            'div',
            { class: 'product' },
            el('img', { class: 'product__image', src: item.image, alt: item.title }),
            el('p', { class: 'product__title' }, ` ${item.title}`),
            el('p', { class: 'product__category' }, ` ${item.category_title}`),
            el('p', { class: 'product__price' }, ` ${item.price} kr.-`),
        );
        productList.appendChild(productElement);
        console.log(productElement);
        parentElement.appendChild(productList);
    }

    parentElement.appendChild(heading);
    parentElement.appendChild(button);

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

    const container = el('main', {}, newProductsTitle, productList, button, heading, categoryBoxes);
    parentElement.appendChild(container);

    if (!query) {
        return;
    }
}

// Everything related to catalog pages, categories.

export async function renderCategoryPage(parentElement, query = undefined) {
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
    const container = el('main', {}, categoryBoxes);
    parentElement.appendChild(container);
}

// Create a page for each item category
// So when a category is selected, fetch items by name, e.g., for 'Tools' only show items with ` ${item.category_title}`.
// Thus, I need to implement it so that if this box is selected, then make the comments in English

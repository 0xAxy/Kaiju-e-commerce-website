const searchKey = decodeURI(location.pathname.split('/').pop());

const searchSpanElement = document.querySelector('#search-key');
searchSpanElement.innerHTML = `"${searchKey}"`;  // added double quotes around searchKey

getProducts(searchKey).then(data => {
    createProductCards(data, '.card-container');
    let productCount = Array.isArray(data) ? data.length : 0;
    document.querySelector('#product-count').innerText = productCount;
});



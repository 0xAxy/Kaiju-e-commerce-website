const setupSlidingEffect = () => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];
    
    productContainers.forEach((item, i) => {
        let containerDimenstions = item.getBoundingClientRect();
        let containerWidth = containerDimenstions.width;
    
        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })
    
        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
}

// fetch product cards
const getProducts = (tag) => {
    return fetch('/get-products', {
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
}

// create product slider
const createProductSlider = (data, parent, title) => {
    let slideContainer = document.querySelector(`${parent}`);

    slideContainer.innerHTML += `
    <section class="product">
        <h2 class="product-category">${title}</h2>
        <button class="pre-btn"><img src="../img/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../img/arrow.png" alt=""></button>
        ${createProductCards(data)}
    </section>
    `
    setupSlidingEffect();
}

//Product cards idk what the above is

const createProductCards = (data, parent) => {
    let start = '<div class="w-full h-full flex flex-col"><div class="products grid gap-y-3 gap-x-5 grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">';
    let middle = '';
    let end = '</div></div>';

    for(let i = 0; i < data.length; i++){
        if(data[i].id != decodeURI(location.pathname.split('/').pop())){
            middle += `
            <a href="/products/${data[i].id}">
                <div class="w-full h-[calc(100%)] flex flex-col cursor-pointer mb-2">
                    <div class="__react_component_tooltip t2a49e3be-9f65-4fd2-aaf0-4bd277bebac5 place-top type-dark" id="t2a49e3be-9f65-4fd2-aaf0-4bd277bebac5" data-id="tooltip"></div>
                    <div class="w-full aspect-square relative bg-neutral-200">
                        <div class="animated fadeIn" style="animation-delay: 0ms; animation-duration: 1000ms; pointer-events: all;"><span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;"><img src="${data[i].images[0]}" decoding="async" data-nimg="fill" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"></span></div>
                    </div>
                    <p class="text-xs lg:text-base mt-2">${data[i].name}</p>
                    <div class="font-light text-xs lg:text-[14px] flex">${data[i].shortDes}</div>
                    <div class="flex justify-between items-center">
                        <div class="font-light text-xs lg:text-[14px] text-red-500">Sold Out</div>
                        <div class="flex">
                            <div class="mr-[10px] inline-flex items-center text-xs lg:text-[14px]">
                                <span class="mr-1">${data[i].sellPrice}</span>
                                <span><img alt="" aria-hidden="true" src="../img/rwaste_s-product-list.png" decoding="async" data-nimg="intrinsic" currentitem="false" style="width: 16px; height: 16px;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            `;
        }
    }

    if(parent){
        let cardContainer = document.querySelector(parent);
        cardContainer.innerHTML = start + middle + end;
    } else{
        return start + middle + end;
    }
}




const add_product_to_cart_or_wishlist = (type, product) => {
    let data = JSON.parse(localStorage.getItem(type));
    if(data == null){
        data = [];
    }

    product = {
        item: 1,
        name: product.name,
        sellPrice: product.sellPrice,
        size: size || null,
        shortDes: product.shortDes,
        image: product.images[0]
    }

    data.push(product);
    localStorage.setItem(type, JSON.stringify(data));
    return 'added';
}

//search box

const mainSearchForm = document.querySelector('#main-search-form');
const mainSearchBox = document.querySelector('#main-search-box');

// Your existing product tags
mainSearchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the form from being submitted normally
    if(mainSearchBox.value.length){
        // Convert the input to lowercase before sending to server
        location.href = `/search/${mainSearchBox.value.toLowerCase()}`
    }
})


/**
 * This function adjusts the display of elements with the class 'p-text' based on the window width. 
 * When the window is narrower than a specified threshold, it inserts a line break before the '>>' in the text. 
 * When the window is wider than the threshold, it removes the line break.
 * It is designed to enhance the responsive behavior of the webpage, ensuring text displays 
 * consistently and neatly across various device widths.
 *
 */

window.addEventListener('resize', adjustText);

function adjustText() {
    let textElements = document.querySelectorAll('.p-text');
    let windowWidth = window.innerWidth;

    textElements.forEach(el => {
        if (windowWidth < 400) {
            el.innerHTML = el.innerHTML.replace(' &gt;&gt;', '<br/>&gt;&gt;');
        } else {
            el.innerHTML = el.innerHTML.replace('<br/>&gt;&gt;', ' &gt;&gt;');
        }
    });
}

// Run the function initially to handle the case if the page is opened in a small screen
adjustText();

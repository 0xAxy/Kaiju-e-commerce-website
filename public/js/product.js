const productImages = document.querySelectorAll(".product-images img"); // selecting all image thumbs
const productImageSlide = document.querySelector(".image-slider"); // seclecting image slider element

let activeImageSlide = 0; // default slider image

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.src = item.src;
        activeImageSlide = i;
    })
})


// toggle size buttons

const sizeBtns = document.querySelectorAll('.size-radio-btn'); // selecting size buttons
let checkedBtn = 0; // current selected button
let size;

sizeBtns.forEach((item, i) => { // looping through each button
    item.addEventListener('click', () => { // adding click event to each 
        sizeBtns[checkedBtn].classList.remove('check'); // removing check class from the current button
        item.classList.add('check'); // adding check class to clicked button
        checkedBtn = i; // upading the variable
        size = item.innerHTML;
    })
})

const setData = (data) => {
    console.log(data.images);
    let title = document.querySelector('title');

    // setup the images
    productImages.forEach((img, i) => {
        if(data.images[i]){
            img.src = data.images[i];
            console.log(`Image ${i} src: ${img.src}`);
        } else {
            img.style.display = 'none';
        }
    })

    // Check if only one image is there
    if (data.images.length === 1) {
        // Get the parent div of the images
        const imageSliderSection = document.getElementById('image-slider-section');

        // Hide the whole image slider section if there is only one image
        imageSliderSection.style.display = 'none';
    }

    productImages[0].click();
    

    // setup size buttons
    sizeBtns.forEach(item => {
        if(!data.sizes.includes(item.innerHTML)){
            item.style.display = 'none';
        }
    })

    //setting up texts
    const name = document.querySelector('.product-brand');
    const shortDes = document.querySelector('.product-short-des');
    const des = document.querySelector('.des');

    title.innerHTML += name.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    des.innerHTML = data.des;

    // pricing
    const sellPrice = document.querySelector('.product-price');
    const actualPrice = document.querySelector('.product-actual-price');
    const discount = document.querySelector('.product-discount');

    // Add an img tag with the src pointing to your image path
    sellPrice.innerHTML = `<span>${data.sellPrice}</span> <img src="../img/rwaste_s-product-list.png" alt="Currency">`;

    if (actualPrice) {
        actualPrice.innerHTML = `$${data.actualPrice}`;
    }

    if (discount) {
        discount.innerHTML = `( ${data.discount}% off )`;
    }


}



// fetch data
const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({id: productId})
    })
    .then(res => res.json())
    .then(data => {
        setData(data);
        getProducts(data.tags[1]).then(data => createProductSlider(data, '.container-for-card-slider', 'similar products'))
    })
    .catch(err => {
        location.replace('/404');
    })
}

let productId = null;
if(location.pathname != '/products'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}
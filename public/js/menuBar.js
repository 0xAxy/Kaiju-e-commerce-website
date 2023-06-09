/* This function is triggered when the page's Document Object Model (DOM) is ready. 
* It handles the behaviour of the logo, text, and menu elements based on the user's scroll position.
* Initially, it fetches and stores the styles of these elements.
* On scrolling, it computes a scrollProgress ratio and uses it to adjust the styles of the elements.
* When the scroll position is at the top, it resets the elements to their initial styles.
* Otherwise, it gradually scales down the logo and text size, fades out the text, and adjusts the positions of the elements as the user scrolls down.
*/

document.addEventListener("DOMContentLoaded", function() {
    // Get the scrollable div
    var scrollableDiv = document.querySelector('.overflow-y-auto');

    // Determine path for image source
    var imgPath = window.location.pathname === '/' ? './img/newlogos/newlogo_3840.png' : '../img/newlogos/newlogo_3840.png';

    // Get the logo, the text, the menu, and the logo container elements
    var logo = document.querySelector(`img[src="${imgPath}"]`);
    if (!logo) {
        console.error(`Logo not found with src: ${imgPath}`);
        return;
    }
    var text = document.querySelector('h5');
    var menu = document.querySelector('.menu');
    var logoContainer = document.querySelector('#logo-container');
    // Store initial values
    var initialLogoScale = window.getComputedStyle(logo).getPropertyValue('transform');
    var initialTextSize = window.getComputedStyle(text).getPropertyValue('font-size');
    var initialMenuMargin = window.getComputedStyle(menu).getPropertyValue('margin-top');
    var initialLogoMargin = window.getComputedStyle(logoContainer).getPropertyValue('margin-top');
    var initialTextMargin = window.getComputedStyle(text).getPropertyValue('margin-top');
    // Define the minimum scale for the logo and the size for the text
    var logoMinScale = 0.5;  // The image can shrink to half its size
    var textMinSize = 0;  // The text disappears when it reaches 0px
    // Set fixed scale and font size
    var fixedLogoScale = 0.7; // Adjust this based on the desired final scale
    var fixedTextSize = 10; // Adjust this based on the desired final font size
    // Set a fixed margin-top position
    var fixedMarginTop = -73; // Adjust this based on the desired fixed position
    var fixedLogoMarginTop = -64; // Adjust this based on the desired final position of the logo. I've made it slightly more down than the other elements.
    scrollableDiv.addEventListener('scroll', function(e) {
        // Calculate scroll progress
        var scrollProgress = Math.min(scrollableDiv.scrollTop / 20, 1);  // We're considering 200px as the scroll distance to reach the final state. Adjust this value based on your need.
        
        if(scrollableDiv.scrollTop === 0){
            // Apply the initial values
            logo.style.transform = initialLogoScale;
            text.style.fontSize = initialTextSize;
            text.style.opacity = "1";  // Text appears
            menu.style.marginTop = initialMenuMargin;
            logoContainer.style.marginTop = initialLogoMargin;
            text.style.marginTop = initialTextMargin;
        }else{
            // Apply the changes
            logo.style.transform = `scale(${fixedLogoScale - (fixedLogoScale - logoMinScale) * scrollProgress})`;
            text.style.fontSize = `${fixedTextSize - (fixedTextSize - textMinSize) * scrollProgress}px`;
            text.style.opacity = `${1 - scrollProgress}`;  // Text fades out as scrolling progresses
            menu.style.marginTop = `${fixedMarginTop * scrollProgress}px`;
            logoContainer.style.marginTop = `${fixedLogoMarginTop * scrollProgress}px`; // Use the separate variable here
            text.style.marginTop = `${fixedMarginTop * scrollProgress}px`;
        }
    });
});

/* This function is tied to the click event of the 'bars' element, presumably representing a navigation menu icon.
* On clicking this icon, the function toggles the visibility of the 'menu' element.
* If the 'menu' is not visible, it sets the menu to be displayed as a block, with full width and a fixed position offset from the top by the navbar's height.
* If the 'menu' is already visible, it hides the menu.
*/


var isMenuOpen = false; // Add a state variable

document.getElementById('bars').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    var content = document.getElementById('main-content');
    var navbarHeight = 113; // Replace this with your navbar's height

    if (isMenuOpen) {
        // If the menu is open, we want to close it and show the main content
        menu.style.display = "none";
        content.style.display = "block";
    } else {
        // If the menu is not open, we want to open it and hide the main content
        menu.style.display = "block";
        menu.style.width = "100%";
        menu.style.position = "fixed";
        menu.style.top = navbarHeight + "px";  // Offset the top of the menu by the navbar's height
        menu.style.right = "0";
        menu.style.zIndex = "999"; // Any number smaller than the z-index of .signInBtn, #bars, and .bg-white
        content.style.display = "none";
    }
    // Flip the state
    isMenuOpen = !isMenuOpen;
});
  
  
/* This function is associated with the click event of the 'shop-btn' element, likely a button for a shop or products listing.
* When the button is clicked, the function toggles the visibility of the 'shop-items' element.
* If the 'shop-items' are not visible, it displays them.
* If they're already visible, it hides them.
*/



document.getElementById('shop-btn').addEventListener('click', function () {
    var shopItems = document.getElementById('shop-items');
    if (shopItems.style.display === "block") {
        shopItems.style.display = "none";
    } else {
        shopItems.style.display = "block";
    }
});



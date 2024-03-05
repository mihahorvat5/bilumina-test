document.addEventListener("DOMContentLoaded", function() {
    const basketIcon = document.getElementById('basketIcon');
    const basketPopup = document.getElementById('basketPopup');
    let isOpenedByClick = false;
    let isMouseOverPopup = false;

    // Function to show the popup
    function showPopup() {
        basketPopup.style.display = 'block';
        updateBasketContent(); // Refresh basket content when popup is shown
    }

    // Function to hide the popup
    function hidePopup() {
        basketPopup.style.display = 'none';
    }

    // Show popup on hover
    basketIcon.addEventListener('mouseenter', function() {
        if (!isOpenedByClick) {
            showPopup();
        }
    });

    // Toggle popup on click
    basketIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the window
        isOpenedByClick = !isOpenedByClick;
        if (isOpenedByClick) {
            showPopup();
        } else {
            hidePopup();
        }
    });

    // Close popup when hovering off the basket icon if not opened by click
    basketIcon.addEventListener('mouseleave', function() {
        if (!isOpenedByClick && !isMouseOverPopup) {
            hidePopup();
        }
    });

    // Set isMouseOverPopup to true when mouse enters the popup
    basketPopup.addEventListener('mouseenter', function() {
        isMouseOverPopup = true;
    });

    // Set isMouseOverPopup to false when mouse leaves the popup
    basketPopup.addEventListener('mouseleave', function() {
        isMouseOverPopup = false;
    });

    // Close the popup when clicking outside of it
    window.addEventListener('click', function(event) {
        if (!basketIcon.contains(event.target) && !basketPopup.contains(event.target)) {
            hidePopup();
            isOpenedByClick = false;
        }
    });

    // Function to update the basket content
    function updateBasketContent() {
        const basketContent = document.getElementById('basketContent');
        if (!basketContent) return;

        // Get basket items from localStorage
        const basketItems = JSON.parse(localStorage.getItem('basketItems')) || {};

        // Clear previous content
        basketContent.innerHTML = '';

        // Check if the basket is empty
        if (Object.keys(basketItems).length === 0) {
            basketContent.innerText = 'Cart Is Empty';
            return;
        }

        // Update content with basket items
        for (const itemCode in basketItems) {
            const item = basketItems[itemCode];

            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class="basket-item">
                <div class="item-image">
                    <img src="${item.imageUrl}" alt="${item.nameLarge}" style="width: auto; height: 5vh;">
                </div>
                <div class="item-info">
                    ${item.nameLarge}
                    <br/>
                    ${item.discountPercent > 0 ? `<span class="price" style="text-decoration: line-through; color: gray;">${item.price}€</span>` : `<span class="price" style="font-weight: bold;">${item.price}€</span>`}
                    ${item.discountPercent > 0 ? `<span class="discounted-price" style="font-weight: bold; color: red;">${item.discountedPrice}€</span>` : ''}
                    <br/>
                    Quantity: ${item.quantity} 
                    <button class="add-btn" data-item="${itemCode}">+</button>
                    <button class="remove-btn" data-item="${itemCode}">-</button>
                </div>
            </div>
            <hr>
        `;
        
        
            basketContent.appendChild(itemDiv);
        }

// Calculate total price and saved money
const totalPrice = Object.values(basketItems).reduce((acc, item) => {
    const price = item.discountedPrice || item.price;
    return acc + price * item.quantity;
}, 0);

const savedMoney = Object.values(basketItems).reduce((acc, item) => {
    const price = item.discountPercent > 0 ? (item.price - item.discountedPrice) * item.quantity : 0;
    return acc + price;
}, 0);

// Add total price and saved money to the content
const totalDiv = document.createElement('div');
totalDiv.innerHTML = `
<div style="text-align: right;">
<div style="display: flex; justify-content: space-between;">
    <p class="price">Skupna Cena: ${totalPrice.toFixed(2)}€</p>
    <p style="font-weight: bold; color: red; text-decoration: underline;">Prihranek: ${savedMoney.toFixed(2)}€</p>
</div>
</div>
`;
basketContent.appendChild(totalDiv);


        // Add event listeners to buttons
        const addButtons = document.querySelectorAll('.add-btn');
        addButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the click event from propagating to the window
                const itemCode = button.getAttribute('data-item');
                addItemToBasket(itemCode);
            });
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the click event from propagating to the window
                const itemCode = button.getAttribute('data-item');
                removeItemFromBasket(itemCode);
            });
        });
    }

    // Function to add item to the basket
    function addItemToBasket(itemCode) {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || {};
        if (basketItems[itemCode]) {
            basketItems[itemCode].quantity++;
        } else {
            basketItems[itemCode] = {
                imageUrl: "IMAGE_URL_HERE",
                nameLarge: "ITEM_NAME_HERE",
                price: 0, // ITEM_PRICE_HERE
                discountPercent: 0, // DISCOUNT_PERCENT_HERE
                discountedPrice: 0, // DISCOUNTED_PRICE_HERE
                quantity: 1
            };
        }
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
        updateBasketContent();
    }

    // Function to remove item from the basket
    function removeItemFromBasket(itemCode) {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || {};
        if (basketItems[itemCode]) {
            if (basketItems[itemCode].quantity > 1) {
                basketItems[itemCode].quantity--;
            } else {
                delete basketItems[itemCode];
            }
            localStorage.setItem('basketItems', JSON.stringify(basketItems));
            updateBasketContent();
        }
    }

    // Call the initializeBasketContent function when the page loads
    updateBasketContent();
});

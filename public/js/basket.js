document.addEventListener("DOMContentLoaded", function() {
    const basketIcon = document.getElementById('basketIcon');
    const basketPopup = document.getElementById('basketPopup');
    let isOpenedByClick = false;
    let isMouseOverPopup = false;


    // prikaži popup
    function showPopup() {
        basketPopup.style.display = 'block';
        updateBasketContent();
    }

    // skrij popup
    function hidePopup() {
        basketPopup.style.display = 'none';
    }

    // prikaži popup on hover
    basketIcon.addEventListener('mouseenter', function() {
        if (!isOpenedByClick) {
            showPopup();
        }
    });

    // lock popup on click
    basketIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        isOpenedByClick = !isOpenedByClick;
        if (isOpenedByClick) {
            showPopup();
        } else {
            hidePopup();
        }
    });

    // zapri popup ob hover off (brez locked)
    basketIcon.addEventListener('mouseleave', function() {
        if (!isOpenedByClick && !isMouseOverPopup) {
            hidePopup();
        }
    });

    basketPopup.addEventListener('mouseenter', function() {
        isMouseOverPopup = true;
    });

    basketPopup.addEventListener('mouseleave', function() {
        isMouseOverPopup = false;
    });

    // zapri popup ob kliku izven
    window.addEventListener('click', function(event) {
        if (!basketIcon.contains(event.target) && !basketPopup.contains(event.target)) {
            hidePopup();
            isOpenedByClick = false;
        }
    });

    // update basket
    function updateBasketContent() {
        const basketContent = document.getElementById('basketContent');
        if (!basketContent) return;

        // get basket localstorage
        const basketItems = JSON.parse(localStorage.getItem('basketItems')) || {};

        basketContent.innerHTML = '';

        if (Object.keys(basketItems).length === 0) {
            basketContent.innerText = 'Cart Is Empty';
            return;
        }

        // update basket
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
                    Količina: ${item.quantity} 
                    <button class="add-btn" data-item="${itemCode}">+</button>
                    <button class="remove-btn" data-item="${itemCode}">-</button>
                </div>
            </div>
            <hr>
        `;
            basketContent.appendChild(itemDiv);
        }

// skupna cena + prihranek
const totalPrice = Object.values(basketItems).reduce((acc, item) => {
    const price = item.discountedPrice || item.price;
    return acc + price * item.quantity;
}, 0);

const savedMoney = Object.values(basketItems).reduce((acc, item) => {
    const price = item.discountPercent > 0 ? (item.price - item.discountedPrice) * item.quantity : 0;
    return acc + price;
}, 0);

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
        const addButtons = document.querySelectorAll('.add-btn');
        addButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                const itemCode = button.getAttribute('data-item');
                addItemToBasket(itemCode);
            });
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                const itemCode = button.getAttribute('data-item');
                removeItemFromBasket(itemCode);
            });
        });
    }

    // dodajanje izdelka v basket
    function addItemToBasket(itemCode) {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || {};
        if (basketItems[itemCode]) {
            basketItems[itemCode].quantity++;
        } else {
            basketItems[itemCode] = {
                imageUrl: "IMAGE_URL_HERE",
                nameLarge: "ITEM_NAME_HERE",
                price: 0,
                discountPercent: 0,
                discountedPrice: 0,
                quantity: 1
            };
        }
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
        updateBasketContent();
    }

    // odstranjevanje izdelka iz basketa
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
    updateBasketContent();
});

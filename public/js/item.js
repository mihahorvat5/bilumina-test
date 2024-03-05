// dodajanje v localstorage
function addItemToBasket(itemCode, nameLarge, price, imageUrl, discountPercent, discountedPrice) {
    let basketItems = JSON.parse(localStorage.getItem('basketItems')) || {};
    // pretvorba    
    price = parseFloat(price);
    if (discountPercent > 0) {
        // pretvorba
        discountPercent = parseInt(discountPercent);
        // izračun cene z popustom
        discountedPrice = ((1 - discountPercent / 100) * price).toFixed(2);
        basketItems[itemCode] = {
            nameLarge: nameLarge,
            price: price,
            imageUrl: imageUrl,
            discountPercent: discountPercent,
            discountedPrice: discountedPrice,
            quantity: (basketItems[itemCode] && basketItems[itemCode].quantity ? basketItems[itemCode].quantity : 0) + 1
        };
    } else {
        basketItems[itemCode] = {
            nameLarge: nameLarge,
            price: price,
            imageUrl: imageUrl,
            quantity: (basketItems[itemCode] && basketItems[itemCode].quantity ? basketItems[itemCode].quantity : 0) + 1
        };
    }
    localStorage.setItem('basketItems', JSON.stringify(basketItems));


    const item = basketItems[itemCode];
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-6 text-center">
                <img src="${imageUrl}" alt="${nameLarge}" style="width: 90%; display: block; margin: 0 auto;">
            </div>
            
            <div class="col-6" style="display: flex; justify-content: center; align-items: center; text-align:center;">
                <div class="item-info">
                    <h5 style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${nameLarge}</h5>
                    <p>${discountPercent > 0 ? `<span class="price" style="text-decoration: line-through; color: gray; font-weight: bold;">${price}€</span><span class="discounted-price" style="font-weight: bold; color: red;"> ${discountedPrice}€</span>` : `<span class="price" style="font-weight: bold;">${price}€</span>`}</p>
                    ${discountPercent > 0 ? `<p><span class="discount-percent" style="font-style: italic;">Popust: ${discountPercent}%</span></p>` : ''}

                </div>
            </div>
        </div>
    `;
    $('#itemAddedModal').modal('show');
}

// Modal za dodan izdelek
const itemAddedModal = `
<div class="modal fade" id="itemAddedModal" tabindex="-1" aria-labelledby="itemAddedModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="background-color: #F1E3FAb8;">
            <div class="modal-header">
                <h5 class="modal-title" id="itemAddedModalLabel">Izdelek Je Dodan v Košarico!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zapri</button>
            </div>
        </div>
    </div>
</div>
`;
$('body').append(itemAddedModal);


fetch('/get-data')
    .then(response => response.json())
    .then(data => {
        function getAllItemData(data, isFirstItem = true, uniqueCodes = new Set()) {
            let itemsData = [];
            if (typeof data === 'object' && data !== null) {
                if (!isFirstItem && data.hasOwnProperty('code') && !uniqueCodes.has(data.code)) {
                    // pretvorba
                    const discountPercent = parseInt(data.discountPercent);
                    // pridobi discountedPrice v primeru da obstaja discountPercent
                    const discountedPrice = discountPercent > 0 ? (data.price * (1 - discountPercent / 100)).toFixed(2) : null;


                    itemsData.push({
                        code: data.code,
                        id: data.id,
                        nameLarge: data.nameLarge,
                        price: data.price,
                        imageUrl: (data.images && data.images.length > 0) ? `https://cdn.babycenter.si/products/705x705${data.images[0].imagUrl}` : null,
                        secondImageUrl: (data.images && data.images.length > 1) ? `https://cdn.babycenter.si/products/705x705${data.images[1].imagUrl}` : null, // Get the second image URL
                        discountPercent: discountPercent,
                        discount: data.discount,
                        discountedPrice: discountedPrice,
                        hasDiscount: discountPercent > 0
                    });
                    uniqueCodes.add(data.code);
                }


                if (data.hasOwnProperty('items')) {
                    if (typeof data.items === 'object' && data.items !== null) {
                        itemsData = itemsData.concat(getAllItemData(data.items, false, uniqueCodes));
                    } else if (Array.isArray(data.items)) {
                        data.items.forEach(item => {
                            itemsData = itemsData.concat(getAllItemData(item, false, uniqueCodes));
                        });
                    }
                }


                for (const prop in data) {
                    if (data.hasOwnProperty(prop) && typeof data[prop] === 'object' && data[prop] !== null) {
                        itemsData = itemsData.concat(getAllItemData(data[prop], false, uniqueCodes));
                    }
                }
            }
            return itemsData;
        }


        // pridobi itemData glede na code
        function fetchItemDataByCode(itemCode, allItemData) {
            const item = allItemData.find(item => item.code === itemCode);
            if (item) {
                console.log(item);

            } else {
                console.error('Item with code not found:', itemCode);
            }
            fetchItemDataById(item.id);
        }


        // pridobi code iz URL
        const url = window.location.href;
        const itemCode = url.split('/').pop();

        const allItemData = getAllItemData(data);

        fetchItemDataByCode(itemCode, allItemData);
    })
    .catch(error => console.error('Error fetching item data:', error));


    function removeHtmlTags(htmlString) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }
    

// fetch itemData glede na ID
function fetchItemDataById(itemId) {
    fetch(`/get-item/${itemId}`)
        .then(response => response.json())
        .then(data2 => {
            const container = document.querySelector('.container-fluid');
            container.innerHTML = `
            <div class="item-container" style="width: 80vw; margin: 0 auto;">
                <div class="row">
                    <div class="col-md-6">
                        <img src="https://cdn.babycenter.si/products/705x705${data2.data.images.imageData[0].imagUrl}" alt="${data2.data.nameLarge}" style="width: 70%; max-width: 100%;">
                    </div>
                    <div class="col-md-6" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <h2>${data2.data.nameLarge}</h2></br>
                        <p style="font-weight: bold;">Cena: <span style="${data2.data.discountPercent > 0 ? 'color: grey; text-decoration: line-through;' : ''}">${data2.data.price}€</span>
                        ${data2.data.discountPercent > 0 ? `<span style="font-weight: bold; color: red;">${((1 - (data2.data.discountPercent / 100)) * data2.data.price).toFixed(2)}€</span>` : ''}
                        </p>
                        ${data2.data.discountPercent > 0 ? `<p style="font-weight: bold; text-decoration: underline; color: red; font-style: italic;">Velikost Popusta: ${data2.data.discountPercent}%</p>` : ''}
                        <button class="button-57" onclick="addItemToBasket('${data2.data.code}', '${data2.data.nameLarge}', '${data2.data.price}', 'https://cdn.babycenter.si/products/705x705${data2.data.images.imageData[0].imagUrl}', ${data2.data.discountPercent}, '${data2.data.discountedPrice}')">
                            <span class="text">Dodaj v Košarico</span><span>Pritisni za Potrditev</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Second Row -->
            <div class="row" style="margin-top: 1vh; justify-content: center; margin-top:5vh; margin-bottom:5vh;">
                ${window.innerWidth >= 768 ? // Check screen width
                    data2.data.images.imageData.slice(1).map(image => `
                        <div class="col-md-1"> 
                            <img src="https://cdn.babycenter.si/products/705x705${image.imagUrl}" alt="${data2.data.nameLarge}" style="width: 100%; max-width: 100%;">
                        </div>
                    `).join('')
                    : // For smaller screens, keep individual rows
                    data2.data.images.imageData.slice(1).map(image => `
                        <div class="row" style="margin-top: 1vh;">
                            <div class="col-12">
                                <img src="https://cdn.babycenter.si/products/705x705${image.imagUrl}" alt="${data2.data.nameLarge}" style="width: 100%; max-width: 100%;">
                            </div>
                        </div>
                    `).join('')
                }
            </div>
            <!-- Third Row -->
            <div class="row" style="margin-top: 1vh; margin-bottom: 5vh;">
                <div>${removeHtmlTags(data2.data.descriptionLarge)}</div>
            </div>`;
            })
        .catch(error => console.error('Error fetching item data:', error));
}


function removeHtmlTags(htmlString) {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
}
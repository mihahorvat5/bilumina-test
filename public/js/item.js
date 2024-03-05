// Function to add item to the basket in localStorage
function addItemToBasket(itemCode, nameLarge, price, imageUrl, discountPercent, discountedPrice) {
    let basketItems = JSON.parse(localStorage.getItem('basketItems')) || {};
    price = parseFloat(price); // Convert price to a number
    if (discountPercent > 0) {
        // Convert discountPercent to an integer
        discountPercent = parseInt(discountPercent);
        // Calculate discounted price
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

    // Populate modal with item details
    const item = basketItems[itemCode];
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-6 text-center">
                <img src="${imageUrl}" alt="${nameLarge}" style="width: 90%; display: block; margin: 0 auto;">
            </div>
            <div class="col-6">
                <div class="item-info">
                    <p>${nameLarge}</p>
                    <p>${discountPercent > 0 ? `<span class="price" style="text-decoration: line-through; color: gray; font-weight: bold;">${price}€</span><span class="discounted-price" style="font-weight: bold; color: red;"> ${discountedPrice}€</span>` : `<span class="price" style="font-weight: bold;">${price}€</span>`}</p>
                    ${discountPercent > 0 ? `<p><span class="discount-percent" style="font-style: italic;">Discount: ${discountPercent}%</span></p>` : ''}

                </div>
            </div>
        </div>
    `;

    // Show the modal
    $('#itemAddedModal').modal('show');
}

// Bootstrap Modal for Item Added
const itemAddedModal = `
<div class="modal fade" id="itemAddedModal" tabindex="-1" aria-labelledby="itemAddedModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="background-color: #F1E3FAb8;">
            <div class="modal-header">
                <h5 class="modal-title" id="itemAddedModalLabel">Item Added to Cart</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>


            </div>
            <div class="modal-body">
                <!-- Item details will be populated here -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`;

// Append the modal HTML to the body
$('body').append(itemAddedModal);






// Fetch all item data from the server
fetch('/get-data')
    .then(response => response.json())
    .then(data => {
        // Function to retrieve all item data
        function getAllItemData(data, isFirstItem = true, uniqueCodes = new Set()) {
            let itemsData = [];

            // Check if the current data is an object
            if (typeof data === 'object' && data !== null) {
                // If the current object has 'code' property and it's not a duplicate, add its data to the array
                if (!isFirstItem && data.hasOwnProperty('code') && !uniqueCodes.has(data.code)) {
                    // Convert discountPercent to an integer
                    const discountPercent = parseInt(data.discountPercent);

                    // Calculate discounted price if discountPercent is higher than 0
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
                        hasDiscount: discountPercent > 0 // Flag to indicate if the item has a discount
                    });

                    // Add the code to the set to mark it as encountered
                    uniqueCodes.add(data.code);
                }

                // Recursively traverse through the nested 'items' objects
                if (data.hasOwnProperty('items')) {
                    // If 'items' is an object, recursively call the function
                    if (typeof data.items === 'object' && data.items !== null) {
                        itemsData = itemsData.concat(getAllItemData(data.items, false, uniqueCodes));
                    } else if (Array.isArray(data.items)) { // If 'items' is an array
                        // Iterate through each item in the array
                        data.items.forEach(item => {
                            // Recursively call the function for each item
                            itemsData = itemsData.concat(getAllItemData(item, false, uniqueCodes));
                        });
                    }
                }

                // Iterate through other properties of the current object
                for (const prop in data) {
                    if (data.hasOwnProperty(prop) && typeof data[prop] === 'object' && data[prop] !== null) {
                        // Recursively call the function for each property that is an object
                        itemsData = itemsData.concat(getAllItemData(data[prop], false, uniqueCodes));
                    }
                }
            }
            return itemsData;
        }

        // Function to fetch item data based on the provided code
        function fetchItemDataByCode(itemCode, allItemData) {
            const item = allItemData.find(item => item.code === itemCode);
            if (item) {
                console.log(item);

            } else {
                console.error('Item with code not found:', itemCode);
            }
            fetchItemDataById(item.id);
        }

        // Extract the item code from the URL
        const url = window.location.href;
        const itemCode = url.split('/').pop();

        // Get all item data
        const allItemData = getAllItemData(data);

        // Fetch item data based on the code
        fetchItemDataByCode(itemCode, allItemData);
    })
    .catch(error => console.error('Error fetching item data:', error));










    function removeHtmlTags(htmlString) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }
    
// Function to fetch item data based on the provided ID
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
                        <h2>${data2.data.nameLarge}</h2>
                        <p style="font-weight: bold;">Price: <span style="${data2.data.discountPercent > 0 ? 'color: grey; text-decoration: line-through;' : ''}">${data2.data.price}€</span>
                        ${data2.data.discountPercent > 0 ? `<span style="font-weight: bold; color: red;">${((1 - (data2.data.discountPercent / 100)) * data2.data.price).toFixed(2)}€</span>` : ''}
                        </p>
                        ${data2.data.discountPercent > 0 ? `<p style="font-weight: bold; text-decoration: underline; color: red; font-style: italic;">Discount Percent: ${data2.data.discountPercent}</p>` : ''}
                        <button class="button-57" onclick="addItemToBasket('${data2.data.code}', '${data2.data.nameLarge}', '${data2.data.price}', 'https://cdn.babycenter.si/products/705x705${data2.data.images.imageData[0].imagUrl}', ${data2.data.discountPercent}, '${data2.data.discountedPrice}')">
                            <span class="text">Add To Basket</span><span>Click To Confirm</span>
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

// Function to remove HTML tags from a string
function removeHtmlTags(htmlString) {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
}

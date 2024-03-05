// Function to retrieve all item data
// Function to retrieve all item data
function getAllItemData(data, isFirstItem = true, uniqueIds = new Set()) {
    let itemsData = [];

    // Check if the current data is an object
    if (typeof data === 'object' && data !== null) {
        // If the current object has 'id' property and the ID has 6 characters and it's not a duplicate, add its data to the array
        if (!isFirstItem && data.hasOwnProperty('id') && String(data.id).length === 6 && !uniqueIds.has(data.id)) {
            // Convert discountPercent to an integer
            const discountPercent = parseInt(data.discountPercent);

            itemsData.push({
                id: data.id,
                code: data.code,
                nameLarge: data.nameLarge,
                price: data.price,
                imageUrl: (data.images && data.images.length > 0) ? data.images[0].imagUrl : null,
                secondImageUrl: (data.images && data.images.length > 1) ? data.images[1].imagUrl : null, // Get the second image URL
                discountPercent: discountPercent,
                discount: data.discount,
                discountedPrice: discountPercent > 0 ? (data.price * (1 - discountPercent / 100)).toFixed(2) : null,
                hasDiscount: discountPercent > 0 // Flag to indicate if the item has a discount
            });

            // Add the ID to the set to mark it as encountered
            uniqueIds.add(data.id);
        }

        // Recursively traverse through the nested 'items' objects
        if (data.hasOwnProperty('items')) {
            // If 'items' is an object, recursively call the function
            if (typeof data.items === 'object' && data.items !== null) {
                itemsData = itemsData.concat(getAllItemData(data.items, false, uniqueIds));
            } else if (Array.isArray(data.items)) { // If 'items' is an array
                // Iterate through each item in the array
                data.items.forEach(item => {
                    // Recursively call the function for each item
                    itemsData = itemsData.concat(getAllItemData(item, false, uniqueIds));
                });
            }
        }

        // Iterate through other properties of the current object
        for (const prop in data) {
            if (data.hasOwnProperty(prop) && typeof data[prop] === 'object' && data[prop] !== null) {
                // Recursively call the function for each property that is an object
                itemsData = itemsData.concat(getAllItemData(data[prop], false, uniqueIds));
            }
        }
    }

    return itemsData;
}

fetch('/get-items')
    .then(response => response.json())
    .then(data => {
        // Call the function to get all item data, excluding the first item
        const allItemData = getAllItemData(data);
        console.log(allItemData); // Add console.log here to see the data

        // Select the container element where the items will be displayed
        const container = document.querySelector('.container-fluid');

        // Calculate the number of items per row based on the device's screen width
        const screenWidth = window.innerWidth;
        let itemsPerRow;
        if (screenWidth >= 1224) {
            // For devices with screen width >= 1224px (desktop)
            itemsPerRow = 5;
        } else if (screenWidth >= 768) {
            // For devices with screen width between 768px and 1223px (tablet)
            itemsPerRow = 3;
        } else {
            // For devices with screen width < 768px (mobile)
            itemsPerRow = 1;
        }

        // Calculate the number of rows needed based on the number of items and items per row
        const numRows = Math.ceil(allItemData.length / itemsPerRow);

        // Loop to create rows and populate them with items
        for (let i = 0; i < numRows; i++) {
            // Create a new row div element
            const row = document.createElement('div');
            row.className = 'row h-100';
            row.style.textAlign = 'center';
            row.style.justifyContent = 'center';
            row.style.marginBottom = '1vh';
            container.appendChild(row);

            // Loop to populate the row with items
            for (let j = i * itemsPerRow; j < Math.min((i + 1) * itemsPerRow, allItemData.length); j++) {
                // Create a new column div element
                const col = document.createElement('div');
                col.className = `col-md-2`; // Set column class to col-md-2 for desktop
                row.appendChild(col);

                // Get the item corresponding to the current index
                const item = allItemData[j];
                
                // Convert discountPercent and price from string to integer and number respectively
                const discountPercent = parseInt(item.discountPercent);
                // Convert price to a number
                const price = parseFloat(item.price.replace(',', '.'));


                // Calculate discounted price if discountPercent is higher than 0
                const discountedPrice = discountPercent > 0 ? (1 - (discountPercent / 100)) * price : null;

                // Create inner HTML for the item
                const html = `
                    <div class="item-container">
                        <div class="image-container" style="position: relative; overflow: hidden;">
                            <img id="img${j}" src="https://cdn.babycenter.si/products/705x705${item.imageUrl}" alt="${item.nameLarge}" style="width: 90%; height: 90%; cursor: pointer; transition: transform 0.3s;">
                            <img class="hover-image" src="https://cdn.babycenter.si/products/705x705${item.secondImageUrl}" alt="${item.nameLarge}" style="width: 90%; height: 90%; cursor: pointer; position: absolute; top: 0; left: 0; transition: transform 0.3s; transform: scale(0.1); opacity: 0; margin-left:5%; margin-top:5%;">
                        </div>
                        <div class="item-details" style="display: flex; flex-direction: column; align-items: center; padding-bottom:1vh; text-align:center;">
                            <p class="sku" style="margin: 0; cursor: pointer;" onclick="redirectToItem('${item.code}')">SKU: ${item.code}</p>
                            <p class="name" style="cursor: pointer;" onclick="redirectToItem('${item.code}')">${item.nameLarge}</p>
                            ${discountPercent > 0 ? `
                            <div style="display: flex; align-items: center; justify-content: center; text-align: center;">
                                <p class="price" style="text-decoration: line-through; color: gray; cursor: pointer; margin: 0;">${price.toFixed(2)}€</p>
                                <p class="discounted-price" style="cursor: pointer; color: red; margin: 0; font-weight: bold;" onclick="redirectToItem('${item.code}')">${discountedPrice.toFixed(2)}€</p>
                            </div>
                            ` : `
                            <p class="price" style="cursor: pointer;">${price.toFixed(2)}€</p>
                            `}
                        </div>
                    </div>
                `;

                // Set the inner HTML of the column
                col.innerHTML = html;

                // Add event listeners for hover effect and click event
                const itemContainer = col.querySelector('.item-container');
                const hoverImage = col.querySelector('.hover-image');

                // Hover effect
                itemContainer.addEventListener('mouseenter', () => {
                    hoverImage.style.transform = 'scale(1)';
                    hoverImage.style.opacity = '1';
                    itemContainer.querySelector('img').style.transform = 'scale(0.6)';
                    itemContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
                    itemContainer.style.height = '100%';
                });

                itemContainer.addEventListener('mouseleave', () => {
                    hoverImage.style.transform = 'scale(0.1)';
                    hoverImage.style.opacity = '0';
                    itemContainer.querySelector('img').style.transform = 'scale(1)';
                    itemContainer.style.boxShadow = 'none';
                });

                // Redirect on click
                hoverImage.addEventListener('click', () => {
                    redirectToItem(item.code);
                });
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));

function redirectToItem(id) {
    window.location.href = `/item/${id}`;
}

// Shopping cart array to store cart items
const cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
  const existingItem = cart.find((item) => item.name === productName);

  if (existingItem) {
    // If item already exists, increase its quantity
    existingItem.quantity++;
  } else {
    // If item is new, add it to the cart
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  updateCart(); // Update the cart display
}

// Function to remove a product from the cart
function removeFromCart(productName) {
  const itemIndex = cart.findIndex((item) => item.name === productName);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1); // Remove the item from the cart
  }

  updateCart(); // Update the cart display
}

// Function to update the quantity of a product in the cart
function changeQuantity(productName, change) {
  const item = cart.find((item) => item.name === productName);

  if (item) {
    item.quantity += change;

    // Remove item if quantity is zero or less
    if (item.quantity <= 0) {
      removeFromCart(productName);
    } else {
      updateCart();
    }
  }
}

// Function to update the cart display
function updateCart() {
  const cartTableBody = document.querySelector('#cart-table tbody');
  cartTableBody.innerHTML = ''; // Clear the table

  let total = 0;

  cart.forEach((item) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.name}</td>
      <td>Rs${item.price}</td>
      <td>
        <button onclick="changeQuantity('${item.name}', -1)">-</button>
        ${item.quantity}
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
      </td>
      <td>Rs${item.price * item.quantity}</td>
      <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
    `;

    cartTableBody.appendChild(row);

    total += item.price * item.quantity; // Calculate total
  });

  document.getElementById('cart-total').textContent = `Total: Rs${total}`;
}

// Attach event listeners to "Shop Now" buttons
document.querySelectorAll('.product-card button').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(
      productCard.querySelector('.product-price').textContent.replace(/Rs| /g, '')
    );

    addToCart(productName, productPrice);
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
  
    function renderCart() {
      cartContainer.innerHTML = "";
      let total = 0;
  
      cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <strong>${item.name}</strong><br>Price: ₹${item.price}
          </div>
          <div class="quantity">
            <button onclick="updateQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
  
        cartContainer.appendChild(itemDiv);
      });
  
      totalPriceElement.textContent = `Total: ₹${total}`;
    }
  
    window.updateQuantity = (index, delta) => {
      if (cartItems[index].quantity + delta >= 1) {
        cartItems[index].quantity += delta;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCart();
      }
    };
  
    window.removeItem = (index) => {
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    };
  
    renderCart();
  });
  
import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

function getMenu() {
  let menuContainerHtml = ``;

  menuArray.forEach(function (menu, index) {
    menuContainerHtml += `
       <div class="main-menu">
                         <div class="menu-image-name">     
                <div class="item-emoji">
                                <img src="${menu.images}" class="menu-images">
                            </div>
                            <div class="menu-item-names">
                                <h3>${menu.name}</h3>
                                <p>${menu.ingredients}</p>
                                <h4>$${menu.price}</h4>
                            </div>
                          </div>
         
        <div class="add-item">
         <img src="images/plus-icon.png" class="plus-icon" data-index="${index}">
         </div>
            
       </div>
      
    `;
  });

  return menuContainerHtml;
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.index) {
    itemClick(e.target.dataset.index);
  }
});

function itemClick(menuIndex) {
  const targetMenuObj = menuArray[menuIndex];
  if (targetMenuObj) {
    // Make a copy of targetMenuObj and assign a new UUID to it
    const newItem = { ...targetMenuObj, uuid: uuidv4() };
    orderArray.push(newItem);
    renderOrder();
  }
}
let orderArray = []; // Array to hold the order

function getOrderHtml() {
  let orderContainerHtml = `<h3 class="order-header">Your Order</h3>`;
  let totalPrice = 0;

  orderArray.forEach(function (menu) {
    orderContainerHtml += `

   <div class="order-review">
      <div class="order-remove"><h3> ${menu.name}</h3><p class="remove-item" data-uuid="${menu.uuid}"> remove</p></div>
      <div><p>$${menu.price} </p></div>
   </div>
   `;
    totalPrice += menu.price;
  });

  orderContainerHtml += `
  <div class="total-wrapper">
  <div class="total-price">
  <h3>Total Price: $${totalPrice}</h3>
   <div><button class="complete-button">Complete Order</button></div>
   </div>

   </div>
        `;

  return orderContainerHtml;
}
// remove order item 
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-item")) {
    let uuid = e.target.dataset.uuid;
    removeItemFromOrder(uuid);
  }
});

function removeItemFromOrder(uuid) {
  orderArray = orderArray.filter(function (item) {
    return item.uuid != uuid;
  });
  renderOrder();
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("complete-button")) {
    document.querySelector(".card-modal").style.display = "block";
    document.body.classList.add("modal-open");
  }
});

document
  .querySelector(".card-modal .close-button")
  .addEventListener("click", function () {
    document.querySelector(".card-modal").style.display = "none";
    document.body.classList.remove("modal-open");
  });

document.getElementById("pay-button").addEventListener("click", function () {
  // Get customer name from input field
  const customerName = document.getElementById("name").value;
  const cardModal = document.querySelector(".card-modal");
  const orderContainer = document.querySelector(".order-container");
  const orderConfirmation = document.getElementById("order-confirmation");

  // Hide the card modal
  if (cardModal) {
    cardModal.style.display = "none";
  }

  // Hide the order container

  if (orderContainer) {
    orderContainer.style.display = "none";
  }

  if (orderConfirmation) {
    orderConfirmation.style.display = "block";
    document.getElementById("customer-name").innerText = customerName;
  }

  // Remove the modal-open class from body
  document.body.classList.remove("modal-open");
});

function render() {
  document.getElementById("menu-container").innerHTML = getMenu();
  renderOrder();
}

function renderOrder() {
  if (orderArray.length > 0) {
    document.getElementById("order-container").style.display = "block";
    document.getElementById("order-container").innerHTML = getOrderHtml();
  } else {
    document.getElementById("order-container").style.display = "none";
  }
}

render();

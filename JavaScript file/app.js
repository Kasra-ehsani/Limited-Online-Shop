/*Statics*/
const products = [
  {
    id: 1,
    title: "Bed",
    description1:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint illum nemo adipisci? Fugiat illum deserunt ex voluptatem culpa nesciunt, voluptas vitae velit fuga natusmaiores aliquid amet molestias quibusdam.",
    description2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum.",
    imageSrc: "./images/bed-image.jpg",
    price: 30.0,
    count: 3,
    category: "home",
  },
  {
    id: 2,
    title: "Birthday Glasses",
    description1:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint illum nemo adipisci? Fugiat illum deserunt ex voluptatem culpa nesciunt, voluptas vitae velit fuga natusmaiores aliquid amet molestias quibusdam.",
    description2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum.",
    imageSrc: "./images/bdglasses-image.jpg",
    price: 55.0,
    count: 15,
    category: "party",
  },
  {
    id: 3,
    title: "Laptop",
    description1:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint illum nemo adipisci? Fugiat illum deserunt ex voluptatem culpa nesciunt, voluptas vitae velit fuga natusmaiores aliquid amet molestias quibusdam.",
    description2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum.",
    imageSrc: "./images/laptop-image.jpg",
    price: 219.99,
    count: 10,
    category: "tech",
  },
  {
    id: 4,
    title: "Robotic Vaccuum Cleaner",
    description1:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint illum nemo adipisci? Fugiat illum deserunt ex voluptatem culpa nesciunt, voluptas vitae velit fuga natusmaiores aliquid amet molestias quibusdam.",
    description2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum.",
    imageSrc: "./images/robotvaccuum-image.jpg",
    price: 125.0,
    count: 6,
    category: "tech",
  },
  {
    id: 5,
    title: "Disco Ball",
    description1:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint illum nemo adipisci? Fugiat illum deserunt ex voluptatem culpa nesciunt, voluptas vitae velit fuga natusmaiores aliquid amet molestias quibusdam.",
    description2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum.",
    imageSrc: "./images/discoball-image.jpg",
    price: 199.99,
    count: 2,
    category: "party",
  },
  {
    id: 6,
    title: "Speakers",
    description1:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint illum nemo adipisci? Fugiat illum deserunt ex voluptatem culpa nesciunt, voluptas vitae velit fuga natusmaiores aliquid amet molestias quibusdam.",
    description2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum.",
    imageSrc: "./images/speakers-image.jpg",
    price: 150.0,
    count: 5,
    category: "tech",
  },
  {
    id: 7,
    title: "Dinning Table",
    description1:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint illum nemo adipisci? Fugiat illum deserunt ex voluptatem culpa nesciunt, voluptas vitae velit fuga natusmaiores aliquid amet molestias quibusdam.",
    description2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum.",
    imageSrc: "./images/diningtable-image.jpg",
    price: 189.99,
    count: 4,
    category: "home",
  },
  {
    id: 8,
    title: "Table Lamp",
    description1:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint illum nemo adipisci? Fugiat illum deserunt ex voluptatem culpa nesciunt, voluptas vitae velit fuga natusmaiores aliquid amet molestias quibusdam.",
    description2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum.",
    imageSrc: "./images/lamp-image.jpg",
    price: 69.99,
    count: 20,
    category: "home",
  },
];
const cart = [];
let filteredProducts = [];
const container = document.getElementById("product-items");
const cartContainer = document.getElementById("cart-container");
const cartButton = document.getElementById("cart-btn");
const cartCounterValue = document.getElementById("cart-counter");
const searchField = document.getElementById("search");
const categoryField = document.getElementById("category-select");
const filterButton = document.getElementById("filter-btn");
const removeFilterButton = document.getElementById("remove-filter-btn");

/*Logic*/
loadEventListeners();

let tempCounter = 0;
function addToCart(e, defaultID) {
  const temp = e.target.parentNode;
  const item = temp.previousElementSibling;
  const itemId = defaultID ?? Number(item.id);
  const isExist = cart.find((item) => item.id === itemId);
  const productToAdd = products.find((item) => item.id === itemId);
  if (isExist) {
    if (isExist.quantity < isExist.count) {
      isExist.quantity++;
      updateCartUI();
    } else if (isExist.quantity === isExist.count) {
      alert(
        "ERROR\nCan not Add More to The Cart, Considering Our Stock\nSorry.",
      );
    }
  } else {
    cart.push({
      ...productToAdd,
      quantity: 1,
    });
    updateCartUI();
    tempCounter++;
    cartCounterValue.textContent = tempCounter;
  }
}

function increaseInCart(e, defaultID) {
  const temp = e.target.parentNode;
  const item = temp.previousElementSibling;
  const itemId = defaultID;
  const findInCart = cart.find((item) => item.id === itemId);
  if (findInCart) {
    if (findInCart.quantity < findInCart.count) {
      findInCart.quantity++;
      document.getElementById(`qnty${findInCart.id}`).textContent =
        `${findInCart.quantity} In Cart`;
    } else if (findInCart.quantity === findInCart.count) {
      alert(
        "ERROR\nCan not Add More to The Cart, Considering Our Stock\nSorry.",
      );
    }
  }
}

function decreaseInCart(e, defaultID) {
  const temp = e.target.parentNode;
  const item = temp.previousElementSibling;
  const itemId = defaultID;
  const findInCart = cart.find((item) => item.id === itemId);
  if (findInCart) {
    if (findInCart.quantity === 1) {
      cart.splice(cart.indexOf(findInCart), 1);
      updateCartUI();
      tempCounter--;
      cartCounterValue.textContent = tempCounter;
      if (cart.length === 0) {
        cartContainer.classList.add("d-none");
      }
    } else if (findInCart.quantity > 1) {
      findInCart.quantity--;
      document.getElementById(`qnty${findInCart.id}`).textContent =
        `${findInCart.quantity} In Cart`;
    }
  }
}

function filterProductsBySearch(val) {
  filteredProducts.splice(0);
  filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(val.toLowerCase()),
  );
  console.log(filteredProducts);

  if (filteredProducts.length !== 0) {
    updateProcutsUI(filteredProducts);
    removeFilterButton.removeAttribute("disabled");
  } else {
    if (confirm(" Product Not Found\nTry Again")) {
      searchField.value = "";
    }
  }
}

function filterProductsByCategory(val) {
  if (val === 0) {
    alert("Please Choose A Category!");
    return;
  }
  let categoryOfVal = "";
  switch (val) {
    case "1":
      categoryOfVal = "home";
      break;
    case "2":
      categoryOfVal = "tech";
      break;
    case "3":
      categoryOfVal = "party";
      break;

    default:
      break;
  }
  filteredProducts.splice(0);
  filteredProducts = products.filter((item) =>
    item.category.toLowerCase().includes(categoryOfVal.toLowerCase()),
  );
  if (filteredProducts.length !== 0) {
    updateProcutsUI(filteredProducts);
    removeFilterButton.removeAttribute("disabled");
  } else {
    if (confirm("Unfortunately Category is Out of Products Right Now.")) {
      categoryField.value = 0;
    }
  }
}

function clearFilter() {
  filteredProducts.splice(0);
  searchField.value = "";
  categoryField.value = 0;
  updateProcutsUI(products);
  removeFilterButton.setAttribute("disabled", "disabled");
}

/*UI*/
let cardsHTML = "";
function updateProcutsUI(theList) {
  container.innerHTML = theList
    .map(
      (item) =>
        `<div class="col">
                <div class="d-flex flex-column justify-content-evenly p-3 bg-secondary border rounded h-100">
                  <div class="d-flex flex-column" id="${item.id}">
                    <img
                      src="${item.imageSrc}"
                      alt="Product's Image"
                      class="mb-3"/>
                    <h2>${item.title}</h2>
                    <p>${item.description1}</p>
                    <p>${item.description2}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center btn-container">
                    <p class="p-2">${item.price.toFixed(2)} $  <br/>  ${item.count} Available</p>
                    <button class="product-add-btn border-0 bg-primary rounded" type="button">Add to Cart</button>
                  </div>
                </div>
              </div>`,
    )
    .join("");
}

function updateCartUI() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<div class="col m-auto" id="deflt-cart">
          <p class="text-center align-bottom m-0">Cart is Empty!</p>
        </div>`;
  } else {
    cartContainer.innerHTML = cart
      .map(
        (item) => `<div class="col">
                <div class="d-flex flex-column justify-content-evenly p-3 bg-secondary border-0 rounded h-100">
                  <div class="d-flex flex-column" id="${item.id}">
                    <img
                      src="${item.imageSrc}"
                      alt="Product's Image"
                      class="mb-3"/>
                    <h2>${item.title}</h2>
                  </div>
                  <div class="d-flex justify-content-between align-items-center btn-container">
                    <p class="pt-3 px-1">${item.price.toFixed(2)}$ <br/> <span id="qnty${item.id}">${item.quantity} In Cart</span></p>
                    <button class="quantity-change border-0 bg-primary rounded m-1" type="button" data-id="${item.id}">+</button>
                    <button class="quantity-change border-0 bg-primary rounded m-1" type="button" data-id="${item.id}">-</button>
                  </div>
                </div>
              </div>`,
      )
      .join("");
  }
}

/*Events*/
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    updateProcutsUI(products);
    cartContainer.innerHTML = `<div class="col m-auto" id="deflt-cart">
          <p class="text-center align-bottom m-0">Cart is Empty!</p>
        </div>`;

    const addButtons = document.querySelectorAll(".product-add-btn");
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("product-add-btn")) {
        addToCart(e);
      }
    });
    //   addButtons.forEach((button) => {
    //     button.addEventListener("click", addToCart);
    //     return;
    //   });
    //   console.log(cart);

    cartContainer.addEventListener("click", (e) => {
      e.stopPropagation(); //IMPORTANT /* */
      if (e.target.classList.contains("quantity-change")) {
        const actionToDo = e.target.textContent;
        const itemId = Number(e.target.dataset.id);
        if (actionToDo === "+") {
          increaseInCart(e, itemId);
        } else if (actionToDo === "-") {
          decreaseInCart(e, itemId);
        }
      }
    });

    filterButton.addEventListener("click", (e) => {
      // console.log("value of search: ", searchField.value);
      // console.log(typeof searchField.value);
      // console.log(searchField.value === "");
      if (searchField.value !== "" && categoryField.value > 0) {
        alert(
          "Unfortunately Hybrid Filter/Search Is Not Available at the moment.",
        );
        clearFilter();
      } else if (searchField.value !== "") {
        filterProductsBySearch(searchField.value);
      } else if (categoryField.value > 0) {
        filterProductsByCategory(categoryField.value);
      } else {
        confirm("Please First Choose One of The Options.");
      }
    });

    removeFilterButton.addEventListener("click", (e) => {
      clearFilter();
    });

    document.addEventListener("click", (e) => {
      if (cartButton.contains(e.target) || cartContainer.contains(e.target)) {
        cartContainer.classList.remove("d-none");
      } else {
        cartContainer.classList.add("d-none");
      }
    });
  });
}

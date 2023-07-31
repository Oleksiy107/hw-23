document.addEventListener('DOMContentLoaded', () => {
  const categories = {
    Electronics: ["Smartphone:Price 999$", "Laptop:Price 1099$"],
    Clothing: ["T-shirt: Price 100$", "Jeans:Price 56$"],
    Cosmetics: ["Lipstick:Price 34$", "Face Mask:Price 27$"],
  };

  const categoriesContainer = document.getElementById('categories-container');
  const productContainer = document.getElementById('product-list');
  const productInfoContainer = document.getElementById('product-info');
  const formDelivery = document.getElementById('formDelivery');
  const mainContainer = document.getElementById('main-container');
  const orderListContainer = document.getElementById('order-list-container');
  const orderList = document.getElementById('order-list');
  const purchaseHistoryList = document.getElementById('purchaseHistoryList');
  const showPurchaseHistoryBtn = document.getElementById('showPurchaseHistoryBtn');
  const hidePurchaseHistoryBtn = document.getElementById('hidePurchaseHistoryBtn');

  function showProducts(event) {
    const category = event.target.dataset.category;
    productContainer.innerHTML = '';
    productInfoContainer.innerHTML = '';
    for (const product of categories[category]) {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.textContent = product;
      productElement.addEventListener('click', showProductInfo);
      productContainer.appendChild(productElement);
    }
  }

  function openForm() {
    formDelivery.style.display = 'block';
  }

  function hiddenForm() {
    formDelivery.style.display = 'none';
  }

  function showProductInfo(event) {
    const productInfo = event.target.textContent;
    const productInfoElement = document.createElement('div');
    productInfoElement.textContent = productInfo;

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.addEventListener('click', () => {
      formDelivery.style.display = '';
      handlePurchase(productInfo);
      openForm();
    });

    productInfoElement.appendChild(buyButton);
    productInfoContainer.innerHTML = '';
    productInfoContainer.appendChild(productInfoElement);
  }

  function handlePurchase(productInfo) {
    const date = new Date().toLocaleDateString();
    const price = parseFloat(productInfo.split('')[0].replace('$', ''));
    const order = { date, price, details: [productInfo] };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  function showOrderList() {
    mainContainer.style.display = 'none';
    orderListContainer.style.display = 'block';
    orderList.innerHTML = '';
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    for (const order of orders) {
      const orderItem = document.createElement('div');
      orderItem.classList.add('order-item');

      const orderHeader = document.createElement('div');
      orderHeader.classList.add('order-header');
      orderHeader.textContent = `Order Date: ${order.date}`;
      orderItem.appendChild(orderHeader);

      const orderDetails = document.createElement('div');
      orderDetails.classList.add('order-details');
      for (const detail of order.details) {
        const detailItem = document.createElement('div');
        detailItem.textContent = detail;
        orderDetails.appendChild(detailItem);
      }

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Order';
      deleteButton.addEventListener('click', () => {
        const index = orders.indexOf(order);
        if (index > -1) {
          orders.splice(index, 1);
          localStorage.setItem('orders', JSON.stringify(orders));
          showOrderList();
        }
      });

      orderDetails.appendChild(deleteButton);
      orderItem.appendChild(orderDetails);
      orderList.appendChild(orderItem);
    }
  }

  function showPurchaseHistory() {
    mainContainer.style.display = 'none';
    orderListContainer.style.display = 'none';
    purchaseHistoryList.style.display = 'block';

    purchaseHistoryList.innerHTML = '';
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    for (const orderInfo of purchaseHistory) {
      const listItem = document.createElement('div');
      listItem.textContent = orderInfo;
      purchaseHistoryList.appendChild(listItem);
    }

    hidePurchaseHistoryBtn.style.display = 'inline-block';
    showPurchaseHistoryBtn.style.display = 'none';
  }

  function hidePurchaseHistory() {
    mainContainer.style.display = 'block';
    orderListContainer.style.display = 'none';
    purchaseHistoryList.style.display = 'none';

    hidePurchaseHistoryBtn.style.display = 'none';
    showPurchaseHistoryBtn.style.display = 'inline-block';
  }

  for (const category in categories) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category');
    categoryElement.textContent = category;
    categoryElement.dataset.category = category;
    categoryElement.addEventListener('click', showProducts);
    categoriesContainer.appendChild(categoryElement);
  }

  const buyBtn1 = document.getElementById('buyBtn1');
  buyBtn1.addEventListener('click', checkForm);

  buyBtn1.addEventListener('click', hiddenForm);

  showPurchaseHistoryBtn.addEventListener('click', function () {
    mainContainer.style.display = 'none';
    orderListContainer.style.display = 'block';
    purchaseHistoryList.style.display = 'none';

    orderListContainer.style.display = 'block';
    showOrderList();

    hidePurchaseHistoryBtn.style.display = 'inline-block';
    showPurchaseHistoryBtn.style.display = 'none';
  });

  hidePurchaseHistoryBtn.addEventListener('click', function () {
    mainContainer.style.display = 'block';
    orderListContainer.style.display = 'none';
    purchaseHistoryList.style.display = 'none';

    hidePurchaseHistoryBtn.style.display = 'none'
    hidePurchaseHistoryBtn.style.display = 'none';
    showPurchaseHistoryBtn.style.display = 'inline-block';
  });

  function checkForm() {
    const pib = document.getElementById('pib').value;
    const city = document.getElementById('city').value;
    const delivery = document.getElementById('delivery').value;
    const pay = document.getElementById('pay').value;
    const quantity = document.getElementById('quantity').value;
    const comment = document.getElementById('comment').value;

    if (pib.trim() === '' || city.trim() === '' || delivery.trim() === '' || pay.trim() === '' || quantity.trim() === '') {
      alert(`Sorry, your information is not complete.`);
      return;
    }
    
    if (isNaN(+quantity) || +quantity < 0 || isNaN(+delivery) || +delivery < 0)  {
      alert("Please enter a valid positive number for quantity.");
      return;
    }
  

    let orderInfo = `Details about delivery\n`;
    orderInfo += "Full name: " + pib + '\n';
    orderInfo += "City: " + city + '\n';
    orderInfo += "Delivery address: " + delivery + '\n';
    orderInfo += "Payment method: " + pay + '\n';
    orderInfo += "Quantity of goods: " + quantity + '\n';
    orderInfo += "Comment: " + comment + '\n';

    alert(orderInfo);

    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    purchaseHistory.push(orderInfo);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    showOrderList();
  }


  mainContainer.style.display = 'block';
  orderListContainer.style.display = 'none';
  purchaseHistoryList.style.display = 'none';
  hidePurchaseHistoryBtn.style.display = 'none';
  });
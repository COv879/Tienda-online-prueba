// Variables globales
const apiUrl = 'https://tienda-online-itnovai.netlify.app/api';

// Document Ready
$(document).ready(function() {
    // Inicialización
    initialize();

    // Event Listeners
    $('#searchButton').click(handleSearchButtonClick);
    $('#clearButton').click(handleClearButtonClick);
});

// Función de inicialización
function initialize() {
    fetchProducts();
}

// Manejador del clic en el botón de búsqueda
function handleSearchButtonClick() {
    const query = $('#searchQuery').val();
    if (query) {
        searchProducts(query);
    }
}

function handleClearButtonClick() {
  fetchProducts(); // Obtener todos los productos nuevamente
}


// Función para obtener todos los productos
function fetchProducts() {
    fetch(`${apiUrl}/products`)
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error fetching products:', error));
}

// Función para buscar productos por nombre
function searchProducts(query) {
    fetch(`${apiUrl}/products/search?search=${query}`)
        .then(response => response.json())
        .then(data => displaySearchResults(data))
        .catch(error => console.error('Error fetching search results:', error));
}

// Función para mostrar los productos en el DOM
function displayProducts(products) {
  const container = $('#productsContainer');
  container.empty();
  
  const displayHeader = $('<h2 class="my-4">Todos los productos</h2>');
  container.append(displayHeader);

  const row = $('<div class="row"></div>');
  products.forEach(product => {
    const productCard = createProductCard(product, product.categoryName); // Pasar categoryName como parámetro
    row.append(productCard);
  });
  container.append(row);

  // Oculta los resultados de la búsqueda
  $('#searchResults').hide();
}

// Función para mostrar los resultados de búsqueda en el DOM
function displaySearchResults(products) {
  const container = $('#searchResults');
  container.empty();

  if (products.length === 0) {
    container.append('<p>No se encontraron productos</p>');
  } else {
    const searchHeader = $('<h2 class="my-4">Resultados de la búsqueda</h2>');
    container.append(searchHeader);

    const row = $('<div class="row"></div>');
    products.forEach(product => {
      const productCard = createProductCard(product, product.categoryName); // Pasar categoryName como parámetro
      row.append(productCard);
    });

    container.append(row);
    // Oculta los productos
    $('#productsContainer').hide();
    // Muestra los resultados de la búsqueda
    container.show();
  }
}



// Función para crear una tarjeta de producto HTML
function createProductCard(product) {
  const category = product.categoryName || 'Categoría no definida';
  const productCard = $(`
      <div class="col-md-3">
          <div class="card mb-4">
              <img src="${product.url_image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">$${product.price.toFixed(2)}</p>
                  <p class="card-text">Descuento: ${product.discount}%</p>
                  <p class="card-text">Categoría: ${category}</p> <!-- Utilizar categoryName -->
              </div>
          </div>
      </div>
  `);

  return productCard;
}






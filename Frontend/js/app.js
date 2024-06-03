const apiUrl = '/.netlify/functions'; // URL de las funciones Netlify

// Inicialización
$(document).ready(function() {
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

// Manejador del clic en el botón de limpiar
function handleClearButtonClick() {
  fetchProducts(); 
}


// Función para obtener todos los productos
function fetchProducts() {
    fetch(`${apiUrl}/getProducts`) 
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error fetching products:', error));
}

// Función para buscar productos por nombre
function searchProducts(query) {
    fetch(`${apiUrl}/searchProducts?search=${query}`) 
        .then(response => response.json())
        .then(data => displaySearchResults(data))
        .catch(error => console.error('Error fetching search results:', error));
}

// Función para mostrar los productos en el DOM
function displayProducts(categories) {
  const container = $('#productsContainer');
  container.empty();

  categories.forEach(category => {
      const categoryHeader = $('<h2 class="my-4"></h2>').text(category.category);
      container.append(categoryHeader);

      const row = $('<div class="row"></div>');
      category.products.forEach(product => {
          const productCard = createProductCard(product);
          row.append(productCard);
      });
      container.append(row);
  });

  $('#searchResults').hide();
}

// Función para mostrar los resultados de búsqueda en el DOM
function displaySearchResults(categories) {
  const container = $('#searchResults');
  container.empty();

  if (categories.length === 0) {
      container.append('<p>No se encontraron productos</p>');
  } else {
      categories.forEach(category => {
          const categoryHeader = $('<h2 class="my-4"></h2>').text(category.category);
          container.append(categoryHeader);

          const row = $('<div class="row"></div>');
          category.products.forEach(product => {
              const productCard = createProductCard(product);
              row.append(productCard);
          });
          container.append(row);
      });

      $('#productsContainer').hide();
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
                  <p class="card-text">Categoría: ${category}</p>
              </div>
          </div>
      </div>
  `);

  return productCard;
}





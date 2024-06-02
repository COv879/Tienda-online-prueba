# Tienda Online Backend
## Ejercicio de Entrevista ITNOVAI
Este ejercicio consiste de la construcción de una página web que se encarga de gestionar la tienda online, el cual tiene una base de datos y una API. El proyecto se ha realizado en el marco de la entrevista ITNOVAI.

La Página web está construida en el lenguaje de programación JavaScript, el Backend fue consturuido utilizando Express y Sequelize para la base de datos, mientras que el Frontend fue construido con Vainilla JavaScript. El proyecto se ha realizado en el marco de la entrevista ITNOVAI.


## Estructura
La estructura de la página web está compuesta de la siguiente forma:

### Backend (Express y Sequelize)
La estructura del backend está compuesta de la siguiente forma:

| Ruta | Descripción |
| --- | --- |
| Backend | Carpeta que contiene los archivos y carpetas del Backend |
| Backend/config | Configuración de la base de datos con el Backend, en particular, la conexión y sincronización |
| Backend/controllers | Controladores que se encargan de interactuar con los datos de las tablas de la base de datos|
| Backend/models | Describe los modelos de datos que están basados en las tablas de la base de datos, siendo product y category los dos principales. |
| Backend/routes | Rutas del Backend que se encargan de interactuar con los controladores.|
| Backend/app.js | Archivo principal del Backend. |

### Frontend (Vainilla JavaScript)
La estructura del frontend está compuesta de la siguiente forma:

| Ruta | Descripción |
| --- | --- |
| Frontend | Carpeta que contiene los archivos y carpetas del Frontend |
| Frontend/assets | Archivos de imagenes que se utilizan en la página web. |
| Frontend/index.html | Archivo HTML del Frontend que contiene la página web. |
| Frontend/js/app.js | Archivo principal del Frontend. |
| Frontend/css/styles.css | Archivo CSS del Frontend. |

### functions (Netlify)
La estructura de esta carpeta está compuesta de la siguiente forma:

| Ruta | Descripción |
| --- | --- |
| functions | Carpeta que contiene las funciones para utilizarlas en el hosting de Netlify |
| functions/getProducts.js | Función que obtiene todos los productos de la base de datos.|
| functions/searchProducts.js | Función que realiza la búsqueda de productos.|

## Funcionamiento
El funcionamiento del proyecto se detalla a continuación:

    Primero, se realiza la sincronizacion a la base de datos para que la página despliegue todos los productos disponibles, despues, si el usuario quiere realizar una busqueda, se le solicita al usuario que ingrese el texto y se le muestra los resultados. Tambien se puede limpiar la página web con el botón de limpiar. 






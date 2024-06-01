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
| Frontend/index.html | Archivo HTML del Frontend que contiene la página web. |
| Frontend/js/app.js | Archivo principal del Frontend. |
| Frontend/css/styles.css | Archivo CSS del Frontend. |


## Funcionamiento
Primero, se realiza la sincronizacion a la base de datos, despues, se inicia el servidor con las rutas asociadas que indican a los controladores y estos relizan el despliegue de productos y la búsqueda de ellos.


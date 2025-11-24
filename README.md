# MercApp – Unidad 3

Aplicación web de una sola página (SPA) desarrollada con **Vue 3 + Vite** que consume un **API REST** creado por el propio estudiante (refactor de la Unidad 2).  
Permite gestionar un pequeño catálogo de productos y un carrito de compras simple.

---

## Datos del estudiante

- **Nombre:** Abelardo Merchán Guevara  
- **Carrera:** Ingeniería de Software  
- **Asignatura:** Aplicaciones Web  
- **Unidad:** U3 – SPA con Vue 3 y consumo de API REST

---

## Tecnologías utilizadas

### Backend (API REST)

- Node.js + Express
- CORS
- Persistencia en archivos JSON (`data/products.json`, `data/categories.json`)

### Frontend (SPA)

- Vue 3 (Composition API, SFC)
- Vite
- Vue Router
- Pinia (estado global – carrito)
- Fetch API + composables personalizados

---

## Estructura del proyecto

```text
U3/
  backend-api/          # API REST (Node + Express)
    data/               # Archivos JSON con productos y categorías
    seed.js             # Script de semilla de datos
    server.js           # Servidor API
    package.json

  frontend/             # SPA Vue 3 + Vite
    src/
      assets/
      components/
      composables/
      router/
      stores/
      views/
      App.vue
      main.js
    index.html
    package.json

  .env                  # Variables de entorno (ej: PORT)
````

---

## Instalación y ejecución

### Requisitos

- Node.js (versión LTS recomendada)
- npm

### 1. Clonar el repositorio

```bash
git clone https://github.com/AbelardoMerchan/Apps_U3.git
cd U3
````

#### 2. Backend – API REST

- En una terminal:

  - `cd backend-api`
  - `npm install`
  - `npm run seed`  _(opcional: carga datos de ejemplo)_
  - `npm start`  _(servidor en `http://localhost:4000`)_  

- Endpoints de prueba:

  - `http://localhost:4000/`
  - `http://localhost:4000/api/products`
  - `http://localhost:4000/api/categories`

---

#### 3. Frontend – SPA Vue 3

- En otra terminal:

  - `cd frontend`
  - `npm install`
  - `npm run dev`

- La aplicación estará disponible en:

  - `http://localhost:5173/`

---

#### Uso básico de la aplicación

- Abrir la SPA en `http://localhost:5173/`.
- Explorar el catálogo de productos (Home), usando el buscador y el filtro por categoría.
- Hacer clic en un producto para ver su detalle.
- Crear nuevos productos desde el enlace **“Nuevo producto”**.
- Editar productos existentes desde la vista de detalle (**“Editar producto”**).
- Añadir productos al carrito desde el listado (botón **“Añadir”**).
- Abrir la vista **“Carrito”** para:
  - Aumentar o disminuir cantidades.
  - Quitar ítems individuales.
  - Vaciar todo el carrito.
- Cerrar y volver a abrir el navegador: el contenido del carrito se mantiene gracias a la persistencia en **`localStorage`**.


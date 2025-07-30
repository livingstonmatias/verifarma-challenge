#  Nuxt 4 - Verifarma Frontend Challenge

Una aplicación web construida con **Nuxt 4** como parte de un challenge de películas. Permite a los usuarios autenticarse, explorar películas, y guardar sus favoritas. Utiliza **Vuetify** para la interfaz, **Drizzle ORM** para persistencia de datos, y varios módulos de Nuxt para enriquecer la experiencia del desarrollador y del usuario.

Nota: este repositorio usa la api https://www.themoviedb.org/ para obtener informacion de peliculas.

---

##  Tecnologías utilizadas

- **Nuxt 4** – Framework Vue de propósito general
- **Vuetify** – Componentes UI modernos y responsive
- **nuxt-swiper** – Carruseles y sliders interactivos
- **nuxt-auth-utils** – Autenticación con providers como GitHub/Google
- **SCSS** – Preprocesador CSS para estilos escalables
- **Drizzle ORM** – ORM moderno y type-safe para bases de datos SQL
- **TypeScript** – Tipado estático y mayor robustez

---

##  Funcionalidades

- ✅ Registro e inicio de sesión
- ✅ Listado de películas populares
- ✅ Carruseles de películas (Swiper)
- ✅ Detalles individuales por película
- ✅ Guardado de películas como favoritas por usuario
- ✅ Diseño responsive y accesible con Vuetify
- ✅ Panel de usuario con sus favoritos

---

##  Instalación

```bash
# Clona el repositorio
git clone https://github.com/livingstonmatias/verifarma-challenge.git
cd verifarma-challenge

# Instala las dependencias
npm install

# Configura las variables de entorno
cp .env.example .env

```

##  Variables de entorno

Completa el archivo .env con tus propias credenciales:
```bash

DATABASE_URL=                   # URL de conexión a la base de datos (PostgreSQL)
NUXT_SESSION_PASSWORD=          # Clave para cifrar la sesión del usuario (minimo 32 caracteres) 
TMDB_API_KEY=                   # Tu API Key de TheMovieDB
TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_MEDIA_URL=https://image.tmdb.org/t/p
```

##  Comandos disponibles

```bash
# Inicia el entorno de desarrollo
npm run dev

# Compila el proyecto para producción
npm run build

# Genera un sitio estático (si aplica)
npm run generate

# Previsualiza la app generada o compilada
npm run preview

# Ejecuta pruebas con Vitest
npm run test

# Ejecuta ESLint para analizar el código
npm run lint

# Ejecuta ESLint y corrige errores automáticamente
npm run lint:fix

# Genera archivos de migración desde los modelos Drizzle
npm run db:generate

# Aplica migraciones a la base de datos
npm run db:migrate
```
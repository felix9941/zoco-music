# ZOCO Music

Una aplicación web inspirada en Spotify, desarrollada como prueba técnica. Permite explorar nuevos lanzamientos, buscar artistas, álbumes y canciones, gestionar favoritos y simular la reproducción de pistas mediante un reproductor persistente.

## 🚀 Tecnologías y Decisiones Técnicas

El proyecto fue construido utilizando **React + Vite** por su rapidez en desarrollo y compilación. Las decisiones clave de arquitectura incluyen:

- **Tailwind CSS:** Elegido para maquetar el diseño responsive de manera ágil, manteniendo un código limpio sin depender de múltiples archivos de estilos externos.
- **Zustand:** Utilizado para el manejo del estado global (Reproductor e Historial) y la persistencia de los Favoritos en el `localStorage` mediante su middleware `persist`. Es más ligero y menos verboso que Redux.
- **React Router Dom:** Implementado para garantizar una navegación fluida estilo SPA (Single Page Application) sin recargar la página.

### ⚠️ Nota sobre la API (Migración a Deezer)

Para cumplir con el requerimiento de consumir datos reales, el proyecto inicialmente contemplaba la **Spotify Web API**. Sin embargo, debido a los recientes cambios en las políticas de Spotify for Developers (que ahora bloquean el acceso a la Web API para cuentas gratuitas en nuevas aplicaciones), se tomó la decisión técnica de migrar a la **API Pública de Deezer**.

Esta decisión permite mantener la aplicación 100% funcional y demostrable (buscando artistas, canciones y álbumes reales) sin depender de suscripciones pagas para su evaluación, configurando un proxy en Vite para el manejo correcto de CORS.

## 🛠️ Instalación y Ejecución local

Sigue estos pasos para correr el proyecto en tu entorno local:

1. Clona el repositorio:
   \`\`\`bash
   git clone https://github.com/tu-usuario/zoco-music.git
   \`\`\`

2. Navega al directorio del proyecto:
   \`\`\`bash
   cd zoco-music
   \`\`\`

3. Instala las dependencias:
   \`\`\`bash
   npm install
   \`\`\`

4. Inicia el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Abre tu navegador en `http://localhost:5173`.

## ✨ Funcionalidades Implementadas

- [x] Home con últimos lanzamientos y grilla dinámica de "Escuchados recientemente".
- [x] Buscador con _debounce_ para artistas, álbumes y canciones.
- [x] Vistas de detalle de Artista (consumiendo 3 endpoints en paralelo) y Álbum.
- [x] Reproductor inferior persistente.
- [x] Favoritos persistidos localmente.
- [x] Diseño 100% responsive.
- [x] Manejo de estados de carga, errores y búsquedas sin resultados.

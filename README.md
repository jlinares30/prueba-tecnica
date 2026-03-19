# 🛸 Rick & Morty: Citadel Inventory Manager (v3.0)

¡Bienvenidos! Esta es una aplicación **React** diseñada para que los investigadores interdimensionales gestionen un diario de campo sobre los personajes del multiverso de Rick & Morty.

Este proyecto demuestra el dominio de un **Stack Frontend Moderno** enfocado en la consistencia de datos, la experiencia de usuario (UX) y una arquitectura de software escalable.

---

## Stack Tecnológico

* **Frontend:** [React.js](https://reactjs.org/) (Vite)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Gestión de Estado Asíncrono:** [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
* **Formularios:** [React Hook Form](https://react-hook-form.com/)
* **Validación de Esquemas:** [Zod](https://zod.dev/)
* **Enrutado:** [React Router Dom ](https://reactrouter.com/)
* **Comunicación:** [Axios](https://axios-http.com/)

---

## Características Técnicas

### 1. Gestión de Datos Híbrida (CRUD Completo)
La aplicación orquesta datos de dos fuentes distintas para enriquecer la experiencia:
* **Lectura (API Rick & Morty):** Obtención de la "Entidad Maestra" (personajes).
* **Escritura (JSONPlaceholder):** Persistencia simulada de "Notas de Campo" personalizadas vinculadas por ID.
* **Operaciones:** Creación de registros, edición con sincronización de estado y eliminación con feedback visual.

### 2. Optimización de Rendimiento y UX
* **Estrategia de Caché:** Implementación de React Query y junto con ello se implementa `placeholderData: keepPreviousData` en la paginación para eliminar "flashes" blancos y mantener la fluidez visual mientras se cargan nuevas dimensiones (páginas).
* **Validación Robusta:** Uso de **Zod** para definir contratos de datos, garantizando que el servidor reciba información limpia y el usuario obtenga errores descriptivos en tiempo real.
* **Sistemas de Carga:** Skeletons personalizados y Spinners de "Portal" inspiradas en la serie original.
* **Cards de Notificaciones:** Uso de notificaciones en pantalla reaccionando inmediatamente a las acciones del usuario a la hora de realizar cualquiera de las operaciones CRUD, ya sean positivas de confirmacion o negativas de errores.


### 3. UI/UX "Ciudadela Style"
* **Jerarquía Visual:** Uso de colores tácticos inspirados en la serie de Rick y Morty para indicar estados de salud y otros datos.
* **Responsive Design:** Arquitectura móvil-primero adaptada para cualquier vista de la aplicación.

---

---
## Modularidad del Sistema / Arquitectura

* El sistema esta distribuido en carpetas y archivos segun su funcion, de esta manera se separa responsabilidades, se reutiliza componentes y ayuda a la mantenibilidad futura.

* Algunas implementaciones del sistema incluyen:
    * **`useInventory` (Custom Hook):** Centraliza la lógica de mutaciones (POST, PUT, DELETE), desacoplando la lógica de negocio de los componentes de la interfaz.
    * **`MainLayout`**: Define el entorno visual global y gestiona el enrutado mediante `Outlet`.
    * **`Notification`**: Componente de feedback holográfico con lógica condicional para éxitos y fallos del sistema.

---

## Simulación de API
> **Manejo de Errores:** Dado que JSONPlaceholder no persiste nuevos recursos (IDs > 100), el proyecto implementa una lógica de **"Fallback Local"**. Si la API devuelve un Error 500 al intentar mutar un recurso creado en la sesión, la aplicación garantiza la consistencia visual actualizando el estado localmente.

---

**Desarrollado por Jorge Linares**
# Aplicación de Comentarios - Documentación General

## 🚀 Pasos para correr la aplicación

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DEL_REPO>
   cd comentarios-ed-pt
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Levanta la aplicación en modo desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abre tu navegador en:**
   ```
   http://localhost:3000
   ```

5. **(Opcional) Corre Storybook para ver los componentes UI:**
   ```bash
   npm run storybook
   # o
   yarn storybook
   ```

---

## 1. Arquitectura General

La aplicación sigue los principios de **Atomic Design**, **SOLID** y **SRP**, y está construida sobre Next.js con React, Zustand para estado global, y React Query para manejo de datos asíncronos y cache.

### Capas principales:
- **UI (Componentes atómicos, moleculares y contenedores)**
- **Hooks personalizados (lógica de negocio y orquestación)**
- **Stores Zustand (estado global)**
- **Adaptadores de API (simulación de backend)**
- **Feedback visual (snackbar, modales)**

---

## 2. Flujo de la Aplicación

### Inicio (Carga de la página de comentarios)

1. **`CommentsPageContainer`**  
   - Es el contenedor principal de la página de comentarios.
   - Orquesta la obtención de datos, el renderizado de la UI y la delegación de acciones.
   - No contiene lógica de negocio, solo orquesta y pasa props.

2. **Carga de comentarios**
   - Usa el hook `usePaginatedComments` para obtener los comentarios paginados desde la API simulada.
   - Los comentarios locales (creados por el usuario en la sesión actual) se obtienen de `useLocalCommentsStore`.
   - Se combinan ambos arrays para mostrar siempre los comentarios locales arriba.

3. **Optimistic Updates**
   - Antes de renderizar, se aplica `applyOptimisticUpdates` (del store global Zustand) para reflejar en la UI cualquier edición o eliminación pendiente, incluso antes de que el backend responda.

---

### Renderizado de la UI

- **Título y botón "Nuevo comentario"**:  
  - Centrado y estilizado según Atomic Design.
  - El botón abre un modal para crear un nuevo comentario.

- **`CommentGrid`**:  
  - Renderiza la grilla de comentarios usando `CommentCard` para cada uno.
  - Recibe los handlers de edición y eliminación, y el set de IDs en proceso de eliminación.

- **`NewCommentModalContainer`**:  
  - Modal con formulario para crear un comentario.
  - Al enviar, agrega el comentario localmente y dispara la acción de creación en el backend (simulado).

- **`EditCommentModalContainer`**:  
  - Modal para editar un comentario existente.
  - Se abre al hacer clic en editar en cualquier comentario.

- **Feedback visual**:  
  - `FeedbackSnackbar` muestra mensajes de éxito o error para todas las operaciones (crear, editar, eliminar).

---

### Acciones del usuario

#### Crear comentario
- El usuario abre el modal, completa el formulario y envía.
- El comentario aparece instantáneamente en la UI (optimistic update local).
- Se envía al backend simulado en background.
- Si hay error, se muestra feedback.

#### Editar comentario
- El usuario hace clic en editar, se abre el modal con los datos actuales.
- Al guardar, se aplica el cambio en la UI (optimistic update).
- Se envía la edición al backend simulado.
- Si hay error, se revierte el cambio y se muestra feedback.

#### Eliminar comentario
- El usuario hace clic en eliminar.
- El comentario desaparece instantáneamente de la UI (optimistic update).
- Se envía la eliminación al backend simulado.
- Si hay error, se revierte la eliminación y se muestra feedback.

---

### Paginación e Infinite Scroll
- Al llegar al final de la lista, se carga la siguiente página de comentarios desde la API.
- El usuario puede seguir cargando más comentarios sin recargar la página.

---

## 3. Estado global y stores

- **`useLocalCommentsStore`**:  
  - Maneja solo los comentarios creados localmente en la sesión actual.
  - Permite agregar, editar, eliminar y limpiar comentarios locales.

- **`useOptimisticUpdatesStore`**:  
  - Estado global para IDs eliminados y comentarios editados (optimistic updates).
  - Permite marcar/desmarcar eliminados y editados, y aplicar los cambios a cualquier lista de comentarios.

---

## 4. API simulada

- **`CommentsApi`**:  
  - Simula las operaciones CRUD con delays artificiales.
  - No persiste datos realmente, pero permite probar el flujo completo de la UI.

---

## 5. Hooks personalizados

- **`useCommentOperations`**:  
  - Encapsula toda la lógica de negocio de crear, editar, eliminar, feedback y optimistic updates.
  - Expone handlers limpios para que el container solo orqueste.

- **`usePaginatedComments`**:  
  - Encapsula la lógica de paginación y fetch de comentarios desde la API.

---

## 6. Atomic Design

- **Atoms**: Botones, inputs, tipografía, textarea.
- **Molecules**: CommentCard, formularios, modales.
- **Organisms/Containers**: `CommentGrid`, `CommentsPageContainer`.

---

## 7. Principios de diseño y buenas prácticas

- **SRP/SOLID**: Cada módulo tiene una única responsabilidad.
- **Estado global solo donde es necesario** (optimistic updates, comentarios locales).
- **Separación de UI y lógica de negocio**.
- **Feedback visual profesional**.
- **Código limpio, mantenible y escalable**.

---

## 8. ¿Por qué está así?

- **Escalabilidad**: Puedes agregar nuevas features (filtros, orden, etc.) sin romper la arquitectura.
- **Testabilidad**: Los hooks y stores son fácilmente testeables.
- **UX**: El usuario siempre ve feedback inmediato y consistente.
- **Mantenibilidad**: Cualquier cambio en la lógica de negocio o UI se hace en un solo lugar.

---

## 9. Resumen del flujo

1. **Carga inicial**: Se obtienen comentarios paginados y locales, se combinan y se aplican optimistic updates.
2. **Renderizado**: Se muestra la UI con feedback y acciones disponibles.
3. **Acciones del usuario**: Crear, editar, eliminar, paginar.
4. **Optimistic updates**: Cambios inmediatos en la UI, sincronización con backend simulado.
5. **Feedback**: Mensajes claros de éxito o error en cada operación.

---


## 🧠 Decisiones clave de arquitectura y su justificación

### 1. Separación de UI y lógica de negocio
Permite que los componentes de UI sean reutilizables, testeables y fáciles de mantener. La lógica de negocio (operaciones, feedback, optimistic updates) se encapsula en hooks y stores, facilitando cambios futuros y evitando componentes "Dios".

### 2. Uso de Zustand para estado global
Zustand es ligero, fácil de usar y no requiere boilerplate. Permite compartir estado (optimistic updates, comentarios locales) entre cualquier parte de la app sin prop drilling ni contextos anidados. Es ideal para apps modernas que no necesitan la complejidad de Redux.

### 3. Optimistic updates globales
Garantiza que cualquier cambio (edición/eliminación) se refleje instantáneamente en toda la UI, sin importar desde dónde se dispare la acción. Esto mejora la experiencia de usuario y evita inconsistencias visuales.

### 4. Simulación de API y delays artificiales
Permite desarrollar y testear la UI y la lógica de negocio sin depender de un backend real. Los delays simulan la latencia real de red, ayudando a validar el manejo de loaders, optimistic updates y feedback de error.

### 5. Uso de React Query para paginación y cache
React Query maneja el cache, la sincronización y el estado de carga/error de las peticiones, simplificando la lógica de fetch y permitiendo invalidar/actualizar datos fácilmente tras operaciones CRUD.

### 6. Atomic Design
Facilita la reutilización y el mantenimiento de componentes. Permite construir la UI de abajo hacia arriba, asegurando consistencia visual y funcional.

### 7. Feedback visual inmediato
Una UX profesional requiere que el usuario reciba confirmación instantánea de sus acciones (éxito o error). Los snackbars y loaders mejoran la percepción de velocidad y robustez.

### 8. SOLID y SRP en todos los módulos
Hace que el código sea más fácil de entender, testear y escalar. Cada módulo tiene una única responsabilidad, lo que reduce bugs y facilita la colaboración en equipo.

### 9. Combinación de comentarios locales y paginados
Permite que los comentarios creados por el usuario aparezcan siempre arriba, incluso si aún no han sido persistidos en el backend, mejorando la percepción de inmediatez.

### 10. Uso de hooks personalizados
Encapsulan lógica compleja y la hacen reutilizable y testeable. Permiten que los containers sean simples y enfocados solo en la orquestación de la UI.

**En resumen:**
Cada decisión fue tomada para maximizar la escalabilidad, mantenibilidad, experiencia de usuario y facilidad de desarrollo, siguiendo las mejores prácticas modernas de frontend.


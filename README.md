# PRIMEROS PASOS

Una vez inicializado el proyecto con Next.js y todas las dependencias solicitadas, procederé a organizar el proyecto en 6 issues que englobarán los pasos necesarios para llevarlos adelante:

---

## ✅ ISSUE 1: Crear librería de UI agnóstica (`GLOBAL/ui`)

🎯 **Objetivo:** Crear los componentes reutilizables que usarás en toda la app (sin lógica de negocio).

📦 **Carpeta:** `src/GLOBAL/ui/`

📌 **Tareas:**

-   Crear átomos: `Button`, `Heading`, `Text`, `Icon`, etc.
-   Crear moléculas: `CommentCard`, `CommentForm`, etc.
-   Agregar sus respectivos `.stories.tsx` para Storybook.
-   Estilarlos con Tailwind y Material UI (según el diseño).
-   Exportar todo desde `ui/index.ts`.

ESTADO: [pendiente]

---

## Estructura de carpetas planificada

```text
/src
│
├─ GLOBAL/                 # 🔸Librería reutilizable, sin dependencias de negocio
│   ├─ ui/                 #   Componentes UI + Stories
│   ├─ hooks/              #   Hooks genéricos (useDebounce, useMedia)
│   ├─ utils/              #   Helpers genéricos (formatDate, etc.)
│   └─ types/              #   Tipos compartidos (User, ThemeTokens…)
│
├─ modules/                # 🔹Cada dominio de negocio aislado
│   └─ comments/           #   “Módulo Listado” (ejemplo)
│       ├─ pages/          #     Page container(s) del módulo
│       ├─ components/     #     Componentes ONLY de este módulo
│       ├─ hooks/          #     Hooks que hablan con su store / servicios
│       └─ adapters/       #     Adaptadores API, mappers DTO→Domain
│
├─ pages/                  # Next.js routes → importan Page Containers
│   └─ index.tsx
│
└─ styles/                 # tailwind.css, MUI theme, fonts… (global)
```

---

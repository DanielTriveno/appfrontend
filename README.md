# User Profile Management App

Este proyecto es una aplicación de gestión de perfiles de usuario desarrollada como parte de una evaluación técnica. La aplicación proporciona una interfaz de usuario para gestionar los datos del usuario, como el nombre, el nombre de usuario, el correo electrónico, el número de teléfono, la contraseña y la eliminación de la cuenta. La aplicación, creada con React, TypeScript, Tailwind CSS y Axios, sigue las mejores prácticas para el desarrollo de la interfaz de usuario, la gestión de estados y el consumo de API.

## Índice

- [Características](#características)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Introducción](#introducción)
- [Instalación](#instalación)
- [Ejecución de la aplicación](#ejecución-de-la-aplicación)
## Características

- **Descripción general del perfil**: muestra detalles del usuario, como nombre, nombre de usuario, correo electrónico y número de teléfono.
- **Actualizar información**: permite a los usuarios navegar para actualizar su información personal, como nombre, nombre de usuario y número de teléfono.
- **Cambiar contraseña**: proporciona una interfaz segura para actualizar la contraseña del usuario.
- **Diseño adaptable**: interfaz de usuario totalmente adaptable con **Tailwind CSS**, lo que garantiza la compatibilidad entre dispositivos.
- **Navegación fluida**: experiencia de usuario intuitiva con `React Router` para un enrutamiento fluido del lado del cliente.

## Tecnologías utilizadas

- **React**: biblioteca de JavaScript para crear interfaces de usuario.
- **TypeScript**: superconjunto de JavaScript fuertemente tipado para seguridad de tipos.
- **Tailwind CSS**: marco de CSS que prioriza la utilidad para un estilo eficiente.
- **Axios**: cliente HTTP basado en promesas para realizar solicitudes de API.
- **React Router**: para navegar entre diferentes vistas en la aplicación.
- **shadcn/ui**: biblioteca de componentes para acelerar el desarrollo.
- **Vite**: herramienta de creación de frontend rápida para una experiencia de desarrollo de alto rendimiento.

## Introducción

Estas instrucciones le permitirán obtener una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y prueba.

### Requisitos previos

- **Node.js** (v16 o superior) y **npm** instalados en su máquina.
- Una instancia en ejecución del servidor backend. La API está alojada en `http://localhost:5119`.

### Instalación

Clone el repositorio e instale las dependencias:

```bash
git clone https://github.com/DanielTriveno/appfrontend.git
cd appfrontend
npm install
```

## Ejecución de la Aplicación

Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```


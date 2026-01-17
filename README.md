# 📸 Portafolio Fotográfico - Alejandra Balbontín

<div align="center">

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**Sitio web profesional de portafolio fotográfico con galerías interactivas y formulario de contacto**

[Ver Demo](#) • [Reportar Bug](https://github.com/bagxxi/portafolio-foto/issues) • [Solicitar Feature](https://github.com/bagxxi/portafolio-foto/issues)

</div>

---

## ✨ Características

- 🎨 **Diseño Minimalista y Elegante** - Interfaz limpia que destaca la fotografía
- 🖼️ **Galerías Interactivas** - Scroll horizontal fluido con navegación intuitiva
- 📱 **Totalmente Responsive** - Optimizado para desktop, tablet y móvil
- ⚡ **Alto Rendimiento** - Construido con Astro para máxima velocidad
- 📧 **Formulario de Contacto** - Integración con servicio de email
- 🔒 **Seguridad** - Email de contacto protegido con encoding y variables de entorno
- 🌐 **SEO Optimizado** - Meta tags y estructura semántica

## 🚀 Demo

Visita el sitio en vivo: [alejandrabalbontin.cl](#)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## 🛠️ Tecnologías

Este proyecto está construido con:

- **[Astro](https://astro.build/)** - Framework web moderno para sitios rápidos
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript con tipos estáticos
- **[Resend](https://resend.com/)** - Servicio de email para el formulario de contacto
- **CSS3** - Estilos personalizados con animaciones y transiciones

## 📦 Instalación

### Prerrequisitos

- Node.js 18.0 o superior
- npm o yarn

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/bagxxi/portafolio-foto.git
cd portafolio-foto/beneficial-belt
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Email de contacto (codificado en base64)
CONTACT_EMAIL_ENCODED=Y29udGFjdG9AYWxlamFuZHJhYmFsYm9udGluLmNs

# API Key de Resend (opcional, para envío de emails)
RESEND_API_KEY=tu_api_key_aqui
```

4. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## ⚙️ Configuración

### Configurar Servicio de Email

Para que el formulario de contacto funcione, necesitas configurar un servicio de email:

#### Opción 1: Resend (Recomendado)

1. Crea una cuenta en [Resend](https://resend.com/)
2. Obtén tu API key
3. Agrégala al archivo `.env`:

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

4. El código ya está configurado en `src/pages/api/contact.ts`

#### Opción 2: Otros servicios

También puedes usar SendGrid, Nodemailer u otro servicio. Consulta la documentación en el código.

### Agregar Imágenes

Coloca tus fotografías en las siguientes carpetas:

```
public/images/
├── portraits/     # Imágenes para la galería "Fotografía a Color"
├── bw/           # Imágenes para la galería "Blanco y Negro"
└── hero/         # Imagen principal de la página Info & Contacto
```

**Formatos recomendados:** JPG, WebP  
**Tamaño recomendado:** Máximo 2000px de ancho para optimizar rendimiento

## 🎯 Uso

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye el sitio para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run astro` | Ejecuta comandos de Astro CLI |

### Personalización

#### Cambiar Información Personal

Edita los archivos en `src/pages/`:
- `index.astro` - Página principal
- `blanco-y-negro.astro` - Galería blanco y negro
- `info-contacto.astro` - Página de información y contacto

#### Modificar Estilos

Los estilos globales están en `src/layouts/Layout.astro`. Puedes personalizar:
- Colores
- Tipografía
- Espaciados
- Animaciones

## 📁 Estructura del Proyecto

```
beneficial-belt/
├── public/
│   └── images/              # Imágenes estáticas
│       ├── portraits/       # Galería a color
│       ├── bw/             # Galería blanco y negro
│       └── hero/           # Imagen hero
├── src/
│   ├── layouts/
│   │   └── Layout.astro    # Layout principal del sitio
│   ├── pages/
│   │   ├── index.astro     # Página principal (Fotografía a Color)
│   │   ├── blanco-y-negro.astro  # Galería blanco y negro
│   │   ├── info-contacto.astro   # Info y contacto
│   │   └── api/
│   │       └── contact.ts  # API endpoint para formulario
│   └── env.d.ts           # Tipos de TypeScript
├── .env                    # Variables de entorno (no versionado)
├── .gitignore             # Archivos ignorados por Git
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias del proyecto
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Este archivo
```

## 🌐 Despliegue

Este sitio puede ser desplegado en múltiples plataformas:

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bagxxi/portafolio-foto)

```bash
npm install -g vercel
vercel
```

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bagxxi/portafolio-foto)

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Otras Opciones

- **GitHub Pages** - Hosting gratuito de GitHub
- **Cloudflare Pages** - CDN global con hosting
- **AWS Amplify** - Plataforma de AWS

**⚠️ Importante:** No olvides configurar las variables de entorno en tu plataforma de despliegue.

## 🔒 Seguridad

El email de contacto está protegido mediante:

1. **Encoding Base64** en variables de entorno
2. **Procesamiento server-side** a través de API endpoint
3. **No exposición** en el código del cliente

El email nunca aparece en:
- ✅ Código JavaScript del cliente
- ✅ HTML renderizado
- ✅ Código fuente público

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

© 2026 Alejandra Balbontín. Todos los derechos reservados.

Este proyecto es de uso privado. El código está disponible para referencia, pero las fotografías y el contenido son propiedad de Alejandra Balbontín.

---

<div align="center">

**Desarrollado con ❤️ usando Astro**

[⬆ Volver arriba](#-portafolio-fotográfico---alejandra-balbontín)

</div>

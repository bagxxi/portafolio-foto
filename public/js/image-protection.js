// Protecciones de seguridad para imágenes del portafolio
// Este script previene el robo de imágenes mediante múltiples capas de protección

(function () {
    'use strict';

    // Protección 1: Prevenir teclas de desarrollador
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I (Inspector)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+C (Selector de elementos)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }

        // Ctrl+U (Ver código fuente)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+S (Guardar página)
        if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            return false;
        }
    });

    // Protección 2: Prevenir click derecho en todo el documento
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Protección 3: Prevenir selección de texto en imágenes
    document.addEventListener('selectstart', function (e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'PICTURE') {
            e.preventDefault();
            return false;
        }
    });

    // Protección 4: Prevenir drag and drop de imágenes
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Protección 5: Deshabilitar copiar imágenes con Ctrl+C
    document.addEventListener('copy', function (e) {
        const selection = window.getSelection();
        if (selection && selection.toString().length === 0) {
            e.preventDefault();
            return false;
        }
    });

    // Protección 6: Agregar marca de agua invisible mediante CSS
    const style = document.createElement('style');
    style.textContent = `
        img::after {
            content: "© Alejandra Balbontín";
            position: absolute;
            bottom: 10px;
            right: 10px;
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Protección 7: Detectar si DevTools está abierto (método básico)
    // NOTA: Esto está comentado porque puede ser molesto para el desarrollo
    /*
    const devToolsCheck = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            console.clear();
            console.log('%c¡Detente!', 'color: red; font-size: 60px; font-weight: bold;');
            console.log('%cEsta es una función del navegador destinada a desarrolladores.', 'font-size: 18px;');
            console.log('%cSi alguien te dijo que copiaras y pegaras algo aquí, es un fraude.', 'font-size: 18px;');
        }
    };
    
    setInterval(devToolsCheck, 1000);
    */

    // Protección 8: Mensaje de advertencia en consola
    console.log('%c¡ADVERTENCIA!', 'color: red; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px black;');
    console.log('%cLas imágenes de este sitio están protegidas por derechos de autor.', 'font-size: 16px; color: #ff6b6b;');
    console.log('%cEl uso no autorizado está prohibido y puede tener consecuencias legales.', 'font-size: 16px; color: #ff6b6b;');
    console.log('%c© 2026 Alejandra Balbontín - Todos los derechos reservados', 'font-size: 14px; color: #999;');

})();

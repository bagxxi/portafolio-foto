import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración
const IMAGE_DIRS = [
    join(__dirname, '../public/images/portraits'),
    join(__dirname, '../public/images/bw'),
    join(__dirname, '../public/images/hero')
];

const QUALITY = 85; // Calidad para JPG optimizado (80-90 es ideal)
const WEBP_QUALITY = 85; // Calidad para WebP (85-90 es ideal)

async function optimizeImage(imagePath) {
    const ext = extname(imagePath).toLowerCase();

    // Solo procesar JPG y PNG
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        return;
    }

    try {
        const image = sharp(imagePath);
        const metadata = await image.metadata();

        console.log(`Procesando: ${imagePath}`);
        console.log(`  Tamaño original: ${metadata.width}x${metadata.height}`);

        // Optimizar JPG original
        const optimizedJpgPath = imagePath.replace(ext, '.optimized.jpg');
        await image
            .jpeg({
                quality: QUALITY,
                progressive: true,
                mozjpeg: true
            })
            .toFile(optimizedJpgPath);

        // Crear versión WebP
        const webpPath = imagePath.replace(ext, '.webp');
        await sharp(imagePath)
            .webp({
                quality: WEBP_QUALITY,
                effort: 6 // 0-6, mayor = mejor compresión pero más lento
            })
            .toFile(webpPath);

        // Obtener tamaños de archivo
        const originalStats = await stat(imagePath);
        const optimizedStats = await stat(optimizedJpgPath);
        const webpStats = await stat(webpPath);

        const originalSize = (originalStats.size / 1024).toFixed(2);
        const optimizedSize = (optimizedStats.size / 1024).toFixed(2);
        const webpSize = (webpStats.size / 1024).toFixed(2);
        const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
        const webpSavings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);

        console.log(`  Original: ${originalSize} KB`);
        console.log(`  Optimizado JPG: ${optimizedSize} KB (${savings}% reducción)`);
        console.log(`  WebP: ${webpSize} KB (${webpSavings}% reducción)`);
        console.log('');

    } catch (error) {
        console.error(`Error procesando ${imagePath}:`, error.message);
    }
}

async function processDirectory(dirPath) {
    try {
        const files = await readdir(dirPath);

        for (const file of files) {
            const filePath = join(dirPath, file);
            const stats = await stat(filePath);

            if (stats.isFile()) {
                await optimizeImage(filePath);
            }
        }
    } catch (error) {
        console.error(`Error procesando directorio ${dirPath}:`, error.message);
    }
}

async function main() {
    console.log('🖼️  Optimizador de Imágenes para Portafolio\n');
    console.log('Este script creará versiones optimizadas de tus imágenes:');
    console.log('- .optimized.jpg (JPG optimizado)');
    console.log('- .webp (formato WebP moderno)\n');

    for (const dir of IMAGE_DIRS) {
        console.log(`📁 Procesando: ${dir}\n`);
        await processDirectory(dir);
    }

    console.log('✅ Optimización completada!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Revisa las imágenes optimizadas');
    console.log('2. Si estás satisfecho, reemplaza las originales con las .optimized.jpg');
    console.log('3. Las versiones .webp se usarán automáticamente en navegadores compatibles');
}

main();

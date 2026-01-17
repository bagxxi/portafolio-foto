import { readdir, rename } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGE_DIRS = [
    join(__dirname, '../public/images/portraits'),
    join(__dirname, '../public/images/bw'),
    join(__dirname, '../public/images/hero')
];

async function replaceOptimizedImages(dirPath) {
    try {
        const files = await readdir(dirPath);
        let count = 0;

        for (const file of files) {
            if (file.endsWith('.optimized.jpg')) {
                const oldPath = join(dirPath, file);
                const newPath = join(dirPath, file.replace('.optimized.jpg', '.jpg'));

                await rename(oldPath, newPath);
                console.log(`✅ Reemplazado: ${file} → ${file.replace('.optimized.jpg', '.jpg')}`);
                count++;
            }
        }

        return count;
    } catch (error) {
        console.error(`Error procesando ${dirPath}:`, error.message);
        return 0;
    }
}

async function main() {
    console.log('🔄 Reemplazando imágenes optimizadas...\n');

    let totalReplaced = 0;

    for (const dir of IMAGE_DIRS) {
        console.log(`📁 Procesando: ${dir}`);
        const count = await replaceOptimizedImages(dir);
        totalReplaced += count;
        console.log('');
    }

    if (totalReplaced > 0) {
        console.log(`✅ Se reemplazaron ${totalReplaced} imágenes exitosamente!`);
        console.log('\n⚠️  IMPORTANTE: Las imágenes originales fueron sobrescritas.');
        console.log('Asegúrate de tener una copia de respaldo si las necesitas.');
    } else {
        console.log('ℹ️  No se encontraron imágenes .optimized.jpg para reemplazar.');
        console.log('Ejecuta primero: npm run optimize-images');
    }
}

main();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function archidraftPostBuildPlugin() {
  return {
    name: 'archidraft-post-build',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist-archidraft');
      
      // 1. Ensure dist-archidraft/index.html is created from archidraft.html
      const generatedHtml = path.join(outDir, 'archidraft.html');
      const targetIndexHtml = path.join(outDir, 'index.html');
      if (fs.existsSync(generatedHtml)) {
        fs.copyFileSync(generatedHtml, targetIndexHtml);
      }

      // 2. Ensure dedicated robots.txt is in dist-archidraft
      const robotsSrc = path.resolve(__dirname, 'public/robots.archidraft.txt');
      const robotsDest = path.join(outDir, 'robots.txt');
      if (fs.existsSync(robotsSrc)) {
        fs.copyFileSync(robotsSrc, robotsDest);
      }

      // 3. Ensure dedicated sitemap.xml is in dist-archidraft
      const sitemapSrc = path.resolve(__dirname, 'public/sitemap.archidraft.xml');
      const sitemapDest = path.join(outDir, 'sitemap.xml');
      if (fs.existsSync(sitemapSrc)) {
        fs.copyFileSync(sitemapSrc, sitemapDest);
      }
    }
  };
}

export default defineConfig({
  appType: 'spa',
  plugins: [react(), archidraftPostBuildPlugin()],
  base: '/',
  build: {
    outDir: 'dist-archidraft',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        archidraft: path.resolve(__dirname, 'archidraft.html')
      },
      output: {
        manualChunks: {
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});

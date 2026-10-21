import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { Agent } from "node:http";
// Singleton agent for HTTP connection pooling to the local server
var proxyAgent = new Agent({ keepAlive: true, maxSockets: 100 });
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        // Built-in Vite proxy preserves the full request path, so `/api/label-types`
        // is forwarded to http://127.0.0.1:5000/api/label-types.
        // The old `http-proxy-middleware` plugin stripped the `/api` prefix,
        // causing the server to receive `/label-types` and return 404.
        proxy: {
            "/api": {
                target: "http://127.0.0.1:5000",
                changeOrigin: true,
                agent: proxyAgent,
            },
        },
    },
});

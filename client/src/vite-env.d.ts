/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the backend API in production (e.g. https://your-server.vercel.app/api).
   *  Unset in dev, where Vite proxies "/api" to the local server. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

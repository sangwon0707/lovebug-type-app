/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  glob: (pattern: string, options?: { eager?: boolean; as?: string }) => Record<string, string>;
}
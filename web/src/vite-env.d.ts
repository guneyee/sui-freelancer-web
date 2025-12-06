declare global {
  interface ImportMetaEnv {
    readonly VITE_SUI_RPC_URL: string
    readonly VITE_SUI_NETWORK: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}

/// <reference types="vite/client" />

declare module '*.css' {
    const content: Record<string, string>
    export default content
}

interface ImportMetaEnv {
    readonly VITE_BUILDER_API_KEY: string
    readonly VITE_DAM_URL: string
    readonly VITE_SEARCH_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['dist/'],
    },
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        files: ['**/*.{js,mjs,mts}'],
        ...tseslint.configs.disableTypeChecked,
    },
    pluginReact.configs.flat.recommended,
    {
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        plugins: {
            'react-hooks': pluginReactHooks,
        },
        rules: pluginReactHooks.configs.recommended.rules,
    },
    {
        rules: {
            'react-hooks/exhaustive-deps': 'error',
        },
    },
]

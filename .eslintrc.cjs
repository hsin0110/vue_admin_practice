module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    // 規則繼承
    "extends": [
        // 全部規則默認是關閉的，這個配置項開啟推薦規則
        // 比如：函數不能重名、對象不能出現重複 key
        "eslint:recommended",
        // ts 語法規則
        "plugin:@typescript-eslint/recommended",
        // vue3 語法規則
        "plugin:vue/vue3-essential"
    ],
    // 為特定類型的文件指定處理器
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        // 指定解析器
        // Esprima 默認解析器
        // Babel-
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    /*
     * "off" 或 0 ==> 關閉規則
     * "warn" 或 1 ==> 打開的規則作為警告 (不影響代碼執行)
     * "error" 或 2 ==> 規則作為一個錯誤 (代碼不能執行，介面報錯)
    */
    "rules": {
        // eslint (https://eslint.bootcss.com/docs/rules/)
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允許多個空行
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unexpected-multiline': 'error', // 禁止空餘多行
        'no-useless-escape': 'off', // 禁止不必要的轉文字符

        // typescript (https://typescript-eslint.io/rules/)
        '@typescript-eslint/no-unsaved-vars': 'error', // 禁止定義未使用的變量
        '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 類型
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-namespace': 'off', // 禁止使用自定義 typescript 模塊和
        '@typescript-eslint/semi': 'off',

        // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
        'vue/multi-word-component-names': 'off', // 要求組件名稱始終為"-"連接的單詞
        'vue/script-setup-uses-vars': 'off', // 防止<script setup>使用的變量<template
        'vue/no-mutating-props': 'off', // 不允許組件 prop 的改變
        'vue/attribute-hyphenation': 'off', // 對模塊中的自定義組件強制執行屬性命名樣式
    }
}

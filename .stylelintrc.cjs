// @see https://stylelint.bootcss.com/
module.exports = {
  extends: [
    'stylelint-config-standard', // 配置 stylelint 拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 樣式格式化
    'stylelint-config-standard-scss', // 配置 stylelint scss 插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 樣式格式化
    'stylelint-config-recess-order', // 配置 stylelint css 屬性縮寫順序插件
    'stylelint-config-prettier', // 配置 stylelint 和 prettier 兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    }
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /** 
   * always => 必須
  */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不報錯
    'no-descending-specificity': null, // 禁止在具有較高優先級的選擇器後出現被其覆蓋的較低優先級的選擇器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引號"always(必須加上引號)"|"never(沒有引號)"
    'no-empty-source': null, // 關閉禁止空源碼
    'selector-class-pattern': null, // 關閉強制選擇器類名的格式
    'property-no-unknown': null, // 禁止未知的屬性(true 為不允許)
    'block-opening-brace-space-before': 'always', // 大括號之前必須有一個空格或不能有空白符
    'value-no-vendor-prefix': null, // 關閉屬性值前綴 --webkit-box
    'property-no-vendor-prefix': null, // 關閉屬性前綴 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允許未知的選擇器
      true,
      {
        ignorePseudoClass: ['global', 'v-deep', 'deep'], // 忽略屬性，修改 element 默認樣式的時候能使用到
      }
    ]
  }
}
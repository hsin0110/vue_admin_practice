module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校驗規則
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新特性、新功能
        'fix', // 修改 bug
        'docs', // 文檔修改
        'style', // 代碼格式修改，注意不是 css 修改
        'refactor', // 代碼重構
        'perf', // 優化相關，比如提升性能、體驗
        'test', // 測試用例修改
        'chore', // 其他修改，比如改變建構流程或者增加依賴庫、工具等
        'revert', // 回退到上一個版本
        'build', // 編譯相關的修改，例如發布版本、對項目建構或依賴的改動
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
}
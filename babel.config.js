// element ui 按需引用
module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {'modules': false}]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    // "extends": "eslint:recommended",
    // 使用的扩展库
    // "extends": "airbnb",
    // 解析器用于解析代码
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // "indent": [
        //     "error",
        //     "tab"
        // ],
        // "linebreak-style": [
        //     "error",
        //     "unix"
        // ],
        // "quotes": [
        //     "error",
        //     "single"
        // ],
        // "semi": [
        //     "error",
        //     "always"
        // ]
    }
};
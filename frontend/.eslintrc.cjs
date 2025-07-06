const { version } = require("react");

module.exports = {
    env:{
        browser: true,
        es2021: true
    },
    extends:[
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier'
    ],
    parserOptions:{
        ecmaVersion:2021,
        sourceType:'module',

    },
    plugins: ['react','jsx-a11y'],
    rules:{
        'react/react-in-jsx-scope':'off',
    },
    settings:{
        react:{
            version:'detect',
        }
    }
}
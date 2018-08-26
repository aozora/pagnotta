// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  "plugins": [
  ],
  extends: ['airbnb-base'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never'
    }],
    'comma-dangle': [2, 'never'],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': ['off'],
    'padded-blocks': ['off'],
    'max-len': ['off'],
    'semi': ["error", "always"]
  }
}

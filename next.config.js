const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en'
  }
})

// eslint-disable-next-line import/no-extraneous-dependencies
const { useBabelRc, useEslintRc, override } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  useEslintRc(),
);

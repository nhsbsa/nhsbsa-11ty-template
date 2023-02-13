const nhsbsaEleventy = require("./lib/nhsbsa-11ty")

module.exports = function(eleventyConfig) {
  let result = nhsbsaEleventy({
    dir: {
      input: "src2",
      includes: "_includes",
      layouts: "_layouts"
    }
  }).configure(eleventyConfig);

  eleventyConfig.addPlugin(require('eleventy-plugin-toc'), {
    tags: ['h2'],
    wrapper: 'div'
});
  return result;

};

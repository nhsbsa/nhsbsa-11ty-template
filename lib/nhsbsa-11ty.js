
function defaultConfiguration(eleventyConfig, options) {

    // Libraries
    eleventyConfig.setLibrary('njk', require('./_libraries/nunjucks')(options));
    eleventyConfig.setLibrary('md', require('./_libraries/markdown'));

    // Plugins
    eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
    eleventyConfig.addPlugin(require('eleventy-plugin-toc'), {
        tags: ['h2', 'h3'],
        wrapper: 'div'
    });
    eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
        watch: ['_stylesheets/*.{scss,sass}'],
        outputDir: "_site/stylesheets"
    });

    // Filters
    eleventyConfig.addFilter('date', require('./_filters/date'))
    eleventyConfig.addFilter('fixed', require('./_filters/fixed'))
    eleventyConfig.addFilter('includes', require('./_filters/includes'))
    eleventyConfig.addFilter('markdown', require('./_filters/markdown'))
    eleventyConfig.addFilter('pretty', require('./_filters/pretty'))
    eleventyConfig.addFilter('slug', require('./_filters/slug'))
    eleventyConfig.addFilter('sort', require('./_filters/sort'))
    eleventyConfig.addFilter('tokenize', require('./_filters/tokenize'))
    eleventyConfig.addFilter('totalFromRows', require('./_filters/total-from-rows'))
    eleventyConfig.addFilter('widont', require('./_filters/widont'))

    // Passthrough Copy
    eleventyConfig.addPassthroughCopy({ "_javascripts": "/javascripts" });
    eleventyConfig.addPassthroughCopy({ "node_modules/nhsuk-frontend/packages/assets": "/" });
    eleventyConfig.addPassthroughCopy({ "node_modules/nhsuk-frontend/packages/*.js": "/javascripts" });
}

function defaultOptions(options) {
    let defaults = {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_layouts"
        },
        markdownTemplateEngine: "njk",
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: "njk"
    };
    return Object.assign({}, defaults, options);
}

module.exports = function (options = {}) {
    let mergedOptions = defaultOptions(options);
    let configurer = {
        configure: function (eleventyConfig) {
            defaultConfiguration(eleventyConfig, mergedOptions);
            return options;
        }
    }
    return configurer;
}
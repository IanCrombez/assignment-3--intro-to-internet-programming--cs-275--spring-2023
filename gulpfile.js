const { src, dest, series, watch } = require(`gulp`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload,
    CSSLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    htmlCompressor = require(`gulp-htmlmin`),
    jsCompressor = require(`gulp-uglify`),
    sass = require(`gulp-sass`)(require(`sass`)),
    babel = require(`gulp-babel`);

let browserChoice = `default`;

let lintCSS = () => {
    return src(`styles/css/**/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let compressHTML = () => {
    return src([`*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compileCSSForProd = () => {
    return src(`styles/main.css`)
        .pipe(sass.sync({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/styles`));
};

let transpileJSForProd = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `img*/*.jpg`,       // Source all jpg images,
        `img*/*.svg`,       // and all svg images,
        `json*/*.json`,     // and all .json,
        `styles*/reset.css`,    // and the one .css,
    ], {dot: true})
        .pipe(dest(`prod`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
            ]
        }
    });

    watch(`scripts/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`styles/*.css`, series(lintCSS, copyUnprocessedAssetsForDev))
        .on(`change`, reload);

};

let compileCSSForDev = () => {
    return src(`dev/styles/scss/main.scss`)
        .pipe(sass.sync({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`temp/styles`));
};
let copyUnprocessedAssetsForDev = () => {
    return src([
        `img*/*.jpg`,       // Source all jpg images,
        `img*/*.svg`,       // and all svg images,
        `json*/*.json`,     // and all .json,
        `styles*/*.css`,    // and all .css,
        `index.html`        // and index.html
    ], {dot: true})
        .pipe(dest(`temp`));
};


//dev
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.compileCSSForDev = compileCSSForDev;
//prod
exports.compressHTML = compressHTML;
exports.compileCSSForProd = compileCSSForProd;
exports.transpileJSForProd = transpileJSForProd;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
//dev
exports.default = series(
    lintCSS,
    lintJS,
    copyUnprocessedAssetsForDev,
    transpileJSForDev,
    serve

);
//prod
exports.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);

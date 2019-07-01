module.exports = {
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/views/js/dist/",
        filename: "bundle.js"
    },
    module: {
        rules: [ {  test: /\.js$/ } ]
    },
}

const Path = require("path");

module.exports = {
    entry : "./test.js",
    mode : "development",
    output : {
        filename : "main.js",
        path : Path.join(__dirname, "dist")
    },
    module : {
        rules : [
            {
                test : /\.ts$/,
                use : "ts-loader",
                exclude : /node_modules/
            }
        ]
    }
}
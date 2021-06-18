const Path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
    entry : "./index.ts",
    mode : "development",
    devtool : "cheap-source-map",
    resolve : {
        extensions : [ '.tsx', '.ts', '.js']
    },
   
    module : {
        rules : [
            {
                test : /\.ts$/,
                use : "ts-loader",
                exclude : /node_modules/
            }
        ]
    },
    output : {
        filename : "raxSearch.dev.js",
        path : Path.join(__dirname, "raxSearch"),
        library : {
            name : "raxSearch",
            type : "umd"
        },
        globalObject : "this"
    }
}

module.exports = config;
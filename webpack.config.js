const Path = require("path");

module.exports = {
    entry : "./test.ts",
    mode : "development",
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
        filename : "index.js",
        path : Path.join(__dirname, "dist")
    }
}
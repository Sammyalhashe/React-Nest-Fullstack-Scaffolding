const path = require("path");
const webpack = require("webpack");
// https://github.com/elsassph/react-hot-ts/tree/master/
const rhTransformer = require('react-hot-ts/lib/transformer');

const config = (env = process.env.NODE_ENV || "development") => {
    return {
        mode: env,
        target: "web",
        entry: [
            "@babel/polyfill",
            "webpack-hot-middleware/client",
            "./src/renderers/dom.tsx",
        ],
        resolve: {
            /* this tells webpack to look to these directories when resolving 'require' statements */
            modules: [path.resolve("./src"), path.resolve("./node_modules")],
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "bundle.js",
        },
        // enable sourcemaps for debuging webpacks output
        devtool: "source-map",
        devServer: {
            // Can be omitted unless you are using 'docker'
            host: "0.0.0.0",
            publicPath: "/public/",
            contentBase: path.resolve(__dirname, "./views"),
            watchContentBase: true,
            compress: true,
            hot: true,
            port: 3001,
            proxy: [
                {
                    // allows redirect of requests to webpack-dev-server to another destination
                    context: "/api",
                    target: "http://localhost:3000", // server and port to redirect to
                    secure: false,
                },
            ],
            overlay: {
                // Shows a full-screen overlay in the browser when there are compiler errors or warnings
                warnings: false, // defaults to false
                errors: false, // defaults to false
            },
        },
        module: {
            rules: [
                // {
                //     test: /\.(js|jsx)$/,
                //     exclude: /node_modules/,
                //     use: "babel-loader",
                // },
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                {
                    test: /\.tsx?$/,
                    // exclude: [/node_modules/, /test/],
                    use: {
                        loader: "awesome-typescript-loader",
                        options: {
                        // enable TS transformation
                    getCustomTransformers: {
                        before: [ rhTransformer() ]
                    },
                            reportFiles: [
                                "src/**/*.{ts,tsx}",
                                "src/*.{ts,tsx}",
                            ],
                        },
                    },
                },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                {
                    enforce: "pre",
                    test: /\.js$/,
                    exclude: [/node_modules/, /test/],
                    loader: "source-map-loader",
                },
            ],
        },
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
        },
    };
};

module.exports = config();

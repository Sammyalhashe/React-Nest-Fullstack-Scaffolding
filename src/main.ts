import { NestFactory } from "@nestjs/core";
import * as express from "express";
import * as path from "path";
import * as webpack from "webpack";
import * as webpackDevMiddleWare from "webpack-dev-middleware";
import * as webpackHotMiddleWare from "webpack-hot-middleware";
import { AppModule } from "./app.module";
import { config } from "./config";
const webpackConfig = require("../webpack.config.js");
const compiler = webpack(webpackConfig);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        webpackDevMiddleWare(compiler, {
            publicPath: webpackConfig.output.publicPath,
        }),
    );
    app.use(webpackHotMiddleWare(compiler));
    // by default looks for 'views'
    app.setViewEngine("pug");
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(express.static(path.join(__dirname, "../assets")));
    app.enableCors();
    await app.listen(config.port, () => {
        console.log(`Nest App listening on port ${config.port}`);
    });
}
bootstrap();

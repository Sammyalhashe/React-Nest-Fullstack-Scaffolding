import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from "./app.service";
import { serverRender } from "./renderers/server";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render("index")
    async getHello() {
        const initialContent = await serverRender();
        return {
            ...initialContent,
        };
    }
}

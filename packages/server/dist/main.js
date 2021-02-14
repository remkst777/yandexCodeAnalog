"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const PORT = process.env.PORT || 9998;
(async function () {
    const app = await core_1.NestFactory.create(app_module_1.default);
    await app.listen(PORT);
})();
//# sourceMappingURL=main.js.map
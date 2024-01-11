"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function runServer(app) {
    return __awaiter(this, void 0, void 0, function* () {
        process.on("unhandledRejection", (reason, p) => console.error("Unhandled Rejection at: Promise ", reason));
        console.info(`Configuring HTTP server with at port ${3000}`);
        yield app.listen(3000);
        console.info("Server started listening");
    });
}
exports.default = runServer;

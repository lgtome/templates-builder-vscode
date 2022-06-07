"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const vscode_1 = require("vscode");
class LoggerService {
    constructor() {
        this.channel = vscode_1.window.createOutputChannel('TB');
    }
    logMessage(message) {
        const date = new Date().toLocaleTimeString();
        this.channel.appendLine(`${date} - ${message}`);
    }
}
exports.LoggerService = LoggerService;
//# sourceMappingURL=Logger.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const util_1 = require("util");
const vscode_1 = require("vscode");
class TemplateService {
    constructor(Logger) {
        this.Logger = Logger;
    }
    async writeConfigFile(folder) {
        const settings = {
            entry: 'src',
            adjustVars: ['index'],
            framework: 'react',
        };
        vscode_1.window.showInformationMessage(folder.toString() || 'hello');
        const outputPath = vscode_1.Uri.joinPath(folder, 'tb.config.json');
        this.Logger.logMessage('Writing tb.config.json file ...');
        await vscode_1.workspace.fs.writeFile(outputPath, new util_1.TextEncoder().encode(JSON.stringify(settings, null, 2)));
    }
}
exports.TemplateService = TemplateService;
//# sourceMappingURL=TemplateService.js.map
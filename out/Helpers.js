"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configBuilder = void 0;
const vscode_1 = require("vscode");
function configBuilder(templateService) {
    return async () => {
        const folderResult = await vscode_1.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
        });
        if (folderResult && folderResult.length === 1) {
            const folderUri = folderResult[0];
            await templateService.writeConfigFile(folderUri);
        }
    };
}
exports.configBuilder = configBuilder;
//# sourceMappingURL=Helpers.js.map
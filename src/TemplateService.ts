import { TextEncoder } from 'util'
import { Uri, window, workspace } from 'vscode'
import { LoggerService } from './Logger'

export class TemplateService {
    constructor(private Logger: LoggerService) {}

    async writeConfigFile(folder: Uri) {
        const settings = {
            entry: 'src',
            adjustVars: ['index'],
            framework: 'react',
        }
        window.showInformationMessage(folder.toString() || 'hello')
        const outputPath = Uri.joinPath(folder, 'tb.config.json')
        this.Logger.logMessage('Writing tb.config.json file ...')
        await workspace.fs.writeFile(
            outputPath,
            new TextEncoder().encode(JSON.stringify(settings, null, 2))
        )
    }
}

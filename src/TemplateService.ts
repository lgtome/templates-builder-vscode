import { TextEncoder } from 'util'
import { Uri, window, workspace } from 'vscode'
import { LoggerService } from './Logger'

export class TemplateService {
    Encoder: TextEncoder
    constructor(private Logger: LoggerService) {
        this.Encoder = new TextEncoder()
    }
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
            this.Encoder.encode(JSON.stringify(settings, null, 2))
        )
    }

    async writeTemplateFile(files: string[] | undefined, directory: Uri) {
        if (!files) {
            return window.showInformationMessage('hoho')
        }
        const templateFile = this.constructTemplateFromConfig(files)
        const templateDirectory = Uri.joinPath(directory, 'templates')
        const templateFileDirectory = Uri.joinPath(templateDirectory, 'tb.js')
        await workspace.fs.createDirectory(templateDirectory)
        this.Logger.logMessage('Writing templates folder ...')
        await workspace.fs.writeFile(
            templateFileDirectory,
            this.Encoder.encode(templateFile)
        )
        this.Logger.signedInfoLog(
            'Template directory was created successfully!'
        )
    }

    private constructTemplateFromConfig(items: string[]): string {
        return items.reduce((acc, item) => {
            return acc
                .concat(`export const ${item} = 'your_template_here'`)
                .concat('\n')
        }, '')
    }
}

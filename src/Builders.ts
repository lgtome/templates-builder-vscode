import * as vscode from 'vscode'
import { configFiles } from './constants'
import { LoggerService } from './Logger'
import { TemplateService } from './TemplateService'
import { ConfigType } from './types'

export function configBuilder(templateService: TemplateService) {
    return async () => {
        const folderResult = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
        })
        if (folderResult && folderResult.length === 1) {
            const folderUri = folderResult[0]
            await templateService.writeConfigFile(folderUri)
        }
    }
}
export function templateBuilder(
    templateService: TemplateService,
    logger: LoggerService
) {
    return async () => {
        if (vscode.workspace.workspaceFolders !== undefined) {
            let directoryPath = vscode.workspace.workspaceFolders[0].uri

            const configPath = await configFiles.reduce(async (acc, config) => {
                const path = vscode.Uri.joinPath(directoryPath, config)
                try {
                    await vscode.workspace.fs.stat(path)
                    return path
                } catch {
                    return acc
                }
            }, <Promise<vscode.Uri | {}>>{})
            try {
                if ('fragment' in configPath) {
                    const folderResult = await vscode.workspace.fs.readFile(
                        configPath
                    )

                    const { adjustVars } = JSON.parse(
                        folderResult.toString() || '{}'
                    ) as ConfigType
                    if (!adjustVars) {
                        return logger.signedInfoLog(
                            'Config file not found or empty'
                        )
                    }
                    await templateService.writeTemplateFile(
                        adjustVars,
                        directoryPath
                    )
                } else {
                    logger.signedInfoLog('config file not found')
                }
            } catch (err: unknown) {
                const error = err as Error
                return logger.signedErrorLog(
                    'Something went wrong',
                    error.toString()
                )
            }
        } else {
            logger.signedErrorLog(
                'Working folder not found, open a folder an try again'
            )
        }
    }
}

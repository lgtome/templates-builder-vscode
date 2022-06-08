import { window } from 'vscode'

export class LoggerService {
    private channel = window.createOutputChannel('TB')

    public logMessage(message: string) {
        const date = new Date().toLocaleTimeString()

        this.channel.appendLine(`${date} - ${message}`)
    }

    public signedInfoLog(message: string, ...messages: string[]) {
        window.showInformationMessage(
            `Templates Builder: ${message}`,
            ...messages
        )
    }
    public signedErrorLog(message: string, ...messages: string[]) {
        window.showErrorMessage(`Templates Builder: ${message}`, ...messages)
    }
}

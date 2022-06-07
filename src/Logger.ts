import { window } from 'vscode'

export class LoggerService {
    private channel = window.createOutputChannel('TB')
    public logMessage(message: string) {
        const date = new Date().toLocaleTimeString()

        this.channel.appendLine(`${date} - ${message}`)
    }
}

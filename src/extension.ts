// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { configBuilder, templateBuilder } from './Builders'
import { LoggerService } from './Logger'
import { TemplateService } from './TemplateService'

export function activate(context: vscode.ExtensionContext) {
    const loggerInstance = new LoggerService()
    const templateInstance = new TemplateService(loggerInstance)
    const writeConfigBuilder = configBuilder(templateInstance)
    let writeConfig = vscode.commands.registerCommand(
        'tb.CreateConfig',
        writeConfigBuilder
    )

    const writeTemplatesBuilder = templateBuilder(
        templateInstance,
        loggerInstance
    )
    let createTemplateFile = vscode.commands.registerCommand(
        'tb.CreateTemplateFile',
        writeTemplatesBuilder
    )

    context.subscriptions.push(writeConfig, createTemplateFile)
}

export function deactivate() {}

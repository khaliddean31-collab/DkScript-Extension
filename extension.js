const vscode = require('vscode');
const path = require('path');

/**
 * DkLang VS Code Extension Logic
 * Created by: Dean Khalid
 */
function activate(context) {
    console.log('DkLang Extension is now active!');

    // Command to run DkLang / DkScript
    let disposable = vscode.commands.registerCommand('dklang.runFile', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const filePath = editor.document.fileName;
        if (!filePath.endsWith('.dk')) {
            vscode.window.showErrorMessage('File ini bukan file DkLang!');
            return;
        }

        // We use the 'dklang' command which is now globally available via npm
        const terminal = vscode.window.createTerminal('DkLang Runtime');
        terminal.show();
        terminal.sendText(`dklang "${path.basename(filePath)}"`);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

const vscode = require('vscode');
const path = require('path');

/**
 * DkScript VS Code Extension Logic
 * Created by: Dean Khalid
 */
function activate(context) {
    console.log('DkScript Extension is now active!');

    // Command to run DkScript
    let disposable = vscode.commands.registerCommand('dkscript.runFile', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const filePath = editor.document.fileName;
        if (!filePath.endsWith('.dk')) {
            vscode.window.showErrorMessage('File ini bukan file DkScript!');
            return;
        }

        // We use the 'dkscript' command which should be globally available
        const terminal = vscode.window.createTerminal('DkScript Runtime');
        terminal.show();
        terminal.sendText(`dkscript "${path.basename(filePath)}"`);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

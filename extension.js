const vscode = require('vscode');

vscode.window.showInformationMessage(
  'The Theme `Coral Reef` is deprecated due to a publisher changes. Please search for https://marketplace.visualstudio.com/items?itemName=1nVitr0.theme-coral-reef for the new theme',
  'Open Marketplace',
  'Switch to new version'
).then(selection => {
  if (selection === 'Open Marketplace') {
    vscode.commands.executeCommand('workbench.extensions.search', vscode.Uri.parse('1nVitr0.theme-coral-reef'));
  } else if (selection === 'Switch to new version') {
    vscode.commands.executeCommand('workbench.extensions.installExtension', vscode.Uri.parse('1nVitr0.theme-coral-reef')).then(() => {
      vscode.commands.executeCommand('workbench.extensions.uninstallExtension', vscode.Uri.parse('invitro.coral-reef'));
    });
  }
});
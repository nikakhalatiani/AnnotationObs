import { Plugin, Editor, MarkdownView } from 'obsidian';

export default class MyPlugin extends Plugin {
async onload() {
	this.addCommand({
		id: 'wrap-text-with-a-tag',
		name: 'add annotation',
		checkCallback: (checking: boolean) => {
			const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView && activeView.getMode() === 'source' && activeView.editor) {
				if (!checking) {
					this.wrapSelectedTextWithATag(activeView.editor);
				}
				return true; // This command is applicable
			}
			return false; // This command is not applicable
		},
	});
}
  wrapSelectedTextWithATag(editor: Editor) {
	const selectedText = editor.getSelection();
	if (selectedText.length === 0) return; // Do nothing if no text is selected
  
	// The text that will replace the selection
	const wrappedText = `<a title="">${selectedText}</a>`;
  
	const selectionStart = editor.getCursor('from'); // Get the start position of the selection
  
	// Replace the selected text with the wrapped version
	editor.replaceSelection(wrappedText);
  
	// Calculate new cursor position to be right after 'title="'
	// We use the selection start point because that's where the <a> tag starts
	const newPosition = {
	  line: selectionStart.line,
	  ch: selectionStart.ch + '<a title="'.length,
	};
  
	editor.setCursor(newPosition); // Set the new cursor position
  }
  

  async onunload() {
    console.log('unloading plugin');
  }
}

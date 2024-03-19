import { Plugin, Editor, MarkdownView } from 'obsidian';

export default class MyPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'wrap-text-with-a-tag',
      name: 'add annotation',
      checkCallback: (checking: boolean) => {
        const activeLeaf = this.app.workspace.activeLeaf;
        if (activeLeaf) {
          const markdownView = activeLeaf.view as MarkdownView;
          if (markdownView.getMode() === 'source' && markdownView.editor) {
            if (!checking) {
              this.wrapSelectedTextWithATag(markdownView.editor);
            }
            return true; // This command is applicable
          }
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
	const cursorPosition = editor.getCursor(); // Get the current cursor position
  
	// Replace the selected text with the wrapped version
	editor.replaceSelection(wrappedText);
  
	// Calculate new cursor position
	// It should be inside the title attribute, after 'title="'
	const newPosition = {
	  line: cursorPosition.line,
	  ch: cursorPosition.ch + '<a title="'.length // Place the cursor right after 'title="'
	};
  
	editor.setCursor(newPosition); // Set the new cursor position
  }

  async onunload() {
    console.log('unloading plugin');
  }
}

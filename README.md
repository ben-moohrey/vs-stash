# vs‑stash

**Stash Selected Files** — a small VS Code extension to pick and stash only the files you want.

---

## Features

- **QuickPick file selection**  
  Choose from your modified files in the current Git repo via a multi‑select list.  
  ![QuickPick UI](images/quickpick.png)

- **Include untracked files (optional)**  
  After selecting files, you’re prompted “Include untracked files in stash?” so you can decide per run whether to pass `-u`.

- **Notifications & error handling**  
  You’ll get a progress notification while stashing, and clear success or error messages when it’s done.

- **Keybinding support**  
  Assign your own shortcut to `stashFiles.selectAndStash` for 1‑key access.

---

## Requirements

- **Visual Studio Code** v1.50 or later  
- **Built‑in Git extension** (enabled by default)  
- **Git CLI** on your PATH

---

## Extension Settings

This extension does not contribute any user‑configurable settings.

---

## Known Issues

- On Windows, paths with spaces or special characters may require additional quoting if you hit odd “pathspec” errors.  
- If you run into quoting problems, try switching the spawn-based approach in `extension.ts` instead of shell strings.

---

## Release Notes

### 0.1.0

- Initial public release  
- “Stash Selected Files” command with file multi‑pick and untracked‑files prompt

---

## Following extension guidelines

Make sure to follow the [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines) when contributing or publishing updates.

---

## Working with Markdown

You can author or preview this README right inside VS Code:

- **Split editor**: `Ctrl+\` (Windows/Linux) or `Cmd+\` (macOS)  
- **Toggle preview**: `Shift+Ctrl+V` (Windows/Linux) or `Shift+Cmd+V` (macOS)  
- **Markdown snippets**: `Ctrl+Space`

---

## For more information

- [VS Code API & Extension Docs](https://code.visualstudio.com/api)  
- [Markdown Syntax Reference](https://www.markdownguide.org/basic-syntax/)  

Enjoy stashing exactly what you need! 🎉  

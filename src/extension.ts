import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";
import { GitExtension } from "vscode.git";

export function activate(ctx: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand("stashFiles.selectAndStash", async () => {
        // 1) grab Git API
        const gitExt = vscode.extensions.getExtension<GitExtension>("vscode.git")?.exports;
        const git = gitExt?.getAPI(1);
        if (!git) {
            return vscode.window.showErrorMessage("Git extension not available");
        }

        // 2) assume first repo
        const repo = git.repositories[0];
        if (!repo) {
            return vscode.window.showErrorMessage("No Git repo found");
        }

        // 3) list modified/unstaged files
        const changes = repo.state.workingTreeChanges;
        if (changes.length === 0) {
            return vscode.window.showInformationMessage("No changes to stash");
        }
        const relativePaths = changes.map((c) => path.relative(repo.rootUri.fsPath, c.uri.fsPath));

        // 4) QuickPick for multi‑select
        const pick = await vscode.window.showQuickPick(relativePaths, {
            canPickMany: true,
            placeHolder: "Select files to stash…",
        });
        if (!pick || pick.length === 0) {
            return; // user cancelled
        }

        const includeUntracked = await vscode.window
            .showQuickPick(["No", "Yes"], {
                placeHolder: "Include untracked files in stash?",
            })
            .then((sel) => sel === "Yes");

        if (includeUntracked === undefined) {
            return; // user hit Esc
        }

        const flag = includeUntracked ? "-u" : "";
        const filesArg = pick.map((f) => `"${f}"`).join(" ");
        const cmd = `git stash push ${flag} -- ${filesArg}`;

        // 4) run it
        vscode.window.withProgress(
            { location: vscode.ProgressLocation.Notification, title: "Stashing…" },
            () =>
                new Promise<void>((resolve) => {
                    exec(cmd, { cwd: repo.rootUri.fsPath }, (err, _stdout, stderr) => {
                        if (err) {
                            vscode.window.showErrorMessage(
                                `Stash failed: ${stderr || err.message}`,
                            );
                        } else {
                            vscode.window.showInformationMessage(
                                `Stashed ${pick.length} file(s)` +
                                    (includeUntracked ? " (including untracked)" : ""),
                            );
                        }
                        resolve();
                    });
                }),
        );
    });

    ctx.subscriptions.push(disposable);
}

export function deactivate() {}

import * as vscode from 'vscode';

export interface GitExtension {
  readonly enabled: boolean;
  getAPI(version: 1): GitAPI;
}

export interface GitAPI {
  readonly repositories: GitRepository[];
  // (you can add more here if you need them)
}

export interface GitRepository {
  readonly rootUri: vscode.Uri;
  readonly state: {
    readonly workingTreeChanges: Change[];
  };
}

export interface Change {
  readonly uri: vscode.Uri;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';

/**
 * A `CustomTextEditorProvider` that lets HTML files be opened directly in the Live Preview
 * via the editor "Open With…" menu or a `workbench.editorAssociations` entry.
 *
 * Instead of rendering its own content, it hands the webview panel that VS Code provides for
 * the editor slot to the `Manager`, which loads the embedded preview into it (starting the
 * server if needed). This reuses all of the existing preview infrastructure.
 */
export class PreviewEditorProvider implements vscode.CustomTextEditorProvider {
	public static readonly viewType = 'livePreview.htmlPreview';

	constructor(
		private readonly _openPreviewInPanel: (
			panel: vscode.WebviewPanel,
			file: vscode.Uri
		) => Promise<void>
	) {}

	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		await this._openPreviewInPanel(webviewPanel, document.uri);
	}
}

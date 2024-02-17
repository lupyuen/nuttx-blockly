/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as Blockly from 'blockly/core';
/**
 * Saves the state of the workspace to browser's local storage.
 * @param workspace Blockly workspace to save.
 */
export declare const save: (workspace: Blockly.Workspace) => void;
/**
 * Loads saved state from local storage into the given workspace.
 * @param workspace Blockly workspace to load into.
 */
export declare const load: (workspace: Blockly.Workspace) => void;
//# sourceMappingURL=serialization.d.ts.map
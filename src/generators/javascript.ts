/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';
import * as Blockly from 'blockly/core';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

// POSIX Open Block
forBlock['posix_open'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator
) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";

  // Generate the function call for this block.
  const code = `os.open(${text})`;
  return [code, Order.ATOMIC];
};

// POSIX Close Block
forBlock['posix_close'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator
) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";

  // Generate the function call for this block.
  const code = `os.close(${text});\n`;
  return code;
};

// POSIX Ioctl Block
forBlock['posix_ioctl'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator
) {
  const fd = generator.valueToCode(block, 'FD', Order.NONE) || "0";
  const req = generator.valueToCode(block, 'REQ', Order.NONE) || "0";
  const arg = generator.valueToCode(block, 'ARG', Order.NONE) || "0";

  // Generate the function call for this block.
  const code = `os.ioctl(${fd}, ${req}, ${arg})`;
  return [code, Order.ATOMIC];
};

// POSIX Sleep Block
forBlock['posix_sleep'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator
) {
  const ms = generator.valueToCode(block, 'MS', Order.NONE) || "''";

  // Generate the function call for this block.
  const code = `os.sleep(${ms});\n`;
  return code;
};

// Demo: Add Text Block
forBlock['add_text'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator
) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
  const color =
    generator.valueToCode(block, 'COLOR', Order.ATOMIC) || "'#ffffff'";

  const addText = generator.provideFunction_(
    'addText',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, color) {

  // Add text to the output area.
  const outputDiv = document.getElementById('output');
  const textEl = document.createElement('p');
  textEl.innerText = text;
  textEl.style.color = color;
  outputDiv.appendChild(textEl);
}`
  );
  // Generate the function call for this block.
  const code = `${addText}(${text}, ${color});\n`;
  return code;
};

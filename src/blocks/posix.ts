/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block
const posixOpen = {
  'type': 'posix_open',
  'message0': 'Open File %1 with color %2',
  'args0': [
    {
      'type': 'input_value',
      'name': 'TEXT',
      'check': 'String',
    },
    {
      'type': 'input_value',
      'name': 'COLOR',
      'check': 'Colour',
    },
  ],
  'previousStatement': null,
  'nextStatement': null,
  'colour': 160,
  'tooltip': '',
  'helpUrl': '',
};

// Create a custom block
const posixClose = {
    'type': 'posix_close',
    'message0': 'Close File Descriptor %1 with color %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'TEXT',
        'check': 'String',
      },
      {
        'type': 'input_value',
        'name': 'COLOR',
        'check': 'Colour',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': 160,
    'tooltip': '',
    'helpUrl': '',
  };
  
// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const posixBlocks = Blockly.common.createBlockDefinitionsFromJsonArray(
    [posixOpen, posixClose]);

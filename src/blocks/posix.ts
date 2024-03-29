/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// POSIX Open Block
const posixOpen = {
  'type': 'posix_open',
  'message0': 'Open Filename %1',
  'args0': [
    {
      'type': 'input_value',
      'name': 'FILENAME',
      'check': 'String',
    },
  ],
  'previousStatement': null,
  'nextStatement': null,
  'output': 'Number',
  'colour': 160,
  'tooltip': '',
  'helpUrl': '',
};

// POSIX Close Block
const posixClose = {
    'type': 'posix_close',
    'message0': 'Close File Descriptor %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'FD',
        'check': 'Number',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': 160,
    'tooltip': '',
    'helpUrl': '',
};

// POSIX Ioctl Block
const posixIoctl = {
    'type': 'posix_ioctl',
    'message0': 'IOCtl File Descriptor %1 Request %2 Arg %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'FD',
        'check': 'Number',
      },
      {
        'type': 'input_value',
        'name': 'REQ',
        'check': 'Number',
      },
      {
        'type': 'input_value',
        'name': 'ARG',
        'check': 'Number',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'output': 'Number',
    'colour': 160,
    'tooltip': '',
    'helpUrl': '',
};

// POSIX Sleep Block
const posixSleep = {
  'type': 'posix_sleep',
  'message0': 'Sleep (ms) %1',
  'args0': [
    {
      'type': 'input_value',
      'name': 'MS',
      'check': 'Number',
    },
  ],
  'previousStatement': null,
  'nextStatement': null,
  'output': 'Number',
  'colour': 160,
  'tooltip': '',
  'helpUrl': '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const posixBlocks = Blockly.common.createBlockDefinitionsFromJsonArray(
    [posixOpen, posixClose, posixIoctl, posixSleep]);

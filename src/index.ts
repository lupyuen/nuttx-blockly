/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/text';
import {posixBlocks} from './blocks/posix';
import {forBlock} from './generators/javascript';
import {javascriptGenerator} from 'blockly/javascript';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Blockly.common.defineBlocks(posixBlocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode')?.firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = blocklyDiv && Blockly.inject(blocklyDiv, {toolbox});

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws);
  if (codeDiv) codeDiv.textContent = code;

  if (outputDiv) outputDiv.innerHTML = '';

  // eval(code);
};

if (ws) {
    // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });


  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()) {
      return;
    }
    runCode();
  });

  // Add callbacks for buttons
  const emulatorBtn = document.getElementById("emulatorBtn");
  const deviceBtn = document.getElementById("deviceBtn");
  const demoSelector = document.getElementById("demoSelector");
  if (emulatorBtn) { emulatorBtn.onclick = runEmulator; }
  if (deviceBtn) { deviceBtn.onclick = runDevice; }
  if (demoSelector) { demoSelector.onchange = selectDemo; }
}

// Run on Ox64 Emulator
function runEmulator() {
  // Save the Generated JavaScript Code to LocalStorage
  const code = javascriptGenerator.workspaceToCode(ws);
  window.localStorage.setItem("runCode", code);

  // Set the Timestamp for Optimistic Locking (later)
  window.localStorage.setItem("runTimestamp", Date.now() + "");

  // Open the NuttX Emulator. Reuse the same tab.
  window.open("https://lupyuen.github.io/nuttx-tinyemu/blockly/", "Emulator");
}

// Run on Ox64 Device
function runDevice() {
  // Save the Generated JavaScript Code to LocalStorage
  const code = javascriptGenerator.workspaceToCode(ws);
  window.localStorage.setItem("runCode", code);

  // Set the Timestamp for Optimistic Locking (later)
  window.localStorage.setItem("runTimestamp", Date.now() + "");

  // Open the WebSerial Monitor. Reuse the same tab.
  window.open("https://lupyuen.github.io/nuttx-tinyemu/webserial/", "Device");
}

// Select a Demo
function selectDemo(ev: Event) {
  const storageKey = 'mainWorkspace';
  const target = ev?.target as HTMLSelectElement;
  const value = target.value;

  // Set the Blocks in Local Storage
  switch (value) {
    case "LED Blinky":
      window.localStorage?.setItem(storageKey, '{"blocks":{"languageVersion":0,"blocks":[{"type":"variables_set","id":"Nx6o0xVxp@qzI_(vRd.7","x":60,"y":33,"fields":{"VAR":{"id":":,DB,f}1q3KOBim#j66["}},"inputs":{"VALUE":{"block":{"type":"math_number","id":"enmYd`#z_G1k5Pvv*x(G","fields":{"NUM":7427}}}},"next":{"block":{"type":"variables_set","id":"f#C+(eT=naKZzr%/;A.P","fields":{"VAR":{"id":"A/TX@37C_h*^vbRp@1fz"}},"inputs":{"VALUE":{"block":{"type":"posix_open","id":"^$p+x^F[mQ;grqANDtO}","inputs":{"FILENAME":{"shadow":{"type":"text","id":"nz;|U#KPVW$$c0?W0ROv","fields":{"TEXT":"/dev/userleds"}}}}}}},"next":{"block":{"type":"controls_repeat_ext","id":"0{4pA@{^=ks|iVF.|]i#","inputs":{"TIMES":{"shadow":{"type":"math_number","id":"=o3{$E2c=BpwD0#MR3^x","fields":{"NUM":20}}},"DO":{"block":{"type":"variables_set","id":"l;AmIPhJARU{C)0kNq6`","fields":{"VAR":{"id":"xH3`F~]tadlX:/zKQ!Xx"}},"inputs":{"VALUE":{"block":{"type":"posix_ioctl","id":"0i!pbWJ(~f~)b^@jt!nP","inputs":{"FD":{"block":{"type":"variables_get","id":"QMGa_}UmC$b[5/Bh^f${","fields":{"VAR":{"id":"A/TX@37C_h*^vbRp@1fz"}}}},"REQ":{"block":{"type":"variables_get","id":"dZ5%B_rcbVb_o=v;gze-","fields":{"VAR":{"id":":,DB,f}1q3KOBim#j66["}}}},"ARG":{"block":{"type":"math_number","id":"9UA!sDxmf/=fYfxC6Yqa","fields":{"NUM":1}}}}}}},"next":{"block":{"type":"posix_sleep","id":"ruh/q4F7dW*CQ,5J]E%w","inputs":{"MS":{"block":{"type":"math_number","id":"9~q0@ABEg4VXP:1HN-$1","fields":{"NUM":5000}}}},"next":{"block":{"type":"variables_set","id":"e;BNsjvbN}9vTTc[O#bY","fields":{"VAR":{"id":"xH3`F~]tadlX:/zKQ!Xx"}},"inputs":{"VALUE":{"block":{"type":"posix_ioctl","id":"-G5x~Y4iAyVUAWuwNh#H","inputs":{"FD":{"block":{"type":"variables_get","id":"vtt5Gid0B|iK![$4Ct*D","fields":{"VAR":{"id":"A/TX@37C_h*^vbRp@1fz"}}}},"REQ":{"block":{"type":"variables_get","id":"pd~f}Oqz2(`o3Oz;8ax`","fields":{"VAR":{"id":":,DB,f}1q3KOBim#j66["}}}},"ARG":{"block":{"type":"math_number","id":"OS(uQV)!%iqZ=N}s1H(L","fields":{"NUM":0}}}}}}},"next":{"block":{"type":"posix_sleep","id":"{X9leD=Rgr4=o5E2(#Z,","inputs":{"MS":{"block":{"type":"math_number","id":"eEq(yXcGPbVtZT|CunT0","fields":{"NUM":5000}}}}}}}}}}}}},"next":{"block":{"type":"posix_close","id":"+%kD6{Xa@#BOx}a^Jbup","inputs":{"FD":{"block":{"type":"variables_get","id":"nu)^gdR-9QV71GSI7#(l","fields":{"VAR":{"id":"A/TX@37C_h*^vbRp@1fz"}}}}}}}}}}}}]},"variables":[{"name":"fd","id":"A/TX@37C_h*^vbRp@1fz"},{"name":"ULEDIOC_SETALL","id":":,DB,f}1q3KOBim#j66["},{"name":"ret","id":"xH3`F~]tadlX:/zKQ!Xx"}]}');
      break;
    default:
      break;
  }

  // Refresh the Blocks
  if (ws) { 
    load(ws); 
    runCode();
  }
}

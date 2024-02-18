# (Homage to MakeCode) Coding Ox64 BL808 SBC the Drag-n-Drop Way

[MakeCode for BBC micro:bit](https://www.sciencedirect.com/science/article/pii/S1383762118306088) is an awesome creation that's way ahead of its time (7 years ago!)

- [TypeScript Compiler](https://www.sciencedirect.com/science/article/pii/S1383762118306088#sec0008) in the Web Browser (in JavaScript!)

- [Bespoke Arm Assembler](https://www.sciencedirect.com/science/article/pii/S1383762118306088#sec0008) that runs in the Web Browser (also JavaScript!)

- [Bespoke Embedded OS](https://www.sciencedirect.com/science/article/pii/S1383762118306088#sec0009) for BBC micro:bit (CODAL / Mbed OS)

- [UF2 Bootloader](https://www.sciencedirect.com/science/article/pii/S1383762118306088#sec0015) with flashing over WebUSB

- [micro:bit Simulator](https://www.sciencedirect.com/science/article/pii/S1383762118306088#sec0004) in JavaScript

- All this for an (underpowered) BBC micro:bit with Nordic nRF51 (Arm Cortex-M0, 256 KB Flash, 16 KB RAM!)

Today 7 years later: How would we redo all this? With a bunch of Open Source Packages?

- Hardware Device: [Ox64 BL808 64-bit RISC-V SBC](https://www.hackster.io/lupyuen/8-risc-v-sbc-on-a-real-time-operating-system-ox64-nuttx-474358) (64 MB RAM, Unlimited microSD Storage, only $8!)

- Embedded OS: [Apache NuttX RTOS](https://nuttx.apache.org/docs/latest/index.html)

- JavaScript Engine: [QuickJS for NuttX](https://github.com/lupyuen/quickjs-nuttx)

- Web Emulator: [TinyEMU WebAssembly for NuttX](https://github.com/lupyuen/nuttx-tinyemu)

- C Compiler + Assembler: [TCC WebAssembly for NuttX](https://github.com/lupyuen/tcc-riscv32-wasm) (but we probably won't need this since we have JavaScript on NuttX)

- Device Control: [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) for controlling Ox64 over UART

# Create the Blockly Project

MakeCode was created with Blockly, we'll stick with Blockly.

Based on the [Blockly Instructions](https://developers.google.com/blockly/guides/get-started/get-the-code)...

```bash
npx @blockly/create-package app nuttx-blockly --typescript
npm run build
```

Try the Blockly Demo: https://lupyuen.github.io/nuttx-blockly/

# Send a Command to NuttX Emulator

To send a command to NuttX Emulator: [jslinux.js](https://github.com/lupyuen/nuttx-tinyemu/commit/f01727935818cd1685ee4a82943bb9f19b13d85c)

```javascript
let send_str = "";
function send_command(cmd) {
  if (cmd !== null) { send_str = cmd; }
  if (send_str.length == 0) { return; }
  console_write1(send_str.charCodeAt(0));
  send_str = send_str.substring(1);
  window.setTimeout(()=>{ send_command(null); }, 10);
}
const cmd = [
  `qjs`,
  `function main() { console.log(123); }`,
  `main()`,
  ``
].join("\r");
window.setTimeout(()=>{ send_command(cmd); }, 10000);
```

Which will start QuickJS and run a JavaScript Function:

https://lupyuen.github.io/nuttx-tinyemu/blockly/

```text
NuttShell (NSH) NuttX-12.4.0-RC0
nsh> qjs
QuickJS - Type "\h" for help
qjs > function main() { console.log(123); }
undefined
qjs > main()
123
undefined
qjs >
```

# Send a Command to Ox64 BL808 SBC via Web Serial API

[Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)

TODO

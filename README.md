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

# Connect to Ox64 BL808 SBC via Web Serial API

Let's connect to Ox64 BL808 SBC in our Web Browser via the Web Serial API...

- [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)

- [Read from and write to a serial port](https://developer.chrome.com/docs/capabilities/serial)

- [Getting started with the Web Serial API](https://codelabs.developers.google.com/codelabs/web-serial#0)

  (Very similar to what we're doing)

Beware, Web Serial API is only available...

- Over HTTPS: https://...

- Or Local Filesystem: file://...

- It won't work over HTTP! http://...

We create a button: [index.html](https://github.com/lupyuen/nuttx-tinyemu/commit/e5e74ac92d21d47c359dbabd4babcb0d59206408#diff-09992667561d80fbe8c76cc5e271739ba0bb8194b31341005f25d8aa3f6c2baf)

```html
<button id="connect" onclick="control_device();">
  Connect
</button>
```

Which connects to Ox64 over UART: [jslinux.js](https://github.com/lupyuen/nuttx-tinyemu/commit/e5e74ac92d21d47c359dbabd4babcb0d59206408#diff-0600645ce087613109d3c3269c8fa545477739eff19b7d478672b715500bb9cc)

```javascript
// Control Ox64 over UART
async function control_device() {
    if (!navigator.serial) { const err = "Web Serial API only works with https://... and file://...!"; alert(err); throw new Error(err); }

    // Prompt user to select any serial port.
    const port = await navigator.serial.requestPort();

    // Get all serial ports the user has previously granted the website access to.
    // const ports = await navigator.serial.getPorts();

    // Wait for the serial port to open.
    // TODO: Ox64 only connects at 2 Mbps, change this for other devices
    await port.open({ baudRate: 2000000 });

    // Read from the serial port
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    // Listen to data coming from the serial device.
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
        }
        // value is a string.
        console.log(value);
    }
```

And Ox64 NuttX appears in our JavaScript Console yay!

```text
Starting kernel ...
ABC
bl808_gpiowrite: regaddr=0x20000938, clear=0x1000000
bl808_gpiowrite: regaddr=0x20000938, set=0x1000000
bl808_gpiowrite: regaddr=0x20000938, clear=0x1000000
NuttShell (NSH) NuttX-12.4.0-RC0
nsh>
```

TODO

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
// https://developer.chrome.com/docs/capabilities/serial
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

# Send a Command to Ox64 BL808 SBC via Web Serial API

This is how we send a command to Ox64 BL808 SBC via Web Serial API: [jslinux.js](https://github.com/lupyuen/nuttx-tinyemu/commit/1384db4edb398f6cb65718766af67dc1aa88bcb0)

```javascript
  // Wait for the serial port to open.
  // TODO: Ox64 only connects at 2 Mbps, change this for other devices
  await port.open({ baudRate: 2000000 });

  // Send a command to serial port
  const cmd = [
      `qjs`,
      `function main() { console.log(123); }`,
      `main()`,
      ``
  ].join("\r");
  const textEncoder = new TextEncoderStream();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  const writer = textEncoder.writable.getWriter();
  await writer.write(cmd);
  
  // Read from the serial port
  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  const reader = textDecoder.readable.getReader();

  // Listen to data coming from the serial device.
  ...
```

And it works! Says the JavaScript Console...

```text
function main() { console.log(123); }
main()
123
undefined
qjs >
```

TODO: Build and Deploy

```bash
npm run build && rm -r docs && mv dist docs
```

TODO: Print to Web Terminal

TODO: [Add Blocks for POSIX Open and Close](https://github.com/lupyuen/nuttx-blockly/commit/801d019e11bf00ddfb6bf57361da9719b45e80ad)

TODO: [Add ioctl block](https://github.com/lupyuen/nuttx-blockly/commit/29e060a883ba4d2a257f7c9c65ef88a6f5eb95a4)

TODO: [Change the Types from String to Number](https://github.com/lupyuen/nuttx-blockly/commit/e4405b39c59c3e5db35255fc7cb8ac25a29e66fe)

TODO: [Blockly Developer Tools](https://developers.google.com/blockly/guides/create-custom-blocks/blockly-developer-tools)

TODO: [Change the Types from String to Number](https://github.com/lupyuen/nuttx-blockly/commit/e4405b39c59c3e5db35255fc7cb8ac25a29e66fe)

```json
{
  "blocks": {
    "languageVersion": 0,
    "blocks": [
      {
        "type": "controls_repeat_ext",
        "id": "0{4pA@{^=ks|iVF.|]i#",
        "x": 74,
        "y": 129,
        "inputs": {
          "TIMES": {
            "shadow": {
              "type": "math_number",
              "id": "=o3{$E2c=BpwD0#MR3^x",
              "fields": {
                "NUM": 20
              }
            }
          },
          "DO": {
            "block": {
              "type": "variables_set",
              "id": "Nx6o0xVxp@qzI_(vRd.7",
              "fields": {
                "VAR": {
                  "id": ":,DB,f}1q3KOBim#j66["
                }
              },
              "inputs": {
                "VALUE": {
                  "block": {
                    "type": "math_number",
                    "id": "enmYd`#z_G1k5Pvv*x(G",
                    "fields": {
                      "NUM": 7427
                    }
                  }
                }
              },
              "next": {
                "block": {
                  "type": "variables_set",
                  "id": "f#C+(eT=naKZzr%/;A.P",
                  "fields": {
                    "VAR": {
                      "id": "A/TX@37C_h*^vbRp@1fz"
                    }
                  },
                  "inputs": {
                    "VALUE": {
                      "block": {
                        "type": "posix_open",
                        "id": "{u;/3AFl^Rre}^VBbF00",
                        "inputs": {
                          "TEXT": {
                            "shadow": {
                              "type": "text",
                              "id": "I,a@u9Ee$W9rhlQ~TV9#",
                              "fields": {
                                "TEXT": "/dev/userleds"
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "next": {
                    "block": {
                      "type": "variables_set",
                      "id": "l;AmIPhJARU{C)0kNq6`",
                      "fields": {
                        "VAR": {
                          "id": "xH3`F~]tadlX:/zKQ!Xx"
                        }
                      },
                      "inputs": {
                        "VALUE": {
                          "block": {
                            "type": "posix_ioctl",
                            "id": "0i!pbWJ(~f~)b^@jt!nP",
                            "inputs": {
                              "FD": {
                                "block": {
                                  "type": "variables_get",
                                  "id": "QMGa_}UmC$b[5/Bh^f${",
                                  "fields": {
                                    "VAR": {
                                      "id": "A/TX@37C_h*^vbRp@1fz"
                                    }
                                  }
                                }
                              },
                              "REQ": {
                                "block": {
                                  "type": "variables_get",
                                  "id": "dZ5%B_rcbVb_o=v;gze-",
                                  "fields": {
                                    "VAR": {
                                      "id": ":,DB,f}1q3KOBim#j66["
                                    }
                                  }
                                }
                              },
                              "ARG": {
                                "block": {
                                  "type": "math_number",
                                  "id": "9UA!sDxmf/=fYfxC6Yqa",
                                  "fields": {
                                    "NUM": 1
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "next": {
                        "block": {
                          "type": "posix_sleep",
                          "id": "ruh/q4F7dW*CQ,5J]E%w",
                          "inputs": {
                            "MS": {
                              "block": {
                                "type": "math_number",
                                "id": "9~q0@ABEg4VXP:1HN-$1",
                                "fields": {
                                  "NUM": 60000
                                }
                              }
                            }
                          },
                          "next": {
                            "block": {
                              "type": "variables_set",
                              "id": "e;BNsjvbN}9vTTc[O#bY",
                              "fields": {
                                "VAR": {
                                  "id": "xH3`F~]tadlX:/zKQ!Xx"
                                }
                              },
                              "inputs": {
                                "VALUE": {
                                  "block": {
                                    "type": "posix_ioctl",
                                    "id": "-G5x~Y4iAyVUAWuwNh#H",
                                    "inputs": {
                                      "FD": {
                                        "block": {
                                          "type": "variables_get",
                                          "id": "vtt5Gid0B|iK![$4Ct*D",
                                          "fields": {
                                            "VAR": {
                                              "id": "A/TX@37C_h*^vbRp@1fz"
                                            }
                                          }
                                        }
                                      },
                                      "REQ": {
                                        "block": {
                                          "type": "variables_get",
                                          "id": "pd~f}Oqz2(`o3Oz;8ax`",
                                          "fields": {
                                            "VAR": {
                                              "id": ":,DB,f}1q3KOBim#j66["
                                            }
                                          }
                                        }
                                      },
                                      "ARG": {
                                        "block": {
                                          "type": "math_number",
                                          "id": "OS(uQV)!%iqZ=N}s1H(L",
                                          "fields": {
                                            "NUM": 0
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "next": {
                                "block": {
                                  "type": "posix_sleep",
                                  "id": "{X9leD=Rgr4=o5E2(#Z,",
                                  "inputs": {
                                    "MS": {
                                      "block": {
                                        "type": "math_number",
                                        "id": "eEq(yXcGPbVtZT|CunT0",
                                        "fields": {
                                          "NUM": 60000
                                        }
                                      }
                                    }
                                  },
                                  "next": {
                                    "block": {
                                      "type": "posix_close",
                                      "id": "EC[Xwv%F4i0/(TKVDq[a",
                                      "inputs": {
                                        "TEXT": {
                                          "block": {
                                            "type": "variables_get",
                                            "id": "(g?H1/q8Lei7d0WHqv5)",
                                            "fields": {
                                              "VAR": {
                                                "id": "A/TX@37C_h*^vbRp@1fz"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]
  },
  "variables": [
    {
      "name": "fd",
      "id": "A/TX@37C_h*^vbRp@1fz"
    },
    {
      "name": "ULEDIOC_SETALL",
      "id": ":,DB,f}1q3KOBim#j66["
    },
    {
      "name": "ret",
      "id": "xH3`F~]tadlX:/zKQ!Xx"
    }
  ]
}
```

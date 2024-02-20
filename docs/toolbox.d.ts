/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const toolbox: {
    kind: string;
    contents: ({
        kind: string;
        name: string;
        categorystyle: string;
        contents: ({
            kind: string;
            type: string;
            inputs: {
                TIMES: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                FROM?: undefined;
                TO?: undefined;
                BY?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                FROM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                TO: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                BY: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                TIMES?: undefined;
            };
        })[];
        custom?: undefined;
    } | {
        kind: string;
        name: string;
        categorystyle: string;
        contents: ({
            kind: string;
            type: string;
            fields: {
                NUM: number;
                OP?: undefined;
            };
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                A: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                B: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                NUM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            fields?: undefined;
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                NUMBER_TO_CHECK: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            fields: {
                OP: string;
                NUM?: undefined;
            };
            inputs: {
                NUM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
        } | {
            kind: string;
            type: string;
            fields: {
                OP: string;
                NUM?: undefined;
            };
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                DIVIDEND: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                DIVISOR: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                VALUE: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                LOW: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                HIGH: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                FROM?: undefined;
                TO?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                FROM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                TO: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                X?: undefined;
                Y?: undefined;
            };
            fields?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                X: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                Y: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                A?: undefined;
                B?: undefined;
                NUM?: undefined;
                NUMBER_TO_CHECK?: undefined;
                DIVIDEND?: undefined;
                DIVISOR?: undefined;
                VALUE?: undefined;
                LOW?: undefined;
                HIGH?: undefined;
                FROM?: undefined;
                TO?: undefined;
            };
            fields?: undefined;
        })[];
        custom?: undefined;
    } | {
        kind: string;
        name: string;
        categorystyle: string;
        contents: ({
            kind: string;
            type: string;
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                TEXT: {
                    shadow: {
                        type: string;
                        fields: {
                            TEXT: string;
                        };
                    };
                };
                VALUE?: undefined;
                FIND?: undefined;
                STRING?: undefined;
                SUB?: undefined;
                FROM?: undefined;
                TO?: undefined;
                COLOR?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                VALUE: {
                    shadow: {
                        type: string;
                        fields: {
                            TEXT: string;
                        };
                    };
                    block?: undefined;
                };
                TEXT?: undefined;
                FIND?: undefined;
                STRING?: undefined;
                SUB?: undefined;
                FROM?: undefined;
                TO?: undefined;
                COLOR?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                VALUE: {
                    block: {
                        type: string;
                    };
                    shadow?: undefined;
                };
                FIND: {
                    shadow: {
                        type: string;
                        fields: {
                            TEXT: string;
                        };
                    };
                };
                TEXT?: undefined;
                STRING?: undefined;
                SUB?: undefined;
                FROM?: undefined;
                TO?: undefined;
                COLOR?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                VALUE: {
                    block: {
                        type: string;
                    };
                    shadow?: undefined;
                };
                TEXT?: undefined;
                FIND?: undefined;
                STRING?: undefined;
                SUB?: undefined;
                FROM?: undefined;
                TO?: undefined;
                COLOR?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                STRING: {
                    block: {
                        type: string;
                    };
                };
                TEXT?: undefined;
                VALUE?: undefined;
                FIND?: undefined;
                SUB?: undefined;
                FROM?: undefined;
                TO?: undefined;
                COLOR?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                SUB: {
                    shadow: {
                        type: string;
                    };
                };
                TEXT: {
                    shadow: {
                        type: string;
                        fields?: undefined;
                    };
                };
                VALUE?: undefined;
                FIND?: undefined;
                STRING?: undefined;
                FROM?: undefined;
                TO?: undefined;
                COLOR?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                FROM: {
                    shadow: {
                        type: string;
                    };
                };
                TO: {
                    shadow: {
                        type: string;
                    };
                };
                TEXT: {
                    shadow: {
                        type: string;
                        fields?: undefined;
                    };
                };
                VALUE?: undefined;
                FIND?: undefined;
                STRING?: undefined;
                SUB?: undefined;
                COLOR?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                TEXT: {
                    shadow: {
                        type: string;
                        fields?: undefined;
                    };
                };
                VALUE?: undefined;
                FIND?: undefined;
                STRING?: undefined;
                SUB?: undefined;
                FROM?: undefined;
                TO?: undefined;
                COLOR?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                TEXT: {
                    shadow: {
                        type: string;
                        fields: {
                            TEXT: string;
                        };
                    };
                };
                COLOR: {
                    shadow: {
                        type: string;
                        fields: {
                            COLOUR: string;
                        };
                    };
                };
                VALUE?: undefined;
                FIND?: undefined;
                STRING?: undefined;
                SUB?: undefined;
                FROM?: undefined;
                TO?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                TEXT?: undefined;
                VALUE?: undefined;
                FIND?: undefined;
                STRING?: undefined;
                SUB?: undefined;
                FROM?: undefined;
                TO?: undefined;
                COLOR?: undefined;
            };
        })[];
        custom?: undefined;
    } | {
        kind: string;
        name: string;
        categorystyle: string;
        contents: ({
            kind: string;
            type: string;
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                NUM: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                VALUE?: undefined;
                LIST?: undefined;
                DELIM?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                VALUE: {
                    block: {
                        type: string;
                    };
                };
                NUM?: undefined;
                LIST?: undefined;
                DELIM?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                LIST: {
                    block: {
                        type: string;
                    };
                };
                NUM?: undefined;
                VALUE?: undefined;
                DELIM?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                DELIM: {
                    shadow: {
                        type: string;
                        fields: {
                            TEXT: string;
                        };
                    };
                };
                NUM?: undefined;
                VALUE?: undefined;
                LIST?: undefined;
            };
        })[];
        custom?: undefined;
    } | {
        kind: string;
        name: string;
        categorystyle: string;
        contents: ({
            kind: string;
            type: string;
            inputs?: undefined;
        } | {
            kind: string;
            type: string;
            inputs: {
                RED: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                GREEN: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                BLUE: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                COLOUR1?: undefined;
                COLOUR2?: undefined;
                RATIO?: undefined;
            };
        } | {
            kind: string;
            type: string;
            inputs: {
                COLOUR1: {
                    shadow: {
                        type: string;
                        fields: {
                            COLOUR: string;
                        };
                    };
                };
                COLOUR2: {
                    shadow: {
                        type: string;
                        fields: {
                            COLOUR: string;
                        };
                    };
                };
                RATIO: {
                    shadow: {
                        type: string;
                        fields: {
                            NUM: number;
                        };
                    };
                };
                RED?: undefined;
                GREEN?: undefined;
                BLUE?: undefined;
            };
        })[];
        custom?: undefined;
    } | {
        kind: string;
        name?: undefined;
        categorystyle?: undefined;
        contents?: undefined;
        custom?: undefined;
    } | {
        kind: string;
        name: string;
        categorystyle: string;
        custom: string;
        contents?: undefined;
    })[];
};
//# sourceMappingURL=toolbox.d.ts.map
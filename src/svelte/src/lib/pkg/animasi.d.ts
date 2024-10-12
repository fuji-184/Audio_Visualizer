/* tslint:disable */
/* eslint-disable */
/**
*/
export class Animator {
  free(): void;
/**
* @param {string} canvas_id
*/
  constructor(canvas_id: string);
/**
* @param {number} speed
* @param {number} smoothness
* @param {any[] | undefined} colors
* @param {number} alpha
*/
  enable_rainbow(speed: number, smoothness: number, colors: any[] | undefined, alpha: number): void;
/**
* @param {number} speed
*/
  set_rainbow_speed(speed: number): void;
/**
*/
  enable_smoke(): void;
/**
* @param {number} delta_time
*/
  update(delta_time: number): void;
/**
* @param {number} width
* @param {number} height
*/
  resize(width: number, height: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_animator_free: (a: number, b: number) => void;
  readonly animator_new: (a: number, b: number, c: number) => void;
  readonly animator_enable_rainbow: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly animator_set_rainbow_speed: (a: number, b: number) => void;
  readonly animator_enable_smoke: (a: number) => void;
  readonly animator_update: (a: number, b: number, c: number) => void;
  readonly animator_resize: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;

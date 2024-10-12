/* tslint:disable */
/* eslint-disable */
export enum StyleType {
  Visualizer = 0,
  Bg = 1,
}
export class Bg {
  free(): void;
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas: HTMLCanvasElement);
  /**
   * @param {Uint8Array} audio_data
   */
  draw(audio_data: Uint8Array): void;
}
export class SharedAudioProcessor {
  free(): void;
  constructor();
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {StyleType} style_type
   * @returns {number}
   */
  add_instance(canvas: HTMLCanvasElement, style_type: StyleType): number;
  /**
   * @param {Function} callback
   */
  set_on_audio_end(callback: Function): void;
  /**
   * @param {string} path
   * @returns {Promise<void>}
   */
  process_audio_from_path(path: string): Promise<void>;
  stop_audio(): void;
  draw(): void;
  clear_all(): void;
}
export class Visualizer {
  free(): void;
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas: HTMLCanvasElement);
  /**
   * @param {Uint8Array} audio_data
   */
  draw(audio_data: Uint8Array): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_bg_free: (a: number, b: number) => void;
  readonly bg_new: (a: number, b: number) => void;
  readonly bg_draw: (a: number, b: number, c: number) => void;
  readonly __wbg_sharedaudioprocessor_free: (a: number, b: number) => void;
  readonly sharedaudioprocessor_new: (a: number) => void;
  readonly sharedaudioprocessor_add_instance: (a: number, b: number, c: number, d: number) => void;
  readonly sharedaudioprocessor_set_on_audio_end: (a: number, b: number) => void;
  readonly sharedaudioprocessor_process_audio_from_path: (a: number, b: number, c: number) => number;
  readonly sharedaudioprocessor_stop_audio: (a: number, b: number) => void;
  readonly sharedaudioprocessor_draw: (a: number) => void;
  readonly sharedaudioprocessor_clear_all: (a: number) => void;
  readonly __wbg_visualizer_free: (a: number, b: number) => void;
  readonly visualizer_new: (a: number, b: number) => void;
  readonly visualizer_draw: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf5979e8b1efd9693: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h9b25215597f14b4b: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h480a8d395967bdb1: (a: number, b: number, c: number, d: number) => void;
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

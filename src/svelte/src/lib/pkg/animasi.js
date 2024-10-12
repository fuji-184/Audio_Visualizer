let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

const AnimatorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_animator_free(ptr >>> 0, 1));
/**
*/
export class Animator {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AnimatorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_animator_free(ptr, 0);
    }
    /**
    * @param {string} canvas_id
    */
    constructor(canvas_id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(canvas_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.animator_new(retptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            AnimatorFinalization.register(this, this.__wbg_ptr, this);
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} speed
    * @param {number} smoothness
    * @param {any[] | undefined} colors
    * @param {number} alpha
    */
    enable_rainbow(speed, smoothness, colors, alpha) {
        var ptr0 = isLikeNone(colors) ? 0 : passArrayJsValueToWasm0(colors, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.animator_enable_rainbow(this.__wbg_ptr, speed, smoothness, ptr0, len0, alpha);
    }
    /**
    * @param {number} speed
    */
    set_rainbow_speed(speed) {
        wasm.animator_set_rainbow_speed(this.__wbg_ptr, speed);
    }
    /**
    */
    enable_smoke() {
        wasm.animator_enable_smoke(this.__wbg_ptr);
    }
    /**
    * @param {number} delta_time
    */
    update(delta_time) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.animator_update(retptr, this.__wbg_ptr, delta_time);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} width
    * @param {number} height
    */
    resize(width, height) {
        wasm.animator_resize(this.__wbg_ptr, width, height);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Window_5012736c80a01584 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_document_8554450897a855b9 = function(arg0) {
        const ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getElementById_f56c8e6a15a6926d = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_addColorStop_2d996a72d8108847 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).addColorStop(arg1, getStringFromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_1a96a01603ec2d8b = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof HTMLCanvasElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_width_53a5bd0268e99485 = function(arg0) {
        const ret = getObject(arg0).width;
        return ret;
    };
    imports.wbg.__wbg_height_6fb32e51e54037ae = function(arg0) {
        const ret = getObject(arg0).height;
        return ret;
    };
    imports.wbg.__wbg_getContext_69ec873410cbba3c = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_a0c4f0da6392b8ca = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof CanvasRenderingContext2D;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_setglobalAlpha_9634eb9fde01bb01 = function(arg0, arg1) {
        getObject(arg0).globalAlpha = arg1;
    };
    imports.wbg.__wbg_setfillStyle_98060f7b257936ba = function(arg0, arg1) {
        getObject(arg0).fillStyle = getObject(arg1);
    };
    imports.wbg.__wbg_beginPath_46864742afca3d8a = function(arg0) {
        getObject(arg0).beginPath();
    };
    imports.wbg.__wbg_fill_e279a178cb36bb43 = function(arg0) {
        getObject(arg0).fill();
    };
    imports.wbg.__wbg_createLinearGradient_e48d60b67efe0497 = function(arg0, arg1, arg2, arg3, arg4) {
        const ret = getObject(arg0).createLinearGradient(arg1, arg2, arg3, arg4);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_arc_11d1da7b92e7ab3e = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_clearRect_384c24b287b30369 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_fillRect_a5a5da573f0412b5 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_restore_f1e60b7a6baea463 = function(arg0) {
        getObject(arg0).restore();
    };
    imports.wbg.__wbg_save_3cc576b49ad4c50d = function(arg0) {
        getObject(arg0).save();
    };
    imports.wbg.__wbg_newnoargs_76313bd6ff35d0f2 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_1084a111329e68ce = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_3093d5d1f7bcb682 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_3bcfc4d31bc012f8 = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_86b222e13bdf32ed = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_e5a3fe56f8be9485 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_random_4a6f48b07d1eab14 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;



    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined' && Object.getPrototypeOf(module) === Object.prototype)
    ({module} = module)
    else
    console.warn('using deprecated parameters for `initSync()`; pass a single object instead')

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined' && Object.getPrototypeOf(module_or_path) === Object.prototype)
    ({module_or_path} = module_or_path)
    else
    console.warn('using deprecated parameters for the initialization function; pass a single object instead')

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('animasi_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;

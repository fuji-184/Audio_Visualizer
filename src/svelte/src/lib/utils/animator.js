import init, { Animator } from '$lib/pkg/animasi.js';

// Create a class to manage multiple animation effects
class AnimationEffects {
    constructor() {
      this.instances = new Map();
      this.wasmInitPromise = null;
      this.canvasId = []
    }
  
    async ensureWasmInitialized() {
      if (!this.wasmInitPromise) {
        this.wasmInitPromise = init().catch(err => {
          this.wasmInitPromise = null; // Reset on failure
          throw err;
        });
      }
      return this.wasmInitPromise;
    }
  
    async createInstance(canvasId, containerElement, { enableRainbow = false, enableSmoke = false } = {}) {

      // Wait for WASM initialization before proceeding
      await this.ensureWasmInitialized();
    
      if (this.canvasId.includes(canvasId)) {
        
        console.log(`Animation instance for canvas '${canvasId}' already exists`);

        let instance = this.instances.get(canvasId);

        let mirrorCanvas = document.createElement('canvas');
        mirrorCanvas.style.position = 'absolute';
        mirrorCanvas.style.top = '0';
        mirrorCanvas.style.left = '0';
        mirrorCanvas.style.width = '100%';
        mirrorCanvas.style.height = '100%';
        mirrorCanvas.style.zIndex = '-1';
        containerElement.appendChild(mirrorCanvas);

        // Sesuaikan ukuran mirrorCanvas dengan canvas asli
        mirrorCanvas.width = instance.canvas.width;
        mirrorCanvas.height = instance.canvas.height;

        // // Simpan mirrorCanvas untuk keperluan lain jika diperlukan
        // if (!this.mirrors.has(canvasId)) {
        //     this.mirrors.set(canvasId, []);
        // }
        // this.mirrors.get(canvasId).push(mirrorCanvas);

        // Buat render loop untuk menggambar ulang canvas utama ke mirrorCanvas
        const renderLoop = () => {
            const ctx = mirrorCanvas.getContext('2d');
            if (ctx) {
            // Salin gambar dari canvas utama ke mirrorCanvas
            ctx.clearRect(0, 0, mirrorCanvas.width, mirrorCanvas.height);
            ctx.drawImage(instance.canvas, 0, 0, mirrorCanvas.width, mirrorCanvas.height);
            }
            requestAnimationFrame(renderLoop);
        };

        // Mulai render loop
        renderLoop();

        return instance;
      }

      if (!this.canvasId.includes(canvasId)){
        this.canvasId.push(canvasId)
      }
  
      // Create canvas element
      const canvas = document.createElement('canvas');
      canvas.id = canvasId;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '-1';
  
      // Add canvas to container
      containerElement.appendChild(canvas);
  
      const instance = {
        canvas,
        animator: null,
        animationFrame: null,
        lastTime: 0
      };
  
      // Set initial size
      const { innerWidth, innerHeight } = window;
      instance.canvas.width = innerWidth;
      instance.canvas.height = innerHeight;
  
      // Create animator after setting canvas size
      instance.animator = new Animator(canvasId);
      
      // Setup resize handler
      const resizeHandler = () => {
        const { innerWidth, innerHeight } = window;
        instance.canvas.width = innerWidth;
        instance.canvas.height = innerHeight;
        if (instance.animator) {
          instance.animator.resize(innerWidth, innerHeight);
        }
      };
      window.addEventListener('resize', resizeHandler);
      instance.resizeHandler = resizeHandler;
      
      if (enableRainbow) {
        instance.animator.enable_rainbow(0.05, 0.0000000000000000000000000000000000000000001, null, 0.2);
      }
      if (enableSmoke) {
        instance.animator.enable_smoke();
      }
      
      // Start animation loop
      const animate = (currentTime) => {
        if (!instance.lastTime) instance.lastTime = currentTime;
        const deltaTime = (currentTime - instance.lastTime) / 1000;
        instance.lastTime = currentTime;
        
        if (instance.animator) {
          instance.animator.update(deltaTime);
        }
        
        instance.animationFrame = requestAnimationFrame(animate);
      };
      
      instance.animationFrame = requestAnimationFrame(animate);
      this.instances.set(canvasId, instance);
      
      return instance;
    }
  
    destroyInstance(canvasId) {
      const instance = this.instances.get(canvasId);
      if (!instance) return;
  
      if (instance.animationFrame) {
        cancelAnimationFrame(instance.animationFrame);
      }
      
      if (instance.resizeHandler) {
        window.removeEventListener('resize', instance.resizeHandler);
      }
      
      if (instance.canvas && instance.canvas.parentNode) {
        instance.canvas.parentNode.removeChild(instance.canvas);
      }
      
      this.instances.delete(canvasId);
    }
  
    destroyAll() {
      for (const canvasId of this.instances.keys()) {
        this.destroyInstance(canvasId);
      }
    }
  }
  
  // Create a singleton instance
  const animationEffects = new AnimationEffects();
  
  // Export the singleton instance
  export default animationEffects;
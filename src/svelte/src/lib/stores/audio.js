// src/lib/stores/audioStore.js
import { writable } from 'svelte/store';

// Store untuk SharedAudioProcessor
export const sharedProcessorStore = writable(null);

// Store untuk status apakah audio telah dimulai
export const clicked = writable(false);

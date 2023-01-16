import { writable } from 'svelte/store';

export var cart = writable({});
export var total = writable({ 'ar': 0, 'darab': 0, 'feltet': [] });
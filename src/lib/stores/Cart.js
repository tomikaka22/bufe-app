import { writable } from "svelte/store";

export var cart = writable({});
export var total = writable([0,0])
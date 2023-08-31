export function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

// Megformázza az árakat.
export function forint(x) {
	return x.toLocaleString({ style:'currency', currency:'HUF' }).replace(',',' ') + ' Ft';
}

// Nyomásra változik a border-radius és úgy marad ameddig a target sorozatosan nyomkodva van.
export function touchRadius(node, newRadius, duration = 500) {
	const originalRadius = getComputedStyle(node).borderRadius;
	let timeOut;

	function clear() {
		node.style.borderRadius = originalRadius;
		timeOut = undefined;
	}

	function handleClick() {
		if (timeOut) {
			clearTimeout(timeOut);
			timeOut = setTimeout(clear, duration);

		} else {
			timeOut = setTimeout(clear, duration);
			node.style.borderRadius = newRadius;
			document.dispatchEvent(new CustomEvent('touchRadius', { detail: node }));
		}
	}

	document.addEventListener('touchRadius', (e) => {
		if (e.detail !== node) {
			clearTimeout(timeOut);
			clear();
		}
	}, false);

	node.addEventListener('click', handleClick, false);
	return {
		destroy() {
			node.removeEventListener('click', handleClick, false);
			document.removeEventListener('touchRadius', (e) => {
				if (e.detail !== node) {
					clearTimeout(timeOut);
					clear();
				}
			}, false);
		}
	};
}
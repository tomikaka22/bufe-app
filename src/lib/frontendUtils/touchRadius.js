// Nyomásra változik a border-radius és úgy marad ameddig a target sorozatosan nyomkodva van. (Undorító spagetti de működik)
let counter = 10;
let interval;
let targetRunning;
let oldRadiusRunning;

export function touchRadius(target, radius, oldRadius, duration = 65) {
	target.style.borderRadius = radius;
	counter++;

	if (targetRunning && targetRunning !== target) {targetRunning.style.borderRadius = oldRadiusRunning;}
	if (counter > 1) {clearInterval(interval); counter = 10; run();}

	function run() {
		targetRunning = target;
		oldRadiusRunning = oldRadius;
		interval = setInterval(() => {
			if (counter > 1) {
				counter--;
			}
			else if (counter === 1) {
				clearInterval(interval);
				target.style.borderRadius = oldRadius;
			}
		}, duration);
	}
}
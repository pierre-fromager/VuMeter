
const rangeWrapClassSelector = '.rangewrap';
const rangeClassSelector = '.range';
const bubbleClassSelector = '.bubble';

let vumDemoTimer = undefined;
let vumDemoTimerInterval = 600;

const runningDemo = () => {
    return (undefined !== vumDemoTimer);
}

const changeDemoTimerInterval = (eltprox) => {
    if (undefined !== eltprox.id) {
        const ran = runningDemo();
        if (ran) stopDemo();
        vumDemoTimerInterval = eltprox.value;
        if (ran) startDemo();
    }
}

const startDemo = () => {
    if (false === runningDemo()) {
        vumDemoTimer = window.setInterval(
            updateAllvum,
            vumDemoTimerInterval
        );
    }
}

const stopDemo = () => {
    if (true === runningDemo()) {
        window.clearInterval(vumDemoTimer);
        vumDemoTimer = undefined;
    }
}

const toggleDemo = (eltprox) => {
    if (undefined !== eltprox.id) {
        const ran = runningDemo();
        document.getElementById(eltprox.id).value = (ran)
            ? 'Start'
            : 'Stop';
        if (ran) {
            stopDemo();
        } else {
            startDemo();
        }
    }
}

const setBubble = (range, bubble) => {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val + 'ms';
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.6}px))`;
}

document.addEventListener('DOMContentLoaded', () => {
    const allRanges = document.querySelectorAll(rangeWrapClassSelector);
    allRanges.forEach(wrap => {
        const range = wrap.querySelector(rangeClassSelector);
        const bubble = wrap.querySelector(bubbleClassSelector);
        range.addEventListener('input', () => {
            setBubble(range, bubble);
        });
        setBubble(range, bubble);
    });
});

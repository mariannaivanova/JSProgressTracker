import { PROGRESS_RING_DEFAULTS } from './constants.js';

const animateCheckbox = document.getElementById("animateCheckbox");
const hideCheckbox = document.getElementById("hideCheckbox");
const input = document.getElementById("input");
let animationInterval = null;


class ProgressRing {
    constructor(parentElement, options = {}) {
        this.state = {
            ...PROGRESS_RING_DEFAULTS,
            ...options,
            progress: options.initialProgress || PROGRESS_RING_DEFAULTS.initialProgress
        };

        this.container = document.createElement('div');
        parentElement.appendChild(this.container);
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        this.container.className = 'progress-ring-container';
        this.container.style.width = `${this.state.radius}px`;
        this.container.style.height = `${this.state.radius}px`;

        this.ringElement = document.createElement('div');
        this.ringElement.className = 'progress-ring';
        Object.assign(this.ringElement.style, {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
        });

        const holeSize = this.state.radius - this.state.thickness * 2;
        this.holeElement = document.createElement('div');
        this.holeElement.className = 'progress-hole';
        Object.assign(this.holeElement.style, {
            width: `${holeSize}px`,
            height: `${holeSize}px`,
            backgroundColor: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '2',
            pointerEvents: 'none'
        });

        this.container.appendChild(this.ringElement);
        this.container.appendChild(this.holeElement);
        this.updateProgress();
    }

    updateProgress() {
        const degrees = (this.state.progress / 100) * 360;
        this.ringElement.style.transition = `background ${this.state.animationDuration}ms ease-out`;
        this.ringElement.style.background = `conic-gradient(
        ${this.state.color} 0deg,
        ${this.state.color} ${degrees}deg,
        ${this.state.backgroundColor} ${degrees}deg,
        ${this.state.backgroundColor} 360deg
      )`;
    }

    set progress(value) {
        this.state.progress = Math.max(0, Math.min(100, value));
        this.updateProgress();
    }
}

if (typeof window !== 'undefined') {
    window.ProgressRing = ProgressRing;
}

export const progressRing = new ProgressRing(
    document.getElementById('progressRingContainer'),
    {initialProgress: 50}
);


input.addEventListener('input', function (event) {
    let value = parseInt(event.target.value) || 0;
    if (isNaN(value)) {
        value = 0;
    }
    value = Math.max(0, Math.min(100, value)).toString();
    input.value = value;
    progressRing.progress = value;

    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
});

animateCheckbox.addEventListener("change", function () {
    if (animateCheckbox.checked) {
        hideCheckbox.checked = false;
        input.disabled = true;
        input.style.opacity = "0.7"
        animate();
    } else {
        input.disabled = false;
        input.style.opacity = "1";
        stopAnimation();
    }
})

hideCheckbox.addEventListener("change", function () {
    if (hideCheckbox.checked) {
        animateCheckbox.checked = false;
        document.getElementById('progressRingContainer').style.opacity = "0";
        stopAnimation();
        document.getElementById('progressRingContainer').style.transition = "opacity 0.5s ease";
        document.getElementById('progressRingContainer').style.opacity = "0";
    } else {
        document.getElementById('progressRingContainer').style.transition = "opacity 0.5s ease";
        document.getElementById('progressRingContainer').style.opacity = "1";
    }
});


const stopAnimation = () => {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
}

const animate = () => {
    stopAnimation();
    document.getElementById('progressRingContainer').style.transition = "opacity 0.5s ease";
    document.getElementById('progressRingContainer').style.opacity = "1";
    let value = 0;
    progressRing.progress = value;
    animationInterval = setInterval(() => {
        value += 0.005;
        value = value <= 100 ? value : 0;
        progressRing.progress = value;
        input.value = Math.round(value);
    }, 1);
}


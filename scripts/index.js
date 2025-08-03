document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById("input");
    const progress = document.getElementById("value");
    let animationInterval = null;
    input.addEventListener('input', function(event) {
        let value = parseInt(event.target.value) || 0;
        value = Math.max(0, Math.min(100, value)).toString();
        event.target.value = value;
        progress.style.setProperty('--p', value);
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
    });

    input.value = "50";
    progress.style.setProperty('--p', "50");

    const animateCheckbox = document.getElementById("animateCheckbox");
    const hideCheckbox = document.getElementById("hideCheckbox");
    animateCheckbox.addEventListener("change", function() {
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

    hideCheckbox.addEventListener("change", function() {
        if (hideCheckbox.checked) {
            animateCheckbox.checked = false;
            progress.style.opacity = "0";
            stopAnimation();
        } else {
            progress.style.opacity = "1";
        }
    });

    function animate() {
        stopAnimation();
        const progress = document.getElementById("value");
        progress.style.opacity = "1";
        let value = 0;
        progress.style.setProperty('--p', "0");
        animationInterval = setInterval(() => {
            value += 0.005;
            value = value <= 100 ? value : 0;
            progress.style.setProperty('--p', value);
            input.value = Math.round(value);
        }, 1);
    }

    function stopAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
    }
});

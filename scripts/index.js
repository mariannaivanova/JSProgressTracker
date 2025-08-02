document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById("input");
    const progress = document.getElementById("value");

    input.addEventListener('input', function(event) {
        let value = parseInt(event.target.value) || 0;
        value = Math.max(0, Math.min(100, value)).toString();
        event.target.value = value;
        progress.style.setProperty('--p', value);
    });

    input.value = "50";
    progress.style.setProperty('--p', "50");
});


function animate() {
    const progress = document.getElementById("value");
    let value = 0;

    setInterval(() => {
        value += 1;
        value = value <= 100 ? value : 0;
        progress.textContent = value;
    }, 1000);

}
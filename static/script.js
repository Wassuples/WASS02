// script.js

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('.help-button').classList.toggle('dark-mode');
    document.querySelector('.help-modal-content').classList.toggle('dark-mode');
});

// Help Button and Modal
function toggleModal() {
    const modal = document.getElementById('helpModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Hide modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === document.getElementById('helpModal')) {
        document.getElementById('helpModal').style.display = 'none';
    }
}

// Stream Control
let isStreaming = true;
document.getElementById('startStopBtn').addEventListener('click', function() {
    isStreaming = !isStreaming;
    this.textContent = isStreaming ? 'Stop Stream' : 'Start Stream';
    fetch('/toggle_stream');
});

// Sync FPS Slider and Input
function updateFrameRate() {
    const slider = document.getElementById('frameRateSlider');
    const input = document.getElementById('frameRateInput');
    const fps = slider.value;
    input.value = fps;
    fetch(`/change_frame_rate/${fps}`);
}

function updateFrameRateFromInput() {
    const input = document.getElementById('frameRateInput');
    const slider = document.getElementById('frameRateSlider');
    const fps = input.value;
    slider.value = fps;
    fetch(`/change_frame_rate/${fps}`);
}

document.getElementById('frameRateSlider').addEventListener('input', updateFrameRate);
document.getElementById('frameRateInput').addEventListener('input', updateFrameRateFromInput);

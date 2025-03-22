document.addEventListener('DOMContentLoaded', () => {
    // Fade in container
    const container = document.querySelector('.container');
    container.style.opacity = 0;
    setTimeout(() => {
        container.style.transition = 'opacity 1.5s ease';
        container.style.opacity = 1;
    }, 100);

    // Input field effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.boxShadow = '0 0 15px #ff00ff';
        });
        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
            input.style.boxShadow = 'none';
            validateInput(input, index);
        });
    });

    // Button animations
    const predictBtn = document.querySelector('.predict-btn');
    const backBtn = document.querySelector('.back-btn');

    if (predictBtn) {
        predictBtn.addEventListener('mouseover', () => {
            predictBtn.style.animation = 'pulse 1s infinite';
        });
        predictBtn.addEventListener('mouseout', () => {
            predictBtn.style.animation = 'none';
        });
        predictBtn.addEventListener('click', (e) => {
            if (!validateForm()) {
                e.preventDefault();
                showError('Please ensure all values are between 0 and 1');
            } else {
                predictBtn.style.transform = 'scale(0.95)';
                setTimeout(() => predictBtn.style.transform = 'scale(1)', 200);
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('mouseover', () => {
            backBtn.style.animation = 'pulse 1s infinite';
        });
        backBtn.addEventListener('mouseout', () => {
            backBtn.style.animation = 'none';
        });
        backBtn.addEventListener('click', () => {
            backBtn.style.transform = 'scale(0.95)';
            setTimeout(() => backBtn.style.transform = 'scale(1)', 200);
        });
    }

    // Result animation (if on result page)
    const prediction = document.querySelector('.prediction');
    if (prediction) {
        prediction.style.opacity = 0;
        prediction.style.transform = 'translateY(20px)';
        setTimeout(() => {
            prediction.style.transition = 'all 0.8s ease';
            prediction.style.opacity = 1;
            prediction.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Input validation
function validateInput(input, index) {
    const value = parseFloat(input.value);
    const label = input.previousElementSibling;
    if (isNaN(value) || value < 0 || value > 1) {
        input.style.borderColor = '#ff4444';
        label.style.color = '#ff4444';
        return false;
    } else {
        input.style.borderColor = '#00ffcc';
        label.style.color = '#00ffcc';
        return true;
    }
}

function validateForm() {
    const inputs = document.querySelectorAll('input');
    let isValid = true;
    inputs.forEach((input, index) => {
        if (!validateInput(input, index)) {
            isValid = false;
        }
    });
    return isValid;
}

// Show error message
function showError(message) {
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        document.querySelector('.container').appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.opacity = 1;
    setTimeout(() => {
        errorDiv.style.transition = 'opacity 0.5s ease';
        errorDiv.style.opacity = 0;
    }, 3000);
}

// Add keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    .error-message {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 68, 68, 0.9);
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1em;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(styleSheet);
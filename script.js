document.addEventListener('DOMContentLoaded', () => {

    // Screens
    const askScreen = document.getElementById('ask-screen');
    const tryAgainScreen = document.getElementById('try-again-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const giftRevealScreen = document.getElementById('gift-reveal-screen');

    // Buttons
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const retryBtn = document.getElementById('retry-btn');
    const openGiftBtn = document.getElementById('open-gift-btn');
    const backToStartBtn = document.getElementById('back-to-start-btn');

    // --- Sound Effects (Optional - create dummy placeholder objects) ---
    // const clickSound = new Audio('click.mp3'); 

    // --- Navigation Functions ---

    function showScreen(screen) {
        // Hide all screens
        [askScreen, tryAgainScreen, celebrationScreen, giftRevealScreen].forEach(s => {
            s.classList.add('hidden');
            s.classList.remove('active-screen');
        });
        // Show target
        screen.classList.remove('hidden');
        screen.classList.add('active-screen');
    }

    // 1. "No" Button -> Redirect to Try Again
    noBtn.addEventListener('click', () => {
        showScreen(tryAgainScreen);
    });

    // 2. "Retry" Button -> Back to Ask
    retryBtn.addEventListener('click', () => {
        showScreen(askScreen);
    });

    // 3. "Yes" Button -> Celebration
    yesBtn.addEventListener('click', () => {
        showScreen(celebrationScreen);
        startConfetti();
    });

    // 4. "Open Gift" Button -> Reveal Gifts
    openGiftBtn.addEventListener('click', () => {
        showScreen(giftRevealScreen);
    });

    // 5. Restart Logic
    const handleRestart = () => {
        showScreen(askScreen);
        stopConfetti();
    };

    // restartBtn removed
    backToStartBtn.addEventListener('click', handleRestart);


    // --- Confetti Logic ---
    let confettiAnimationId = null;

    function startConfetti() {
        // Stop any existing confetti before starting new
        stopConfetti();

        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#ff4d6d', '#ff8fa3', '#fff0f3', '#ffd700', '#5afffa'];

        for (let i = 0; i < 150; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 12 + 6,
                speed: Math.random() * 4 + 2,
                angle: Math.random() * 360,
                spin: Math.random() < 0.5 ? 1 : -1
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            pieces.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); // Center rotation
                ctx.restore();

                p.y += p.speed;
                p.angle += 3 * p.spin;

                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
            });

            confettiAnimationId = requestAnimationFrame(draw);
        }

        draw();
    }

    function stopConfetti() {
        if (confettiAnimationId) {
            cancelAnimationFrame(confettiAnimationId);
            confettiAnimationId = null;
            // Clear canvas
            const canvas = document.getElementById('confetti-canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});

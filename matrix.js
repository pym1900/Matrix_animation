const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Initialize canvas width and height
let cw = window.innerWidth;
let ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;

window.addEventListener('resize', () => {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
    maxColumns = Math.floor(frameWidth / fontSize); // Update maxColumns based on frame width
}, true);

// Load the background image
const bgImage = new Image();
bgImage.src = 'IMG_0992.JPG'; // Ensure this path is correct relative to your HTML file

// Define character array, including only '0' and '1'
const charArr = "01".split("");
const maxCharCount = 100; // Reduce the max character count to reduce density
const charStreamArr = [];
const fontSize = 15;

// Define the frame where characters should appear
const frameX = 45;
const frameY = 78;
const frameWidth = 1428;
const frameHeight = 650;

let maxColumns = Math.floor(frameWidth / fontSize);

let frames = 0;

class FallingChar {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.value = this.getRandomChar();
    }

    // Get a random character from the array
    getRandomChar() {
        return charArr[Math.floor(Math.random() * charArr.length)];
    }

    // Draw character
    draw(ctx) {
        // Randomly change character
        if (Math.random() > 0.98) { // Adjust probability to control frequency of change
            this.value = this.getRandomChar();
        }

        ctx.fillStyle = "rgba(0, 255, 0, 1)"; // Brighter green color with full opacity
        ctx.font = `${fontSize}px sans-serif`;

        // Add glow effect
        ctx.shadowColor = "rgba(0, 255, 0, 1)";
        ctx.shadowBlur = 20; // Increase shadowBlur to enhance glow effect

        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > frameY + frameHeight) {
            this.y = frameY;
            this.value = this.getRandomChar(); // Update character when resetting position
        }
    }
}

class CharStream {
    constructor(x) {
        this.chars = [];
        this.speed = (Math.random() * fontSize * 0.5) / 5 + (fontSize * 0.5) / 5;
        this.generateStream(x);
    }

    generateStream(x) {
        const streamLength = Math.floor(Math.random() * 10) + 5; // Each stream has 5 to 15 characters
        for (let i = 0; i < streamLength; i++) {
            const y = frameY - (fontSize * i);
            const char = new FallingChar(x, y, this.speed);
            this.chars.push(char);
        }
    }

    draw(ctx) {
        this.chars.forEach(char => char.draw(ctx));
    }
}

const update = () => {
    if (charStreamArr.length < maxCharCount && frames % 50 === 0) { // Increase frame interval to further reduce density
        const x = Math.floor(Math.random() * maxColumns) * fontSize + frameX;
        const charStream = new CharStream(x);
        charStreamArr.push(charStream);
    }

    // Draw the background image
    ctx.drawImage(bgImage, 0, 0, cw, ch);

    // Clear only the canvas area within the frame with a semi-transparent rectangle
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(frameX, frameY, frameWidth, frameHeight);

    charStreamArr.forEach(stream => stream.draw(ctx));

    frames++;
    requestAnimationFrame(update);
}

// Start the animation only after the background image has loaded
bgImage.onload = () => {
    update();
};

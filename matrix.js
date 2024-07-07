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
        maxColumns = Math.floor(cw / fontSize);
}, true);

// 定义字符数组，包括英文字母和部分特殊字符
const charArr = "abcdefghijklmnopqrstuvwxyz12345678АВГДЄЅЗИѲІКЛМНѮѺПЧРСТѴФХѰѾЦ".split("");
const maxCharCount = 300;
const fallingCharArr = [];
const fontSize = 13;
let maxColumns = Math.floor(cw / fontSize);

let frames = 0;

class FallingChar{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) /4;
    }

    // Draw char 
    draw(ctx) {
        this.value = charArr[Math.floor(Math.random() * charArr.length)].toUpperCase();
        ctx.fillStyle = "rgba(0,255,0)";
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed; 
        
        if(this.y > ch){
            this.y = (Math.random() * ch) / 2 - 50;
            this.x = (Math.floor(Math.random) * maxColumns) * fontSize;
            this.speed = Math.floor(Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4; 
        }
    }
}

const update = () =>{
    if(fallingCharArr.length < maxCharCount){
        let fallingChar = new FallingChar(
            Math.floor(Math.random() * maxColumns) * fontSize,
            (Math.random() * ch) / 2 - 50
        );
        fallingCharArr.push(fallingChar)
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, cw, ch);

    for(let i = 0; i < fallingCharArr.length; i++){
        if(frames % 2 === 0){
            fallingCharArr[i].draw(ctx)
        }
    }

    frames++;
    requestAnimationFrame(update);
}

update();
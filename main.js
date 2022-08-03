
//////////////////////////////////////////////////// FUNCTIONS

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const rands = () => Math.random() < 0.5 ? -1 : 1;

//////////////////////////////////////////////////// VARIABLES

const canvas = document.querySelector('canvas');
const image = document.querySelector('img');
const c = canvas.getContext('2d');
const mouse = {};
const parts = [];

//////////////////////////////////////////////////// LOOP

let h = 0;
let pissed = 0;

const loop = () => {
  
  ////////////////////////////////////////////////// CLEAR

  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

  ////////////////////////////////////////////////// ADD

  h += 5;
  if (mouse.down) {
    for (let i = 0; i < 100; i++) {
      parts.push({
        x: mouse.x - 10,
        y: mouse.y + image.naturalHeight / 5,
        r: 5,
        h: h,
        vx: rands() * Math.random(),
        vy: 0,
        g: 1 + 5 * Math.random()
      });
    }
  }

  ////////////////////////////////////////////////// SET TITLE

  document.title = `literal-unicorn-piss ${parts.length}`;

  ////////////////////////////////////////////////// ITERATE

  for (let i = parts.length - 1; i >= 0; --i) {
    const p = parts[i];

    //////////////////////////////////////////////// MOVE
    
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.g;

    //////////////////////////////////////////////// DRAW

    c.beginPath();
    c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    c.closePath();
    c.fillStyle = `hsl(${p.h}, 100%, 50%)`;
    c.fill();

    //////////////////////////////////////////////// DIE

    if (p.y > canvas.height) {
      pissed++;
      parts.splice(i, 1);
    }
  }

  ////////////////////////////////////////////////// TEXT

  c.font = '30px Comic Sans MS';
  c.fillStyle = 'black';
  c.textAlign = 'left';
  c.textBaseline = 'top';
  c.fillText(`how much unicorn piss u have wasted: ${pissed} drops`, 10, 15);

  ////////////////////////////////////////////////// CURSOR

  c.drawImage(image, mouse.x - image.naturalWidth / 2, mouse.y - image.naturalHeight / 2);

  requestAnimationFrame(loop);
};

//////////////////////////////////////////////////// EVENTS

addEventListener('load', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  requestAnimationFrame(loop);
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener('mousemove', ({x, y}) => {
  mouse.x = x;
  mouse.y = y;
});

addEventListener('mousedown', () => {
  mouse.down = true;
});

addEventListener('mouseup', () => {
  mouse.down = false;
});

addEventListener('touchstart', ({touches}) => {
  mouse.x = touches[0].clientX;
  mouse.y = touches[0].clientY;
  mouse.down = true;
});

addEventListener('touchmove', ({touches}) => {
  mouse.x = touches[0].clientX;
  mouse.y = touches[0].clientY;
});

addEventListener('touchend', () => {
  mouse.down = false;
});
const CANVAS = 400;
const midpt = CANVAS / 2; 


const HUB_R_INNER = 12;
const HUB_R_OUTER = 22;
const BAR_START_R = 28;
const BAR_MAX_LEN = 140;


const HOUR_RING_R = BAR_START_R + BAR_MAX_LEN; //comeback
const HOUR_RING_W = 0.5
;


const BG_COLOR       = '#7A7373'; //wo
const RING_COLOR     = '#C9C3C3'; 
const HUB_FILL       = '#2A2A2A'; 
const HUB_TICK_COLOR = '#595959'; 


const KEY_Y = 0;
const KEY_H = 12;


const palette_hex = [
  '#E66229', '#E39939', '#EBE76A', '#BCE366',
  '#72C26D', '#469C84', '#3F889E', '#4052A8',
  '#7454AB', '#9554AB', '#A25CAB', '#BF5878'
];
let palette = [];

function setup() {
  createCanvas(CANVAS, CANVAS);
  angleMode(RADIANS);
  colorMode(HSB,360,100,100); 
  noStroke();


  palette = palette_hex.map(c => color(c));
}

function draw() {
  background(BG_COLOR);

  const s = second();   
  const m = minute(); 
  const h24 = hour();
  const h12Idx = h24 % 12;

drawHourKey(); 

  push();
  translate(midpt, midpt);

  drawHourBoundaryRing();
  drawHub();
  drawGrowingLines(s, m, palette[h12Idx]);

  pop();
}


function drawHourKey() {
  noStroke();
  for (let i = 0;i < 12; i++) {

    const x0 = Math.round((i) * width / 12);
    const x1 = Math.round((i+1) * width / 12);
  fill(palette[i]);
    rect(x0, KEY_Y, x1 - x0, KEY_H);
  }
}


function drawHourBoundaryRing() {
noFill();
  stroke(RING_COLOR);
strokeWeight(HOUR_RING_W);
  ellipse(0, 0, HOUR_RING_R * 2, HOUR_RING_R * 2);
  noStroke();
}


function drawHub() {
  noFill();
 stroke(RING_COLOR);
  strokeWeight(0.5);
ellipse(0, 0, HUB_R_OUTER * 2, HUB_R_OUTER * 2);
 noStroke();
}

function drawGrowingLines(sec, min, col) {
  const stepLen = BAR_MAX_LEN / 60;
  stroke(col);
  strokeCap(SQUARE);
  strokeWeight(3);

  for (let i = 0; i < 60; i++) {
    let steps = min + (i <= sec?1:0); 
    if (steps > 60) steps = 60;

    const len = steps * stepLen;
    const a = TWO_PI * (i / 60) - HALF_PI;

   const x1 = BAR_START_R * Math.cos(a);
  const y1 = BAR_START_R * Math.sin(a); //checkcheckcheck
   const x2 = (BAR_START_R + len) * Math.cos(a);
    const y2 = (BAR_START_R + len) * Math.sin(a);
    line(x1, y1, x2, y2);
  }
}

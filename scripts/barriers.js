import { yellow } from "./data.js";
import { turn } from "./game.js";
import { checkFinished, showRemainingWalls, changeTurn } from "./game.js";

let currentIndex;
export let horizontalBarriers = [];
for (let i = 0; i < 72; i++) {
  horizontalBarriers.push(0);
}
export let verticalBarriers = [];
for (let i = 0; i < 81; i++) {
  verticalBarriers.push(0);
}
export let circles = [];
for (let i = 0; i < 64; i++) {
  circles.push(0);
}
export let visibilityChecker = 0;

export function visibilityCheckerOff() {
  visibilityChecker = 0;
}

document.querySelectorAll('.js-circles').forEach((circle, index) => {
  const vBarrier1 = document.querySelector(`.js-v-barrier-${index}`);
  const vBarrier2 = document.querySelector(`.js-v-barrier-${index + 8}`);
  const hBarrier1 = document.querySelector(`.js-h-barrier-${index + Math.floor(index / 8)}`);
  const hBarrier2 = document.querySelector(`.js-h-barrier-${index + Math.floor(index / 8) + 1}`);
  circle.addEventListener('mouseover', () => {
    if (!visibilityChecker && !circles[index]) {
      addVisibility(vBarrier1, vBarrier2, hBarrier1, hBarrier2, index);
    }
  });
  circle.addEventListener('mouseout', () => {
    if (!visibilityChecker && !circles[index]) {
      removeVisibility();
    }
  });
  circle.addEventListener('click', () => {
    if(!circles[index]) {
      if (!visibilityChecker) {
        visibilityChecker = 1;
        currentIndex = index;
        addVisibility(vBarrier1, vBarrier2, hBarrier1, hBarrier2, index);
        clickBarriers(vBarrier1, 'vertical', index);
        clickBarriers(vBarrier2, 'vertical', index);
        clickBarriers(hBarrier1, 'horizontal', index);
        clickBarriers(hBarrier2, 'horizontal', index);
      }
      else {
        removeVisibility();
        visibilityChecker = 0;
      }
    }
  });
});

function addVisibility(vBarrier1, vBarrier2, hBarrier1, hBarrier2, index) {
  if(checkFinished()) return;
  removeVisibility();
  if(verticalDuplicating(index) && horizontalDuplicating(index)) {
    circles[index] = 1;
    document.querySelectorAll('.js-circles')[index].classList.add('default-cursor');
    return;
  }
  if(horizontalDuplicating(index)) {
    vBarrier1.classList.add('visible');
    vBarrier2.classList.add('visible');
    vBarrier1.classList.add(`hover-${(turn === yellow) ? 'yellow' : 'blue'}`);
    vBarrier2.classList.add(`hover-${(turn === yellow) ? 'yellow' : 'blue'}`);
    return;
  }
  if(verticalDuplicating(index)){
    hBarrier1.classList.add('visible');
    hBarrier2.classList.add('visible');
    hBarrier1.classList.add(`hover-${(turn === yellow) ? 'yellow' : 'blue'}`);
    hBarrier2.classList.add(`hover-${(turn === yellow) ? 'yellow' : 'blue'}`);
    return;
  }
  else {
    vBarrier1.classList.add('visible');
    vBarrier2.classList.add('visible');
    hBarrier1.classList.add('visible');
    hBarrier2.classList.add('visible');
    vBarrier1.classList.add(`hover-${(turn === yellow) ? 'yellow' : 'blue'}`);
    vBarrier2.classList.add(`hover-${(turn === yellow) ? 'yellow' : 'blue'}`);
    hBarrier1.classList.add(`hover-${(turn === yellow) ? 'yellow' : 'blue'}`);
    hBarrier2.classList.add(`hover-${(turn === yellow) ? 'yellow' : 'blue'}`);
  }
}

export function removeVisibility() {
  document.querySelectorAll('.js-h-barrier').forEach((hBarrier, index) => {
    if(horizontalBarriers[index] === 0){
      hBarrier.classList.remove('visible');
      if(hBarrier.classList.contains('hover-yellow')) hBarrier.classList.remove('hover-yellow');
      if(hBarrier.classList.contains('hover-blue')) hBarrier.classList.remove('hover-blue');
    } 
  });
  document.querySelectorAll('.js-v-barrier').forEach((vBarrier, index) => {
    if(verticalBarriers[index] === 0){
      vBarrier.classList.remove('visible');
      if(vBarrier.classList.contains('hover-yellow')) vBarrier.classList.remove('hover-yellow');
      if(vBarrier.classList.contains('hover-blue')) vBarrier.classList.remove('hover-blue');
    } 
  });
}

function clickBarriers(htmlBarrier, direction, index) {
  if(direction === 'vertical'){
    htmlBarrier.addEventListener('click', () => {
      if(!circles[index] && htmlBarrier.classList.contains('visible') && index === currentIndex && !verticalDuplicating(index) && turn.walls > 0) {
        verticalBarriers[index] = 1;
        verticalBarriers[index + 8] = 1;
        displayBarriers();
        circles[index] = 1;
        document.querySelectorAll('.js-circles')[index].classList.add('default-cursor');
        visibilityChecker = 0;
        turn.walls--;
        showRemainingWalls();
        changeTurn();
      }
    });
  }
  else {
    htmlBarrier.addEventListener('click', () => {
      if(!circles[index] && htmlBarrier.classList.contains('visible') && index === currentIndex && !horizontalDuplicating(index) && turn.walls > 0) {
        horizontalBarriers[index + Math.floor(index / 8)] = 1;
        horizontalBarriers[index + Math.floor(index / 8) + 1] = 1;
        displayBarriers();
        circles[index] = 1;
        document.querySelectorAll('.js-circles')[index].classList.add('default-cursor');
        visibilityChecker = 0;
        turn.walls--;
        showRemainingWalls();
        changeTurn();
      }
    });
  }
}

function displayBarriers() {
  document.querySelectorAll('.js-h-barrier').forEach((hBarrier, index) => {
    if(horizontalBarriers[index] === 0) {
      if (hBarrier.classList.contains('visible')) hBarrier.classList.remove('visible');
    }
    else {
      hBarrier.classList.add('visible');
      if(!hBarrier.classList.contains('barrier-blue') && !hBarrier.classList.contains('barrier-yellow')){
        hBarrier.classList.add(`barrier-${(turn === yellow) ? 'yellow' : 'blue'}`);
      }
      hBarrier.classList.add('default-cursor');
    }
  });
  document.querySelectorAll('.js-v-barrier').forEach((vBarrier, index) => {
    if(verticalBarriers[index] === 0) {
      if (vBarrier.classList.contains('visible')) vBarrier.classList.remove('visible');
    }
    else {
      vBarrier.classList.add('visible');
      if(!vBarrier.classList.contains('barrier-blue') && !vBarrier.classList.contains('barrier-yellow')){
        vBarrier.classList.add(`barrier-${(turn === yellow) ? 'yellow' : 'blue'}`);
      }
      vBarrier.classList.add('default-cursor');
    }
  });
}

function verticalDuplicating(index) {
  return verticalBarriers[index] === 1 || verticalBarriers[index + 8] === 1;
}

function horizontalDuplicating(index) {
  return horizontalBarriers[index + Math.floor(index / 8)] === 1 || horizontalBarriers[index + Math.floor(index / 8) + 1] === 1;
}
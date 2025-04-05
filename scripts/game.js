import './map.js';
import './barriers.js';
import { horizontalBarriers } from './barriers.js';
import { verticalBarriers, visibilityCheckerOff, removeVisibility } from './barriers.js';
import { yellow, blue } from './data.js';
import { displayMap } from './map.js';

export let turn = (Math.random() < 0.5) ? yellow : blue;
document.querySelector('.js-turn-title').innerHTML = `Turn: ${(turn === yellow) ? 'Blue' : 'Red'}`;
showRemainingWalls();

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'ArrowUp') {
    if(turn.row === 0) return;
    if(horizontalBarriers[turn.row * 9 + turn.column - 9] === 1) return;
    if(checkFinished()) return;
    turn.row--;
    if(yellow.row === blue.row && yellow.column === blue.column) turn.row--;
    displayMap();
    changeTurn();
    visibilityCheckerOff();
    removeVisibility();
  }
  if(event.key === 'ArrowDown') {
    if(turn.row === 8) return;
    if(horizontalBarriers[turn.row * 9 + turn.column] === 1) return;
    if(checkFinished()) return;
    turn.row++;
    if(yellow.row === blue.row && yellow.column === blue.column) turn.row++;
    displayMap();
    changeTurn();
    visibilityCheckerOff();
    removeVisibility();
  }
  if(event.key === 'ArrowLeft') {
    if(turn.column === 0) return;
    const cellNumber = turn.row * 9 + turn.column;
    if(verticalBarriers[cellNumber - Math.floor(cellNumber / 9) - 1] === 1) return;
    if(checkFinished()) return;
    turn.column--;
    if(yellow.row === blue.row && yellow.column === blue.column) turn.column--;
    displayMap();
    changeTurn();
    visibilityCheckerOff();
    removeVisibility();
  }
  if(event.key === 'ArrowRight') {
    if(turn.column === 8) return;
    const cellNumber = turn.row * 9 + turn.column;
    if(verticalBarriers[cellNumber - Math.floor(cellNumber / 9)] === 1) return;
    if(checkFinished()) return;
    turn.column++;
    if(yellow.row === blue.row && yellow.column === blue.column) turn.column++;
    displayMap();
    changeTurn();
    visibilityCheckerOff();
    removeVisibility();
  }
});

export function changeTurn() {
  turn = (turn === yellow) ? blue : yellow;
  document.querySelector('.js-turn-title').innerHTML = `Turn: ${(turn === yellow) ? 'Blue' : 'Red'}`;
}

export function showRemainingWalls() {
  document.querySelector('.js-blue-walls').innerHTML = `Walls: ${blue.walls}`;
  document.querySelector('.js-yellow-walls').innerHTML = `Walls: ${yellow.walls}`;
}

export function checkFinished() {
  if(yellow.row === 8) {
    document.querySelector('.js-winner').innerHTML = 'Blue Wins';
    document.querySelector('.js-winner').classList.add('yellow');
    return true;
  }
  if(blue.row === 0) {
    document.querySelector('.js-winner').innerHTML = 'Red Wins';
    document.querySelector('.js-winner').classList.add('blue');
    return true;
  }
  return false;
}
import { yellow, blue } from "./data.js";
import { checkFinished } from "./game.js";

let html = '';
for (let i = 0; i < 9; i++) {
  if (i === 8) html += `<div class="cells-row js-cells-row"></div>`;
  else html += `
    <div class="cells-row js-cells-row"></div>
    <div class="h-barriers js-h-barriers"></div>
  `;
}

document.querySelector('.js-table-container').innerHTML = html;

html = '';

for (let i = 0; i < 9; i++) {
  if (i === 8) html += `<div class="cells js-cells"></div>`;
  else html += `
    <div class="cells js-cells"></div>
    <div class="v-barrier js-v-barrier"></div>
  `;
}

document.querySelectorAll('.js-cells-row').forEach((row) => {
  row.innerHTML = html;
});

html = '';
for (let i = 0; i < 9; i++) {
  if (i === 8) html += '<div class="h-barrier js-h-barrier"></div>';
  else html += '<div class="h-barrier js-h-barrier"></div><div class="circles js-circles"></div>';
}
document.querySelectorAll('.js-h-barriers').forEach((row) => {
  row.innerHTML = html;
});

attachIndexToClasses(document.querySelectorAll('.js-cells'), 'cell');

document.querySelector('.js-cell-4').innerHTML = '<img src="images/icons8-chess-com (1).svg" class="pawns">';
document.querySelector('.js-cell-76').innerHTML = '<img src="images/icons8-chess-com.svg" class="pawns">';

attachIndexToClasses(document.querySelectorAll('.js-circles'), 'circle');
attachIndexToClasses(document.querySelectorAll('.js-h-barrier'), 'h-barrier');
attachIndexToClasses(document.querySelectorAll('.js-v-barrier'), 'v-barrier');

function attachIndexToClasses(htmlArray, className) {
  htmlArray.forEach((htmlOption, index) => {
    htmlOption.classList.add(`js-${className}-${index}`);
  });
}

export function displayMap() {
  document.querySelectorAll('.js-cells').forEach((cell) => {
    cell.innerHTML = '';
  })
  document.querySelectorAll('.js-cells')[yellow.row * 9 + yellow.column].innerHTML = '<img src="images/icons8-chess-com (1).svg" class="pawns">';
  document.querySelectorAll('.js-cells')[blue.row * 9 + blue.column].innerHTML = '<img src="images/icons8-chess-com.svg" class="pawns">';
  checkFinished();
}
const selectPanel = document.getElementById('select-panel');
const playPanel = document.getElementById('play-panel');
const resultPanel = document.getElementById('result-panel');
const wonText = document.getElementById('won-text');
// отримуємо всі клітинки
const cells = document.getElementsByClassName('play-cell');

let inGame = true;
let botIsMoving = false;
let xIsMoving = true;
let gameWithBot = false;

// Три панелі відображаються по черзі. 
// Змінити видимість панелі відповідно до параметра show. 
// Видима панель має реагувати на користувацькі події.
function displayPanel(panel, show) {
  if (show) {
    panel.style.opacity = '1';
    panel.style.pointerEvents = "auto";
  }
  else {
    panel.style.opacity = '0';
    panel.style.pointerEvents = "none";
  }
}

// Видалити класи клітинок, що відповідають за X, O, WON
function clearCells() {
  for (const cell of cells) {
    cell.style.pointerEvents = "auto";
    cell.classList.remove('x-sign');
    cell.classList.remove('o-sign');
    cell.classList.remove('won');
    cell.innerHTML = '';
  }
}

// Ініціювати гру: перший хід користуваа Х-ом. 
// Всі клітики очищаються від X, O, WON
// Активною стає панель гри.
function start(withBot) {
  inGame = true;
  xIsMoving = true;
  botIsMoving = false;
  gameWithBot = withBot;
  clearCells();
  displayPanel(selectPanel, false);
  displayPanel(playPanel, true);
}

// Додати до клітинки клас X або O
function setSign(cell){
  if (xIsMoving) {
    cell.style.fontSize = '124px';
    cell.innerHTML = '×';   
    cell.classList.add('x-sign');
  } else {
    cell.style.fontSize = '115px';
    cell.innerHTML = 'o';
    cell.classList.add('o-sign');    
  }
}

// Обробник події oncklick() 
// Хід користувача
function userMove(cell) {
  // the cell becomes unclickable
  cell.style.pointerEvents = "none";
  // покинути клітинку, якщо черга бота
  if (botIsMoving) {
    return;
  }
  // покинути клітинку, якщо кінець гри або клітинка вже заповнена
  if (!inGame || cell.classList[1] === 'x-sign' || cell.classList[1] === 'o-sign') {
    return;
  }
  // встановити в клітинку черговий символ
  setSign(cell);    

  // передати хід боту
  if (gameWithBot) {
    botIsMoving = true;
  }  
  
  checkGameStatus(); //  
  xIsMoving = !xIsMoving;
};

// Хід бота
function botMove() {
  // створити масив порожніх клітинок
  let array = []; // creating empty array...we'll store unclicked cells indexes
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList[1]) { // cell hadn't been clicked
      array.push(i); // inserting unclicked boxes number/index inside array
    }
  }

  // вибрати випадкову клітинку для бота
  if (array.length > 0) { // there are still unselected cells
    let randCellNum = array[Math.floor(Math.random() * array.length)]; // generate random index

  const randCell = cells[randCellNum];  

  // встановити в клітинку черговий символ
  setSign(randCell);
  botIsMoving = false;
  checkGameStatus();
}

xIsMoving = !xIsMoving;
}

// Аналіз гри після чергового ходу
function checkGameStatus() {
  // get the second class value for each cell
  const sign1 = cells[0].classList[1];
  const sign2 = cells[1].classList[1];
  const sign3 = cells[2].classList[1];
  const sign4 = cells[3].classList[1];
  const sign5 = cells[4].classList[1];
  const sign6 = cells[5].classList[1];
  const sign7 = cells[6].classList[1];
  const sign8 = cells[7].classList[1];
  const sign9 = cells[8].classList[1];
  
  // check TOP LINE
  if (sign1 && sign1 === sign2 && sign1 === sign3) {
  
    defineWinner(sign1);
  
    cells[0].classList.add('won');
    cells[1].classList.add('won');
    cells[2].classList.add('won');
  } else if //check MIDDLE LINE
    (sign4 && sign4 === sign5 && sign4 === sign6) {
  
    defineWinner(sign4);
  
    cells[3].classList.add('won');
    cells[4].classList.add('won');
    cells[5].classList.add('won');
  } else if //check BOTTOM LINE
    (sign7 && sign7 === sign8 && sign7 === sign9) {
  
    defineWinner(sign7);
  
    cells[6].classList.add('won');
    cells[7].classList.add('won');
    cells[8].classList.add('won');
  } else if //check LEFT COLUMN
    (sign1 && sign1 === sign4 && sign1 === sign7) {
  
    defineWinner(sign1);
  
    cells[0].classList.add('won');
    cells[3].classList.add('won');
    cells[6].classList.add('won');
  } else if //check MIDDLE COLUMN
    (sign2 && sign2 === sign5 && sign2 === sign8) {
  
    defineWinner(sign2);
  
    cells[1].classList.add('won');
    cells[4].classList.add('won');
    cells[7].classList.add('won');
  } else if //check RIGHT COLUMN
    (sign3 && sign3 === sign6 && sign3 === sign9) {
  
    defineWinner(sign3);
  
    cells[2].classList.add('won');
    cells[5].classList.add('won');
    cells[8].classList.add('won');
  } else if //check MAIN DIAGONAL
    (sign1 && sign1 === sign5 && sign1 === sign9) {
  
    defineWinner(sign1);
  
    cells[0].classList.add('won');
    cells[4].classList.add('won');
    cells[8].classList.add('won');
  } else if // check ADDITIONAL DIAGONAL
    (sign3 && sign3 === sign5 && sign3 === sign7) {
  
    defineWinner(sign3);
  
    cells[2].classList.add('won');
    cells[4].classList.add('won');
    cells[6].classList.add('won');
  
  } else if //game is tied
    (sign1 && sign2 && sign3 && sign4 && sign5 && sign6 && sign7 && sign8 && sign9) {
    inGame = false; // stop the game
    wonText.textContent = "Game is tied!"; // Match has been drawn
  
    setTimeout(() => {
      displayResult();
    }, 2000);
  } else {
    if (gameWithBot && botIsMoving) {
      setTimeout(() => {
        botMove();
      }, 700);
    }
  }
}

// Відображення панелі результату
function displayResult() {
  displayPanel(playPanel, false);
  displayPanel(resultPanel, true);
}

// визначення переможного знака
function defineWinner(sign) {
  let winner;
  sign == 'x-sign' ? winner = 'x' : winner = 'o';
  
  wonText.innerHTML = `Player&nbsp;<span>${winner}</span>&nbsp;won the game!`;
  
  setTimeout(() => {
    displayResult();
  }, 1000);
  
  inGame = false; // stop the game
}

function run() {
  displayPanel(resultPanel, false);
  displayPanel(selectPanel, true);
}

function restart() {
  displayPanel(resultPanel, false);
  start(gameWithBot);
}

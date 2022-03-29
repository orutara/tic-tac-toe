// import { switchMessage } from './modules/switchMessage';
// import { resultWin } from './modules/resultWin';
// import { finishGame } from './modules/finishGame';
// import { markSign } from './modules/markSign';
// import { initScore } from './modules/initScore';


// 各種定義
let flag = false;
let counter = 9;
let scoreCounterCircle = 0;
let scoreCounterCross = 0;
let winningLine = null;
const fieldBoxes = document.querySelectorAll('.bl_field_box');
const fieldBoxesArray = [].map.call(fieldBoxes, element => {
  return element;
});
// const squaresArray = [].slice.call(squares); // IE11対策
const messages = document.querySelectorAll('.bl_message_turnText');
// const messagesArray = [].slice.call(messages); // IE11対策
const resetBtn = document.getElementById('js_reset');
let scoreCircle = document.querySelector('.bl_order_gameCount__circle');
let scoreCross = document.querySelector('.bl_order_gameCount__cross');

//localStrageからスコアを表示
window.addEventListener('load', function () {
  if (scoreCircle.innerText === '') {
    scoreCircle.innerHTML = '-';
  } else {
    localStorage.setItem('scoreCircle', '');
  }
});
//localStrageに保存

//ターンバーの切り替え関数
const switchBar = () => {
  const turnBar = document.querySelector('.box.turn');
  console.log(turnBar);
};
switchBar();
console.log(messages);

// メッセージの切り替え関数
const switchMessage = id => {
  messages.forEach(message => {
    if (message.id === id) {
      message.classList.remove('js_hidden');
    } else {
      message.classList.add('js_hidden');
    }
  });
};
switchMessage('js_turn__gameStart');

// // 勝利判定のパターン関数
const filterById = (targetArray, idArray) => {
  return targetArray.filter(e => {
    return e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2];
  });
};
// // 勝利判定パターン
const line1 = filterById(fieldBoxesArray, ['1-1', '1-2', '1-3']);
const line2 = filterById(fieldBoxesArray, ['2-1', '2-2', '2-3']);
const line3 = filterById(fieldBoxesArray, ['3-1', '3-2', '3-3']);
const line4 = filterById(fieldBoxesArray, ['1-1', '2-1', '3-1']);
const line5 = filterById(fieldBoxesArray, ['1-2', '2-2', '3-2']);
const line6 = filterById(fieldBoxesArray, ['1-3', '2-3', '3-3']);
const line7 = filterById(fieldBoxesArray, ['1-1', '2-2', '3-3']);
const line8 = filterById(fieldBoxesArray, ['1-3', '2-2', '3-1']);
const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
// // 勝利判定関数
const resultWin = symbol => {
  // some: 1つでも条件を満たしていればTrueを返す
  const result = lineArray.some(line => {
    // every: 全て条件を満たしていればTrueを返す
    const subResult = line.every(fieldBoxes => {
      if (symbol === 'maru') {
        return fieldBoxes.classList.contains('js_maru-checked');
      } else if (symbol === 'batsu') {
        return fieldBoxes.classList.contains('js_batsu-checked');
      }
    });

    if (subResult) {
      winningLine = line;
    }

    return subResult;
  });
  return result;
};

// ゲーム終了時の関数
const finishGame = () => {
  // 全てのマスをクリック不可にする
  fieldBoxesArray.forEach(fieldBox => {
    fieldBox.classList.add('js_unclickable');
    console.log('ok');
  });

  // 勝った時のマス目をハイライトする
  // if (winningLine) {
  //     winningLine.forEach((square) => {
  //         square.classList.add('js-highLight');
  //     });
  // }

  // リセットボタン表示
  // resetBtn.classList.remove('js-hidden');
};

// ゲームの初期化の関数
const initGame = () => {
  flag = false;
  counter = 9;
  winningLine = null;
  fieldBoxes.forEach(fieldBox => {
    fieldBox.classList.remove('js_maru-checked');
    fieldBox.classList.remove('js_batsu-checked');
    fieldBox.classList.remove('js_unclickable');
    // fieldBox.classList.remove('js_highLight');
  });
  switchMessage('js_turn__gameStart');
  // resetBtn.classList.add('js-hidden');
};
resetBtn.addEventListener('click', function () {
  initGame();
});

// マスをクリックした時のイベント発火

const markSign = () => {
  fieldBoxes.forEach(fieldBox => {
    fieldBox.addEventListener('click', () => {
      if (flag === true) {
        fieldBox.classList.add('js_batsu-checked');
        fieldBox.classList.add('js_unclickable');

        if (resultWin('batsu')) {
          switchMessage('js_win__cross');
          scoreCounterCross++;
          finishGame();
          return;
        }

        switchMessage('js_turn__circle');
        flag = false;
      } else {
        fieldBox.classList.add('js_maru-checked');
        fieldBox.classList.add('js_unclickable');
        if (resultWin('maru')) {
          switchMessage('js_win__circle');
          scoreCounterCircle++;
          finishGame();
          return;
        }

        switchMessage('js_turn__cross');
        flag = true;
      }

      counter--;
      // 引き分け判定
      if (counter === 0) {
        switchMessage('js_draw');
        finishGame();
      }
    });
  });
};
markSign();

// ゲームの初期化 ✅
// ゲームリスタート ✅
// クリックして○✖︎をつける ✅
// 勝ち負けを判断する ✅
// メッセージの切り替え ✅
// ゲームの状況をデータとして保存
// ローカルストレージにゲームのスコアを保存
// 敵のアルゴリズムを作る
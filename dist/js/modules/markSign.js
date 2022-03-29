export const markSign = () => {
  squaresArray.forEach(square => {
    square.addEventListener('click', () => {
      if (flag === true) {
        square.classList.add('js-maru-checked');
        square.classList.add('js-unclickable');

        if (isWinner('maru')) {
          setMessage('maru-win');
          gameOver();
          return;
        }

        setMessage('batsu-turn');
        flag = false;
      } else {
        square.classList.add('js-batsu-checked');
        square.classList.add('js-unclickable');

        if (isWinner('batsu')) {
          setMessage('batsu-win');
          gameOver();
          return;
        }

        setMessage('maru-turn');
        flag = true;
      }

      counter--;
      // 引き分け判定
      if (counter === 0) {
        setMessage('draw');
        gameOver();
      }
    });
  });
};
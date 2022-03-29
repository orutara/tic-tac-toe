export const initScore = () => {
  flag = false;
  counter = 9;
  winningLine = null;
  squaresArray.forEach(square => {
    square.classList.remove('js-maru-checked');
    square.classList.remove('js-batsu-checked');
    square.classList.remove('js-unclickable');
    square.classList.remove('js-highLight');
  });
  switchMessage('batsu-turn');
  resetBtn.classList.add('js-hidden');
};
export const finishGame = () => {
    // 全てのマスをクリック不可にする
    squaresArray.forEach(square => {
        square.classList.add('js-unclickable');
    });

    // 勝った時のマス目をハイライトする
    if (winningLine) {
        winningLine.forEach(square => {
            square.classList.add('js-highLight');
        });
    }

    // リセットボタン表示
    resetBtn.classList.remove('js-hidden');
};
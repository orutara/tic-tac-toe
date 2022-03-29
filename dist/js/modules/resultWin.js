export const resultWin = symbol => {
  // some: 1つでも条件を満たしていればTrueを返す
  const result = lineArray.some(line => {
    // every: 全て条件を満たしていればTrueを返す
    const subResult = line.every(square => {
      if (symbol === 'maru') {
        return square.classList.contains('js-maru-checked');
      } else if (symbol === 'batsu') {
        return square.classList.contains('js-batsu-checked');
      }
    });

    if (subResult) {
      winningLine = line;
    }

    return subResult;
  });
  return result;
};
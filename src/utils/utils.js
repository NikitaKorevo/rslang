export function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function shuffleArray(array) {
  const copyArray = array.slice();

  for (let i = copyArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
}

export function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}

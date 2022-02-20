const CONSTANTS = {
  baseUrl: 'https://rslang-react-app.herokuapp.com/',
  endPoint: {
    users: 'users',
    signIn: 'signin',
    words: 'words',
    statistics: 'statistics'
  },
  textBookPagesAmount: 29,
  firstTextBookPage: 0,
  firstTextBookGroup: 0,
  wordStatus: {
    hard: 'hard',
    learned: 'learned'
  },
  word: {
    difficulty: "1",
    optional: {
      progress: {
        totalGames: 0,
        wins: 0,
        failed: 0,
        leftUntil: 0
      },
      status: 'new'
    }
  }
};

export default CONSTANTS;

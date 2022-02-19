import AuthStore from '../store/authStore';
const baseUrl = 'https://rslang-react-app.herokuapp.com';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const {userId, token, refreshToken} = userInfo;

export const createUserWord = async (wordId, word) => {
    const response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    });
    if (response.status == 401) {
      new AuthStore().updateTokens();        
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const {userId, token, refreshToken} = userInfo;
      response = await fetch(`${baseUrl}/users/${userId}/words`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
      });
    }
    if(response.status == 200) {
          return true;
    }
    return false;
}

export const updateUserWord = async (wordId, word) => {
      const response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
          method: 'PUT',
          withCredentials: true,
          headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(word)
      });
      if (response.status == 401) {
            new AuthStore().updateTokens();        
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const {userId, token, refreshToken} = userInfo;
            response = await fetch(`${baseUrl}/users/${userId}/words`, {
              method: 'PUT',
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(word)
            });
      }
      if(response.status == 200) {
            return true;
      } else {
            return false;
      }
}

export const getUserWords = async () => {

  let response = await fetch(`${baseUrl}/users/${userId}/words`, {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      if (response.status == 401 || response.status == 402) {
        new AuthStore().updateTokens();        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const {userId, token, refreshToken} = userInfo;
        response = await fetch(`${baseUrl}/users/${userId}/words`, {
          method: 'GET',
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
      }
      const data = await response.json();
      return data;
};

// export const isUserWord = async (wordId) => {
//       let res = false;
//       let response;
//             response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
//                   method: 'GET',
//                   withCredentials: true,
//                   headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Accept': 'application/json',
//                   }
//                 });    
//           if (response.status == 401) {
//             new AuthStore().updateTokens();        
//             const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//             const {userId, token, refreshToken} = userInfo;
//             response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
//               method: 'GET',
//               withCredentials: true,
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Accept': 'application/json',
//               }
//             });
//           }
//           if(response.status == 200) {
//                 res = true; 
//           } else if(response.status == 404) {
//                 res = false;
//           } else {
//                 res = -1;
//           }
//       return res;
// };

export const isUserWord = async (wordId) => {
      const data = await getUserWords();
      console.log(data);
      const res = data.findIndex((item) => {
           return item.wordId === wordId;
      });
      return (res === -1) ? false : true;
};

export const getUserWord = async (wordId) => {
      let response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
            method: 'GET',
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            }
          });
          if (response.status == 401) {
            new AuthStore().updateTokens();        
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const {userId, token, refreshToken} = userInfo;
            response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
              method: 'GET',
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
              }
            });
          }

      const data = await response.json();
      return data;
    };

export const changeStatusWord = async(wordId, newStatusWord) => {
      const word = {};
      const isSuchWord = await isUserWord(wordId);
      if (isSuchWord === true) {
            const temp = await getUserWord(wordId);
            word.optional = temp.optional;
            word.difficulty = temp.difficulty;
            word.optional.status = newStatusWord;
            if (newStatusWord === 'learned' && word.difficulty === 'hard') {
                  const response = await fetch(`${baseUrl}/words/${wordId}`);
                  const data = await response.json();
                  word.difficulty = data.group + '';
            }
            const data = await updateUserWord(wordId, word);
            if (data === true) {
                  return true;
            }
      } 
return false;
}

export const changeDifficultyWord = async(wordId, newDifficultyWord) => {
      const word = {};
      const isSuchWord = await isUserWord(wordId);
      if (isSuchWord === true) {
            const temp = await getUserWord(wordId);
            word.optional = temp.optional;
            word.difficulty = newDifficultyWord;
            const data = await updateUserWord(wordId, word);
            if (data === true) {
                  return true;
            }
      }
return false;
}

export const toCalcProgressWord = async(difficulty, wordId, rightAnswer) => {
      let resStatus = false;
      const word = {};
      const isSuchWord = await isUserWord(wordId);
      console.log(isSuchWord);
      if (isSuchWord === true) {
            const tempWord = await getUserWord(wordId);
            word.difficulty = tempWord.difficulty;
            word.optional = tempWord.optional;
            word.optional.progress.totalGames += 1;
            if(rightAnswer === false) {
                  word.optional.progress.failed += 1;
                  word.optional.progress.leftUntil = 3;
                  if(word.optional.status !== 'new') {
                        word.optional.status = 'new';
                  }
                  resStatus = await updateUserWord(wordId, word);
            } else if (rightAnswer === true) {
                  word.optional.progress.wins += 1;
                  word.optional.progress.leftUntil -= 1;
                  if(word.optional.progress.leftUntil <= 0) {
                        if(word.optional.status !== 'learned') {
                              word.optional.status = 'learned';
                              if(word.difficulty === 'hard') {
                                    const response = await fetch(`${baseUrl}/words/${wordId}`);
                                    const data = await response.json();
                                    word.difficulty = data.group + '';
                              }
                        }
                        word.optional.progress.leftUntil = 0;
                  }
                  resStatus = await updateUserWord(wordId, word);
            }
      } else if (isSuchWord === false) {
            word.difficulty = difficulty;
            word.optional = {};
            word.optional.progress = {};
            word.optional.status = 'new';
            word.optional.progress.totalGames = 1;
            word.optional.progress.wins = (rightAnswer === true) ? 1 : 0;
            word.optional.progress.failed = (rightAnswer === false) ? 1 : 0;
            word.optional.progress.leftUntil = (rightAnswer === true) ? 2 : 3;
            resStatus = await createUserWord(wordId, word);
      }
      return resStatus;
}


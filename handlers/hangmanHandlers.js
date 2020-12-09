const { words } = require('../data/words');

// write your handlers here...
const handleWords = (req, res) => {
    res.status(200).json({ status: 200, data: words});
}

const handleWordId = (req, res) => {
    const wordId = req.params.id;
    if(words.some((word) => word.id == wordId)){
        const word = words.filter((word) => word.id == wordId);
        res.status(200).json({ status: 200, data: word});
    } else {
        res.status(404).json({ status: 404, error: 'Id Not Found'});
    }
}

const handleWord = (req, res) => {
    const randomNum = Math.floor((Math.random() * 11));
    const word = words[randomNum];
    const hiddenWord = { id: word.id, letterCount: word.letterCount}

    res.status(200).json({ status: 200, data: hiddenWord});
}

const handleGuess = (req, res) => {
    const wordId = req.params.id;
    const wordLetter = req.params.letter;

    if(words.some((word) => word.id == wordId)){
        const wordObj = words.filter((word) => word.id == wordId);
        const wordArr = wordObj[0].word.split('');
        let booleanArr = [];

        wordArr.forEach((letter, index) => {
            if(letter == wordLetter){
                booleanArr.push(true);
            } else {
                booleanArr.push(false);
            }
        })

        res.status(200).json({status: 200, data: wordArr, arr: booleanArr});
    } else {
        res.status(404).json({ status: 404, error: 'Id Not Found'});
    }
}

module.exports = { handleWords, handleWordId, handleWord, handleGuess };

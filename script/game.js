/**
 * Contains functions for playing a game quiz thing where the goal is to practice conjugating.
 * @author Connor Bell
 */

let currSet;

function getSelected() {
    let possibleWords = {};
    let possibleForms = {};

    for (let element of document.getElementsByClassName("check-box")) {
        if (element.classList.contains("words")) {
            let currWordsList = VERBS[element.dataset.cat][element.dataset.sub];
            Object.keys(currWordsList).forEach(word => {
                possibleWords[word] = currWordsList[word];
            });
        } else if (element.classList.contains("forms")) {
            possibleForms[element.dataset.name] = element.innerHTML;
        }
    }

    console.log(possibleWords);

    return {
        "words": possibleWords,
        "forms": possibleForms
    };
}

/**
 *
 */
function newWord() {
    let selected = getSelected();
    let selectedWords = selected["words"];
    let selectedForms = selected["forms"];
    //TODO: if empty do something special
    let newWordIndex = rand(0, Object.keys(selectedWords).length - 1);
    let newWord = Object.keys(selectedWords)[newWordIndex];
    let newWordIdentification = selectedWords[newWord];


    let newFormIndex = rand(0, Object.keys(selectedForms).length - 1);
    let newFormID = Object.keys(selectedForms)[newFormIndex];
    let newFormName = selectedForms[newFormID];
    let allConj = conjugateWord(newWord, newWordIdentification);
    let conj;
    if (newFormID.endsWith("NEG")) {
        conj = allConj[newFormID.substring(0, newFormID.length - 3)][1];
    } else {
        conj = Array.isArray(allConj[newFormID]) ? allConj[newFormID][0] : allConj[newFormID];
    }
    currSet = {
        "word": newWord,
        "conjugation": conj,
        "form_name": newFormName
    };
    console.log(currSet);

    document.getElementById("currWordP").innerText = newWord;
    document.getElementById("currFormP").innerText = newFormName;
    document.getElementById("answerP").innerText = conj;
}

/**
 *
 * @param answer
 */
function checkAnswer(answer) {

}

/**
 * Returns a random word, conjugation, and conjugated form of the word in a dictionary.
 * Picks from the values given in the function call
 *
 * @needs <p>{@link rand} from util.js</p> <p>{@link conjugateWord} from conjugator.js</p>
 *
 * @param selectedWords {Object.<string, string>} list of words and identifications to get a random word from
 * @param selectedConjugationNames {string[]} list of conjugation names to get a random one from
 * @returns {{conjugation_name: string, conjugated_word: string, word: string}}
 */
function getRandomSet(selectedWords, selectedConjugationNames) {
    let word = Object.keys(selectedWords)[rand(0, selectedWords.length)];
    let wordIdentification = selectedWords[word];
    let conjugationName = selectedConjugationNames[rand(0, selectedConjugationNames.length)];
    let conjugatedWord = conjugateWord(word, wordIdentification)[conjugationName];
    return {
        "word": word,
        "conjugation_name": conjugationName,
        "conjugated_word": conjugatedWord
    }
}
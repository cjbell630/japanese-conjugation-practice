/**
 * Contains functions for playing a game quiz thing where the goal is to practice conjugating.
 * @author Connor Bell
 */

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
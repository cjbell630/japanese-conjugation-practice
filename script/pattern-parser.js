/**
 * Contains functions for parsing conjugation patterns.
 * @author Connor Bell
 */

/**
 * Regex that breaks a string into groups containing alphabetic, Japanese, numeric, and symbolic characters.
 *
 * @see getGroupedStringsFromPattern
 * @thanks regex101.com :)
 * @type {RegExp}
 */
const GROUPING_REGEX = /([a-zA-Z])|([ぁ-んァ-ン一-龯㐀-䶿！：／])|([0-9])|(.)/gm

/**
 * Gets the first group number shown to be matched in the supplied RegExpMatchArray.
 *
 * @author Connor Bell, originally written in Python
 *
 * @param matchArray {RegExpMatchArray} the array to parse
 * @returns {number} the first group number of the character matched in `matchArray`
 */
function getGroupNum(matchArray) {
    /*  every char is in group 0 (index 0 in the array parameter),
        so start at group 1 to skip over it.
        see the comment in {@link getGroupedStringsFromPattern}
        for more details */
    for (let i = 1; i < matchArray.length; i++) {
        if (matchArray[i] !== undefined) {
            // return first non-zero group this character is present in
            //ya know, I guess that's technically always gonna be the second group this char is in, isn't it?
            return i;
        }
    }
    return -1;
}

/**
 * Separates the given string into substrings based on changes in group numbers matched by {@link GROUPING_REGEX}.
 *
 * @author Connor Bell, originally written in Python
 *
 * @example
 * "wordう>お+うわ" -> ["word", "う", ">", "お", "+", "うわ"]
 *
 * @param pattern {string} the pattern to parse
 * @returns {string[]} substrings of `pattern` separated by group changes
 */
function getGroupedStringsFromPattern(pattern) {
    let matches = [...pattern.matchAll(GROUPING_REGEX)];
    let grouped = [];
    let prevGroupNum = -1;

    matches.forEach(charMatchArray => {
        // TODO: should I move this comment to getGroupNum?

        /* charMatchArray looks something like this: (replace "currChar" with the actual current character
        [
            "currChar", // currChar (it's always in group 0)                (group 0)
            "",         // currChar if it is alphabetic                     (group 1)
            "",         // currChar if it is a Japanese character           (group 2)
            "",         // currChar if it is a digit                        (group 3)
            ""          // currChar if didn't match any of the other groups (group 4)
        ]
         */
        let currChar = charMatchArray[0];
        let currGroupNum = getGroupNum(charMatchArray);
        //console.log(currChar + " " + currGroupNum);
        if (currGroupNum === prevGroupNum) { // if this character is in the same group as the previous character
            grouped[grouped.length - 1] += currChar; // join it onto the previous group's entry
        } else { // otherwise
            grouped.push(currChar); // add a new group to the list
        }
        prevGroupNum = currGroupNum;
    });
    return grouped;
}

/* TESTS */
let testCases = [
    ["stem+ましょう", "stem,+,ましょう"],
    ["wordう>お+う", "word,う,>,お,+,う"]
];

testCases.forEach(pair => {
    console.log("Expected: " + pair[1] + "\nActual:   " + getGroupedStringsFromPattern(pair[0]));
});
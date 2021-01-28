// this code originally sourced from one of my other projects in a private repository.
// Originally written in Python.

//regex101.com is my best friend
const GROUPING_REGEX = /([a-zA-Z])|([ぁ-んァ-ン一-龯㐀-䶿！：／])|([0-9])|(.)/gm

//works
//TODO: documentation
function getGroupNumAndValue(array) {
    // every char is in group 0 (index 0 in the array parameter),
    // so start at group 1 to skip over it.
    for (let i = 1; i < array.length; i++) {
        if (array[i] !== undefined) {
            // return first non-zero group this character is present in
            return i;
        }
    }
    return -1;
}

//works
//TODO: documentation
function getGroupedStringsFromConjugation(conjugation) {
    let matches = [...conjugation.matchAll(GROUPING_REGEX)];
    let groups = [];
    let prevGroup = -1;

    matches.forEach(charGroups => {
        let currentCharacter = charGroups[0];
        let groupNum = getGroupNumAndValue(charGroups);
        //console.log(currentCharacter + " " + groupNum);
        if (groupNum === prevGroup) { // if this character is in the same group as the previous character
            groups[groups.length - 1] += currentCharacter; // join it onto the previous group's entry
        } else { // otherwise
            groups.push(currentCharacter); // add a new group to the list
        }
        prevGroup = groupNum;
    });
    return groups;
}

/* TESTS */
let testCases = [
    ["stem+ましょう", "stem,+,ましょう"],
    ["wordう>お+う", "word,う,>,お,+,う"]
];

testCases.forEach(pair => {
    console.log("Expected: " + pair[1] + "\nActual:   " + getGroupedStringsFromConjugation(pair[0]));
});
/**
 * Merges two lists by overwriting empty strings in said lists.
 * If the corresponding (same index) items in both lists aren't empty,
 * the item in list1 is favored.
 *
 * @author Connor Bell, originally written in Python
 *
 * @example
 * // returns ["foo", "bar", "goodbye"]
 * merge(
 *      ["foo", "",    "hello"],  // list0
 *      ["",    "bar", "goodbye"] // list1
 * );
 *
 * Requirements:
 * list0.length == list1.length
 * //TODO: throw error
 *
 * @param list0 {string[]} first list
 * @param list1 {string[]} second list (PRIORITY)
 * @returns {string[]} the merged list
 */
function merge(list0, list1) {
    for (let i = 0; i < list0.length; i++) {
        if (list1[i] !== "") {
            list0[i] = list1[i];
        }
    }
    return list0;
}

/**
 * Gets a random number. Works with negative numbers, and in any order (start can be greater than end).
 *
 * @author Connor Bell, originally written in Java
 *
 * @param startInc {number} one end of the range, inclusive
 * @param endInc {number} the other end of the range, inclusive
 * @returns {number} a random number
 */
function rand(startInc, endInc) {
    return Math.floor(Math.random() * (Math.abs(startInc - endInc) + 1)) + Math.min(startInc, endInc);
}

//TODO: doc
//https://stackoverflow.com/a/10869248/12861567
function copy(object) {
    return JSON.parse(JSON.stringify(object))
}

/* TESTS */
[
    [["foo", "", "hello"], ["", "bar", "goodbye"], ["foo", "bar", "goodbye"]]
].forEach(pair => {
    console.log("Expected: " + pair[2] + "\nActual:   " + merge(pair[0], pair[1]));
});
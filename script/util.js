// this code originally sourced from one of my other projects in a private repository.
// Originally written in Python.

//merges lists by priotizing list1.
//lists must be the same length
//TODO: throw error

// vvv OG DOC vvv
// merges two lists by ignoring empty strings in said lists
// ex: merging ["hello", ""] and ["", "goodbye"]
// should return ["hello", "goodbye"]
// if the corresponding items in both lists aren't empty,
// the value in list1 is kept.
//TODO: test!!!
function merge(list0, list1) {
    for (let i = 0; i < list0.length; i++) {
        if (list1[i] !== "") {
            list0[i] = list1[i];
        }
    }
}
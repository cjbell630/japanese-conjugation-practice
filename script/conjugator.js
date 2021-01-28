// this code originally sourced from one of my other projects in a private repository.
// Originally written in Python.

//TODO: maybe reformat the verbs json file to group by type instead of having tos specify each time
// also what about automatic types like a verb ends in xxx it's xxx type?

const VOWEL_GROUPS = {
    "あ": ["あ", "か", "が", "さ", "ざ", "た", "だ", "な", "は", "ば", "ぱ", "ま", "や", "ら", "わ"],
    "い": ["い", "き", "ぎ", "し", "じ", "ち", "ぢ", "に", "ひ", "び", "ぴ", "み", "𛀆", "り", "ゐ"],
    "う": ["う", "く", "ぐ", "す", "ず", "つ", "づ", "ぬ", "ふ", "ぶ", "ぷ", "む", "ゆ", "る", "wu"],
    "え": ["え", "け", "げ", "せ", "ぜ", "て", "で", "ね", "へ", "べ", "ぺ", "め", "𛀁", "れ", "ゑ"],
    "お": ["お", "こ", "ご", "そ", "ぞ", "と", "ど", "の", "ほ", "ぼ", "ぽ", "も", "よ", "ろ", "を"]
}

//patterns is dict
function conjugateFromPatterns(patterns) {

}

//works the same as the python version
//TODO: documentation
//TODO: clean
function getPatternsDictForWord(word, identification) {
    identification = "base." + identification;
    let patterns = { // dict
        "word": "+" + word
    }
    let level = 0;
    let paths = identification.split(".");
    console.log(paths);
    while (level < paths.length) {
        let levelName = paths[level];
        Object.keys(JSON_CONTENTS["verbs"][levelName]["vars"]).forEach(varName => {
            //TODO: this just copies a dict into another dict, can be done cleaner
            patterns[varName] = JSON_CONTENTS["verbs"][levelName]["vars"][varName];
        });
        Object.keys(JSON_CONTENTS["verbs"][levelName]["regular"]).forEach(formName => {
            //TODO: this just copies a dict into another dict, can be done cleaner
            patterns[formName] = Object.keys(patterns).includes(formName) ?
                merge(patterns[formName], JSON_CONTENTS["verbs"][levelName]["regular"][formName]) :
                JSON_CONTENTS["verbs"][levelName]["regular"][formName];
        });

        console.log(levelName);
        console.log(level);
        console.log(paths[level + 1]);
        //console.log(paths[level + 1] in Object.keys(JSON_CONTENTS["verbs"][levelName]["exceptions"]))
        if (level + 1 < paths.length &&
            Object.keys(JSON_CONTENTS["verbs"][levelName]["exceptions"]).includes(paths[level + 1])) {
            console.log("exception");
            level++;
            Object.keys(JSON_CONTENTS["verbs"][levelName]["exceptions"][paths[level]]).forEach(formName => {
                patterns[formName] = Object.keys(patterns).includes(formName) ?
                    merge(patterns[formName], JSON_CONTENTS["verbs"][levelName]["exceptions"][paths[level]][formName]) :
                    JSON_CONTENTS["verbs"][levelName]["exceptions"][paths[level]][formName];
            });
        }
        console.log(patterns);

        level++;
    }
    console.log(patterns);
}

getPatternsDictForWord("成る", "う.つる");

function conjugateWord(word, identification) {
    return conjugateFromPatterns(getPatternsDictForWord(word, identification));
}
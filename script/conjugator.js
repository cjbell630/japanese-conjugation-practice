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

const ALPHA_REGEX = /^[a-zA-Z]+$/;

//patterns is dict
function conjugateFromPatterns(patterns) {
    Object.keys(patterns).forEach(formName => {
        if (Array.isArray(patterns[formName])) {
            console.log("pair (whatever that means)");
        } else {
            //TODO: why did I need to do this?
            patterns[formName] = [patterns[formName]];
        }
        let subformNum = 0;
        Object.values(patterns[formName]).forEach(subform => {
            let split = getGroupedStringsFromConjugation(subform);
            let word = "";
            let count = 0;
            while (count < split.length) {
                let kw = split[count];
                console.log("kw: " + kw);
                console.log("regex match: " + kw.match(ALPHA_REGEX));

                if (kw.match(ALPHA_REGEX) != null) { //TODO: technically should be equal to the entirety of kw
                    console.log("recalling var");
                    //below from python
                    // TODO: the negative could potentially be conditional
                    // ie if I finish and I find that every time I use NEG, it's the pattern for a negative conjugation,
                    // I could just say patterns[kw][subform_num] if it's a list, and patterns[kw] if not

                    let otherForm = kw.endsWith("NEG") ? patterns[kw.substring(0, kw.length - 3)][1] : patterns[kw];
                    console.log(otherForm);
                    word += Array.isArray(otherForm) ? otherForm[0] : otherForm;
                    count++;
                } else if (kw === "+") {
                    console.log("plus sign");
                    word += split[count + 1];
                    count += 2;
                } else if (kw === ">") {
                    console.log("morph");
                    let character = word.charAt(word.length - 1);
                    word = word.substring(0, word.length - 1); // removes the last char
                    // from python:
                    // gets the corresponding vowel version of the final char in the string
                    character = VOWEL_GROUPS[split[count + 1]][VOWEL_GROUPS[split[count - 1]].indexOf(character)];
                    word += character; //TODO: could merge into above line
                    count += 2
                } else if (kw === "-") {
                    console.log("remove");
                    //TODO: remvoe the ! and rework
                    let lengthToRemove = !isNaN(split[count + 1]) ? parseInt(split[count + 1]) :
                        word.endsWith(split[count + 1]) ? split[count + 1].length : 0;
                    console.log("length to remove: " + lengthToRemove);
                    console.log("word before substring: " + word);
                    word = word.substring(0, word.length - lengthToRemove);
                    console.log("word after substring: " + word);
                    count += 2;
                } else if (kw === ":") {
                    console.log("replace " + split[count - 1] + " with " + split[count + 1]);
                    word = word.substring(0, word.length - split[count - 1].length);
                    word += split[count + 1];
                    count += 2;
                } else {
                    console.log("stray char");
                    count++;
                }
                console.log("current word: " + word);
                //return;
            }
            console.log("finished word");
            patterns[formName][subformNum] = word;
            subformNum++;
        });
    });
    return patterns;
}

//works the same as the python version
//TODO: documentation
//TODO: clean
function getPatternsDictForWord(word, identification) {
    console.log("word: " + word);
    console.log("identification: " + identification);
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
        if(Object.keys(JSON_CONTENTS["verbs"][levelName]).includes("regular")) {
            Object.keys(JSON_CONTENTS["verbs"][levelName]["regular"]).forEach(formName => {
                //TODO: this just copies a dict into another dict, can be done cleaner
                patterns[formName] = Object.keys(patterns).includes(formName) ?
                    merge(patterns[formName], JSON_CONTENTS["verbs"][levelName]["regular"][formName]) :
                    JSON_CONTENTS["verbs"][levelName]["regular"][formName];
            });
        }

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
    return patterns;
}

//console.log(conjugateWord("成る", "う.つる"));

function conjugateWord(word, identification) {
    return conjugateFromPatterns(getPatternsDictForWord(word, identification));
}
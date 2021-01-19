"use strict"

function test() {
  let letters = {};
  let singleL = document.getElementById("letters1").value;
  //console.log(document.getElementById("letters1"));
  for (let i=0;i<singleL.length;i++) {
      if (!letters[singleL[i]]) letters[singleL[i]] = 1;
      else letters[singleL[i]]++;
  }

  const hasMultiLetters = document.getElementById("letters2").value.length > 1;
  let multiL = [];
  if (hasMultiLetters) {
    multiL = document.getElementById("letters2").value.split(" ");
  }

  let checkWord = function(word,starti=0) {
    //if (starti) console.log(word,starti) 
    if (hasMultiLetters) {
      for (let i=starti;i<multiL.length;i++) {
        const ml = multiL[i];
        if (ml.length >= word.length) continue;
        /*if (!word.includes(ml)) continue;
        const indexes = [...word.matchAll(new RegExp(ml, 'gi'))].map(a => a.index); //one line match all indices
        for (let j of indexes) {
          let subword = word.substr(0,j) + word.substring(j+i.length);
          if (checkWord(subword,i+1)) return true;
        }
        while (multiL[i+1] === ml) i++; //optimization for multiple repeated mletters*/
        let id = word.indexOf(ml);
        if (id == -1) continue;
        let subword = word.substr(0,id) + "-" + word.substring(id+ml.length);
        //console.log(word,id,subword)
        if (checkWord(subword,i+1)) return true;
        while (multiL[i+1] === ml) i++; //optimization for multiple repeated mletters
      }
    }

    let lcopy = {...letters};
    for (let i=0;i<word.length;i++) {
      if (word[i] == "-") continue;
      if (!lcopy[word[i]]) return false;
      lcopy[word[i]]--;
    }
    return true;
  }

  let words = [...new Set(document.getElementById("words").value.split(","))]
  let ret = ""
  console.log(letters,multiL,words)
  for (let word of words) {
    if (checkWord(word)) ret = ret + " " + word;
  }

  document.getElementById("output").value = ret;
}
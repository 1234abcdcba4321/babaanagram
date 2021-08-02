"use strict"

function calculate() {
  let letters = {};
  let singleL = document.getElementById("letters1").value.toLowerCase();
  //console.log(document.getElementById("letters1"));
  for (let i=0;i<singleL.length;i++) {
    if (!letters[singleL[i]]) letters[singleL[i]] = 1;
    else letters[singleL[i]]++;
  }

  const hasMultiLetters = document.getElementById("letters2").value.length > 1;
  let multiL = [];
  if (hasMultiLetters) {
    multiL = document.getElementById("letters2").value.toLowerCase().split(" ");
  }

  let checkWord = function(word,starti=0) {
    //if (starti) console.log(word,starti) 
    if (hasMultiLetters) {
      for (let i=starti;i<multiL.length;i++) {
        const ml = multiL[i];
        if (ml.length >= word.length) continue; //prevents an "and" multiletter as counting as and
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

  let words = document.getElementById("words").value.toLowerCase().split(" ");
  let ret = ""
  //console.log(letters,multiL,words)
  for (let word of words) {
    if (word == "") ret += "\r";
    else if (checkWord(word)) ret = ret + word + " ";
  }

  document.getElementById("output").value = ret;
}


const defaultList = "algae arrow baba badbad banana bat bed bee belt bird blob boat boba bog bolt bottle book box brick bubble bucket bug burger cake car cart cash cat circle cliff clock cloud cog crab crystal cup dog donut door dot drink drum dust ear egg eye fence fire fish flag flower fofo foliage foot fort frog fruit fungi fungus gate gem ghost grass guitar hand hedge hihat house husk husks ice it jelly jiji keke key knight ladder lamp lava leaf lift lily line lizard lock love me mirror monitor moon nose orb pants pawn piano pillar pipe pixel pizza plane plank planet potato pumpkin reed ring road robot rock rocket rose rubble sax seed shell shirt shovel sign skull spike sprout square star statue stick stump sun sword tile tower track train tree trees triangle trumpet turnip turtle ufo vase vine wall water what wind worm  all text level group group2 group3 empty not is and has eat fear follow make mimic play you you2 push pull stop move shift right up left down fall fallright fallup fallleft nudgedown nudgeright nudgeup nudgeleft turn deturn defeat hot melt open shut sink safe float phantom hide reverse powered power auto back broken sleep still lockeddown lockedright lockedup lockedleft swap tele weak win more word idle lonely often seldom on near facing without above below besideleft besideright feeling red orange yellow lime green cyan blue purple pink rosy black grey silver white brown best party pet sad wonder chill bonus end done revert cursor select 3d";

function loadList() {
  let item = localStorage.getItem('wordlist')
  if (!item) item = defaultList;
  document.getElementById("words").value = item
}

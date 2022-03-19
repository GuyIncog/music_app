const keys = document.querySelectorAll(".key");

// Every single keyboard key can be highlighted manually. This will override the highlight class changes.
for (let key of keys) {
  key.addEventListener("click", function () {
    key.classList.toggle("clicked");
  });
}

const scaleNumbers = document.querySelector("#scalenumbers");

// Remove all highlighter classes. Used by clear button and highlight()
const clear = () => {
  for (let key of keys) {
    key.classList.remove("active");
    key.classList.remove("root");
    key.classList.remove("clicked");
  }
  scaleNumbers.innerText = "";
};

// I don't know why I don't need the function parentheses for event listener, but I do outside of it.
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clear);

// Instead of hard-coding all 12  scales, we will build scaleMap from one scale. Start empty.
const keyMap = {};
//This is our starter material, all 12 notes in order.
const keyArr = [
  "a",
  "bb",
  "b",
  "c",
  "db",
  "d",
  "eb",
  "e",
  "f",
  "gb",
  "g",
  "ab",
];

// Iterate over the notes.
// Bucket gets push/shifted as many times as the iteration so that the 12 notes are in order and the first note is equal to the current iteration.
// Add a key to scaleMap equal to the current note being iterated. The value is equal to the scale starting on that note.
for (let i = 0; i < keyArr.length; i++) {
  let bucket = [...keyArr];
  for (let j = 0; j < i; j++) {
    bucket.push(bucket.shift());
  }
  keyMap[`${keyArr[i]}`] = bucket;
}

// Links key dropdown menu to set currentKey for highlight function.
const keyList = document.querySelector("#key");
let currentKey;
keyList.addEventListener("change", () => {
  currentKey = keyList.value;
  highlight();
});

// This object gives the list of modes attached to each scale family.
// Used for populating the Mode dropdown menu
const scaleMap = {
  major: [
    "Ionion / Maj.",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Aeolian / Nat. Min.",
    "Locrian",
  ],
  melodicMinor: [
    "Mel. Min.",
    "Dor. b2",
    "Lyd. aug.",
    "Lyd. dom.",
    "Aeo. dom.",
    "Half dim.",
    "Alt.",
  ],
  harmonicMinor: [
    "Harm. Min.",
    "Locr. Nat.6",
    "Maj. #5",
    "Dor. #4",
    "Phryg. dom.",
    "Lyd. #2",
    "Alt. dom. bb7",
  ],
  harmonicMajor: [
    "Harm. Maj.",
    "Dor. b5",
    "Phryg. b4",
    "Lyd. b3",
    "Mixo. b2",
    "Lyd. aug. #2",
    "Loc. bb7",
  ],
  diminished: ["Dim.", "Inv. Dim."],
  augmented: ["Aug.", "Inv. Aug."],
  wholeTone: ["Whole Tone"],
};

// This object is used to populate activeNotes for highlight()
const scalesAndModes = {
  major: {
    "Ionion / Maj.": [1, 3, 5, 6, 8, 10, 12],
    Dorian: [1, 3, 4, 6, 8, 10, 11],
    Phrygian: [1, 2, 4, 6, 8, 9, 11],
    Lydian: [1, 3, 5, 7, 8, 10, 12],
    Mixolydian: [1, 3, 5, 6, 8, 10, 11],
    "Aeolian / Nat. Min.": [1, 3, 4, 6, 8, 9, 11],
    Locrian: [1, 2, 4, 6, 7, 9, 11],
  },
  melodicMinor: {
    "Mel. Min.": [1, 3, 4, 6, 8, 10, 12],
    "Dor. b2": [1, 2, 4, 6, 8, 10, 11],
    "Lyd. aug.": [1, 3, 5, 7, 9, 10, 12],
    "Lyd. dom.": [1, 3, 5, 7, 8, 10, 11],
    "Aeo. dom.": [1, 3, 5, 6, 8, 9, 11],
    "Half dim.": [1, 3, 4, 6, 7, 9, 11],
    "Alt.": [1, 2, 4, 5, 7, 9, 11],
  },
  harmonicMinor: {
    "Harm. Min.": [1, 3, 4, 6, 8, 9, 12],
    "Locr. Nat.6": [1, 2, 4, 6, 7, 10, 11],
    "Maj. #5": [1, 3, 5, 6, 9, 10, 12],
    "Dor. #4": [1, 3, 4, 7, 8, 10, 11],
    "Phryg. dom.": [1, 2, 5, 6, 8, 9, 11],
    "Lyd. #2": [1, 4, 5, 7, 8, 10, 12],
    "Alt. dom. bb7": [1, 2, 4, 5, 7, 9, 10],
  },
  harmonicMajor: {
    "Harm. Maj.": [1, 3, 5, 6, 8, 9, 12],
    "Dor. b5": [1, 3, 4, 6, 7, 10, 11],
    "Phryg. b4": [1, 2, 4, 5, 8, 9, 11],
    "Lyd. b3": [1, 3, 4, 7, 8, 10, 12],
    "Mixo. b2": [1, 2, 5, 6, 8, 10, 11],
    "Lyd. aug. #2": [1, 4, 5, 7, 9, 10, 12],
    "Loc. bb7": [1, 2, 4, 6, 7, 9, 10],
  },
  diminished: {
    "Dim.": [1, 3, 4, 6, 7, 9, 10, 12],
    "Inv. Dim.": [1, 2, 4, 5, 7, 8, 10, 11],
  },
  augmented: {
    "Aug.": [1, 4, 5, 8, 9, 12],
    "Inv. Aug.": [1, 2, 5, 6, 9, 10],
  },
  wholeTone: {
    "Whole Tone": [1, 3, 5, 7, 9, 11],
  },
};

// Mode dropdown menu highlights new scale when updated.
const modeList = document.querySelector("#mode");
let currentMode;
modeList.addEventListener("change", () => {
  currentMode = modeList.value;
  highlight();
});

// Function to remove modeList options and repopulate based on the currentScale
const modePopulate = () => {
  currentScale = scaleList.value;
  modeList.innerHTML = '<option disabled="" selected="">Mode</option>'; // Empties modeList before repopulating.
  for (x of scaleMap[currentScale]) {
    const option = document.createElement("option");
    option.innerText = x;
    option.value = x;
    modeList.appendChild(option);
  }
};

// currentScale updates when changed in dropdown menu
const scaleList = document.querySelector("#scale");
let currentScale;
scaleList.addEventListener("change", modePopulate);

// Main function to highlight the selected scale based on all 3 dropdown menus
const highlight = () => {
  // Only runs when all 3 menus have been selected
  if (
    currentKey !== undefined &&
    currentMode !== undefined &&
    currentScale !== undefined
  ) {
    clear();
    const activeNotes = []; //We will use this array to toggle active class on (classList)

    // This for loop makes an array of the active notes in the current key/mode pair.
    for (let x of scalesAndModes[currentScale][currentMode]) {
      activeNotes.push(keyMap[currentKey][x - 1]);
      scaleNumbers.innerText += ` ${x} - `;
    }

    scaleNumbers.innerText = scaleNumbers.innerText.slice(0, -2);

    // This adds the active class to the selected notes
    for (let x of activeNotes) {
      let notes = document.querySelectorAll(`.${x}`);
      for (let note of notes) {
        note.classList.add("active");
      }
    }

    // This adds the .root class to make the root note a different color
    // .root class must come after .active in the css so that it takes precedence
    let rootNote = document.querySelectorAll(`.${currentKey}`);
    for (let y of rootNote) {
      y.classList.add("root");
    }

    // document.querySelector("#scalenumbers").innerText =
    //   scalesAndModes[currentScale][currentMode];
  }
};

const highlightBtn = document.querySelector("#highlightBtn");
highlightBtn.addEventListener("click", highlight);

// When random button is clicked, a random key, scale, and mode are chosen, and then highlighted.
const randBtn = document.querySelector("#randBtn");
randBtn.addEventListener("click", () => {
  const random = (x) => {
    return x[Math.floor(Math.random() * (x.length - 1)) + 1].value;
  };

  keyList.value = random(keyList);
  currentKey = keyList.value;

  scaleList.value = random(scaleList);
  modePopulate();

  modeList.value = random(modeList);
  currentMode = modeList.value;

  highlight();
});

function openTab(tabName) {
  var i, tabContent;
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  document.getElementById(tabName + "Tab").style.display = "block";
}

let intervalId;
let remainingTime;
let isBreak = false;

function startTimer() {
  const breakDuration = parseInt(document.getElementById("breakDuration").value, 10);
  const workoutDuration = parseInt(document.getElementById("workoutDuration").value, 10);

  if (!isNaN(breakDuration) && !isNaN(workoutDuration)) {
    clearInterval(intervalId); // Clear any existing timers

    // Set initial remaining time and toggle isBreak
    remainingTime = isBreak ? breakDuration : workoutDuration;

    // Play the bell sound twice when the timer starts
    playBeepSound();
    if (!isBreak) {
      setTimeout(() => playBeepSound2(), 1200);
    }

    // Update the timer display
    updateTimerDisplay(remainingTime);

    intervalId = setInterval(function () {
      if (remainingTime > 0) {
        remainingTime--;
        updateTimerDisplay(remainingTime);
      } else {
        clearInterval(intervalId);

        // Toggle between break and workout
        isBreak = !isBreak;

        // Set remaining time to the appropriate duration
        remainingTime = isBreak ? breakDuration : workoutDuration;

        // Continue the timer
        startTimer();
      }
    }, 1000);
  } else {
    alert("Please enter valid durations.");
  }
}

function stopTimer() {
  clearInterval(intervalId);
  updateTimerDisplay(0);
}

function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timerOutput").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function playBeepSound() {
  const beepSound = document.getElementById("beepSound");
  beepSound.currentTime = 0; // Reset the sound to the beginning
  beepSound.play();
}

function playBeepSound2() {
  const beepSound2 = document.getElementById("beepSound2");
  beepSound2.currentTime = 0; // Reset the sound to the beginning
  beepSound2.play();
}

// Cognitive Distortions section
const mentalDistortionsList = [
  "",
  "All-or-Nothing Thinking",
  "Catastrophizing",
  "Discounting the Positive",
  "Emotional Reasoning",
  "Fallacy of Change",
  "Fallacy of Fairness",
  "Heaven's Reward Fallacy",
  "Labeling or Mislabeling",
  "Mind Reading",
  "Overgeneralization",
  "Personalization",
  "Should Statements",
  // Add more as needed
];

function addCBTRow() {
  const cbtTableBody = document.getElementById("cbtTableBody");

  // Create a new table row
  const newRow = document.createElement("tr");
  newRow.classList.add("table-row"); // Add a class for styling

  // Create cells for the event (textarea), mental distortions (multiple dropdowns), and label (textarea)
  const eventCell = document.createElement("td");
  const distortionsCell = document.createElement("td");
  const labelCell = document.createElement("td");

  // Create textarea elements
  const eventTextarea = document.createElement("textarea");
  const labelTextarea = document.createElement("textarea");

  // Set attributes for textarea elements
  eventTextarea.rows = 3; // Set the number of rows as needed
  eventTextarea.cols = 40; // Set the number of columns as needed
  labelTextarea.rows = 3; // Set the number of rows as needed
  labelTextarea.cols = 40; // Set the number of columns as needed

  // Create a div to hold the multiple dropdowns
  const distortionsDiv = document.createElement("div");
  distortionsDiv.classList.add("select-row"); // Add a class for styling

  // Populate the div with multiple dropdowns
  for (let i = 0; i < 3; i++) { // You can adjust the number of dropdowns as needed
    const distortionsSelect = document.createElement("select");

    // Populate the dropdown with mental distortions
    mentalDistortionsList.forEach((distortion) => {
      const option = document.createElement("option");
      option.text = distortion;
      distortionsSelect.add(option);
    });

    // Set attributes for the dropdown
    distortionsSelect.multiple = false; // Set to true if you want to allow multiple selections

    // Create a new row for each dropdown
    const distortionsRow = document.createElement("div");
    distortionsRow.classList.add("select-row"); // Add a class for styling
    distortionsRow.appendChild(distortionsSelect);

    // Append the new row to the distortionsDiv
    distortionsDiv.appendChild(distortionsRow);
  }

  // Append textarea elements to cells
  eventCell.appendChild(eventTextarea);
  distortionsCell.appendChild(distortionsDiv); // Append the div with multiple dropdowns
  labelCell.appendChild(labelTextarea);

  // Append cells to the row
  newRow.appendChild(eventCell);
  newRow.appendChild(distortionsCell);
  newRow.appendChild(labelCell);

  // Append the row to the table body
  cbtTableBody.appendChild(newRow);
}
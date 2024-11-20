var isPlayerModeActive = false;
var isAdminModeActive = false;

var playerModeButton = document.querySelector("#playermode-button");
var adminModeButton = document.querySelector("#adminmode-button");

var button = document.querySelector("#deal-button");
var hitButton = document.querySelector("#hit-button");
var standButton = document.querySelector("#stand-button");
var submitButton = document.querySelector("#submit-button");
var deleteButton = document.querySelector("#delete-button");

var statToEditInput = document.querySelector("#stat-to-edit");
var newValueInput = document.querySelector("#new-value");

// Set up Player Mode Button and control what is displayed.
playerModeButton.addEventListener("click", function () {
  isPlayerModeActive = !isPlayerModeActive;
  if (isPlayerModeActive) {
    document.querySelector("#container").style.display = "block";
    isAdminModeActive = false;
    document.querySelector("#container2").style.display = "none";
  } else {
    document.querySelector("#container").style.display = "none";
  }

  // Dynamically load the script.js file when user selects Player Mode.
  var script = document.createElement("script");
  script.src = "script.js";
  document.body.appendChild(script);
});

// Set up Player Mode Button
adminModeButton.addEventListener("click", function () {
  isAdminModeActive = !isAdminModeActive;
  if (isAdminModeActive) {
    document.querySelector("#container2").style.display = "block";
    isPlayerModeActive = false;
    document.querySelector("#container").style.display = "none";
  } else {
    document.querySelector("#container2").style.display = "none";
  }

  // Dynamically load the script.js file when user selects Play Mode.
  var script = document.createElement("script");
  script.src = "script.js";
  document.body.appendChild(script);
});

// Set up submit button for admin mode.
submitButton.addEventListener("click", async function () {
  if (isAdminModeActive) {
    const statToEdit = statToEditInput.value;
    const newValue = parseInt(newValueInput.value, 10);

    if (
      statToEdit !== "playerWins" &&
      statToEdit !== "computerWins" &&
      statToEdit !== "totalRounds"
    ) {
      alert(
        "Invalid stat. Please key in either 'playerWins' or 'computerWins'."
      );
      return;
    }

    if (isNaN(newValue) || newValue < 0) {
      alert("Invalid input. Only accepts value bigger than 0.");
      return;
    }

    //Call amendStats function to update stats in JSONBin.
    try {
      await amendStats(statToEdit, newValue);
      alert(`Successfully updated ${statToEdit} to ${newValue}.`);
    } catch (error) {
      console.error("Error updating stats", error);
      alert("Failed to update stats.");
    }
  }
});

// Set up submit button for admin mode.
deleteButton.addEventListener("click", async function () {
  if (isAdminModeActive) {
    const statToEdit = statToEditInput.value;
    const resetValue = 0;

    if (
      statToEdit !== "playerWins" &&
      statToEdit !== "computerWins" &&
      statToEdit !== "totalRounds"
    ) {
      alert(
        "Invalid stat. Please key in either 'playerWins' or 'computerWins'."
      );
      return;
    }

    //Call amendStats function to update stats in JSONBin.
    try {
      await amendStats(statToEdit, resetValue);
      alert(`Successfully updated ${statToEdit} to ${resetValue}.`);
    } catch (error) {
      console.error("Error updating stats", error);
      alert("Failed to update stats.");
    }
  }
});

// Set up deal button.
button.addEventListener("click", function () {
  var input = document.querySelector("#input-field");
  var result = main(input.value);
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
  input.value = "";
});

// Set up hit button.
hitButton.addEventListener("click", function () {
  var input = document.querySelector("#input-field");
  var result = hitCard(input.value);

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
  input.value = "";
  // }
});

// Set up stand button.
standButton.addEventListener("click", function () {
  var input = document.querySelector("#input-field");
  var result = standCard(input.value);

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
  input.value = "";
});

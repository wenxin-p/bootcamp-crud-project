// Define your JSON Bin URL and API Key. Please generate your own API key and JSON Bin to run the case.
const JSON_BIN_URL = "";
const API_KEY = "";

// Function to fetch and update the bin
const updateGameStats = async () => {
  try {
    // Fetch current game stats
    const response = await axios.get(JSON_BIN_URL, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    });

    // Destructure current data
    let { totalRounds, playerWins, computerWins } = response.data.record;

    // Increment the round count and update wins based on your game logic
    totalRounds += 1;

    if (playerScore > 21) {
      computerWins += 1;
    } else if (computerCardScores > 21) {
      playerWins += 1;
    } else if (playerScore === 21) {
      playerWins += 1;
    } else if (computerCardScores === 21) {
      computerWins += 1;
    } else if (playerScore > computerCardScores) {
      playerWins += 1;
    } else {
      computerWins += 1;
    }

    // Send updated data back to the JSON bin
    await axios.put(
      JSON_BIN_URL,
      { totalRounds, playerWins, computerWins },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
      }
    );

    console.log("Game stats updated successfully!");
  } catch (error) {
    console.error("Error updating game stats:", error);
  }
};

//Function to amend and update stats.
const amendStats = async (statToEdit, newValue) => {
  try {
    // Fetch current data from JSONBin
    const response = await fetch(JSON_BIN_URL, {
      method: "GET",
      headers: {
        "X-Master-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current data from JSONBin");
    }

    const data = await response.json();
    const updatedData = data.record;
    console.log(updatedData);

    // Update the relevant stat
    updatedData[statToEdit] = newValue;

    // Save the updated data back to JSONBin
    const updateResponse = await fetch(JSON_BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      //JSON.stringify converts a JavaScript object into a string
      body: JSON.stringify(updatedData),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update JSONBin data");
    }

    console.log(
      `${statToEdit} successfully updated to ${newValue} in JSONBin.`
    );
  } catch (error) {
    console.error("Error updating stats:", error);
    throw error;
  }
};

//Function to delete stats.
const deleteStats = async (statToEdit, resetValue) => {
  try {
    // Fetch current data from JSONBin
    const response = await fetch(JSON_BIN_URL, {
      method: "GET",
      headers: {
        "X-Master-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current data from JSONBin");
    }

    const data = await response.json();
    const updatedData = data.record;
    console.log(updatedData);

    // Update the relevant stat
    updatedData[statToEdit] = resetValue;

    // Save the updated data back to JSONBin
    const updateResponse = await fetch(JSON_BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      //JSON.stringify converts a JavaScript object into a string
      body: JSON.stringify(updatedData),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update JSONBin data");
    }

    console.log(
      `${statToEdit} successfully updated to ${resetValue} in JSONBin.`
    );
  } catch (error) {
    console.error("Error updating stats:", error);
    throw error;
  }
};

// Function to update both a variable and its corresponding UI element
const updateUI = (key, value) => {
  if (key === "totalRounds") {
    totalRounds = value;
  } else if (key === "playerWins") {
    playerWins = value;
  } else if (key === "computerWins") {
    computerWins = value;
  }

  // Update the UI
  const element = document.getElementById(`${key}Display`);
  if (element) {
    element.textContent = value;
  }
};

// Function to fetch data and update variables and UI
const loadData = async (key) => {
  try {
    const response = await fetch(JSON_BIN_URL, {
      method: "GET",
      headers: {
        "X-Master-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    const savedValue = data.record[key];

    // Update the specific variable and UI
    updateUI(key, savedValue);
    console.log(`Loaded ${key}: ${savedValue}`);
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
  }
};

// Call loadData for each key when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadData("playerWins");
  loadData("totalRounds");
  loadData("computerWins");
});

// Function to load all stats dynamically
// const loadAllStats = async () => {
//   await loadData("playerWins");
//   await loadData("totalRounds");
//   await loadData("computerWins");
// };

// // Call loadAllStats initially when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   loadAllStats();

//   // Set up periodic updates every 10 seconds
//   setInterval(loadAllStats, 10000);
// });

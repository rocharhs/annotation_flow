const MAX_FILE_SIZE_MB = 30
const ERROR_MSG_EXCEEDS_LIMIT = "File size exceeds the allowed limit of " + MAX_FILE_SIZE_MB + "Mb. Please choose a smaller file."
const ERROR_MSG_WRONG_TYPE = "File type should be json with a list of strings"
const ERROR_JSON_NOT_STRING_ARRAY = "File shold be a json array of strings"
const ERROR_JSON_PARSE = "Error parsing JSON. Please check if the file is valid JSON."
const DROP_COLOR_NORMAL ="#3498db"
const DROP_COLOR_HOVER = "#2ecc71"
const DROP_BORDER_NORMAL = "2px dashed #3498db"
const DROP_BORDER_HOVER = "2px dashed #2ecc71"

function pickFile() {
    // Create a hidden file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    // Attach an event listener to the file input
    fileInput.addEventListener("change", function () {
        // Get the selected file from the file input
        const selectedFile = fileInput.files[0];

        // Check if a file is selected
        if (selectedFile) {
            // Call the loadDataset function with the selected file
            loadDataset(selectedFile);
        }
    });

    // Trigger a click on the hidden file input
    fileInput.click();
}

// script.js
function loadDataset(file) {
    console.log("OK")
    // Check if the file size is at most 30MB
    if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
        // Implement the logic to load the dataset or send it to the backend
        if (file.type === "application/json"|| file.name.toLowerCase().endsWith(".json")) {
            // Implement the logic to load the CSV dataset or send it to the backend
            console.log("File is a json. Proceeding...");
            parseJSONFile(file)
        }else{
            alert(ERROR_MSG_WRONG_TYPE);
        }
        
    } else {
        // Display an error message if the file size exceeds the limit
        console.log(ERROR_MSG_EXCEEDS_LIMIT);
        alert(ERROR_MSG_EXCEEDS_LIMIT);
    }
}

// Function to send file data to the backend
function sendToBackend(data) {
    // Update the URL to match your FastAPI endpoint
    const apiUrl = '/data/process-data'; // Assuming the FastAPI endpoint is at this path

    // Use fetch to send data to the FastAPI endpoint
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Data sent to backend successfully:', responseData);
        // Optionally, update the UI or perform other actions after successful backend interaction
    })
    .catch(error => {
        console.error('Error sending data to backend:', error);
        // Handle errors or provide user feedback as needed
    });
}

// Function to parse JSON file
function parseJSONFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const jsonData = JSON.parse(e.target.result);

            // Check if jsonData is an array of strings
            if (Array.isArray(jsonData) && jsonData.every(item => typeof item === 'string')) {
                console.log("File is a JSON array of strings. Proceeding...");
                sendToBackend(jsonData)
            } else {
                // Display an error message if JSON data doesn't match the expected format
                console.log(ERROR_JSON_NOT_STRING_ARRAY);
                alert(ERROR_JSON_NOT_STRING_ARRAY);
            }
        } catch (error) {
            // Display an error message if JSON parsing fails
            console.error("Error parsing JSON:", error);
            alert(ERROR_JSON_PARSE);
        }
    };

    reader.readAsText(file);
}

document.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("drop-area").style.border = DROP_BORDER_HOVER;
    document.getElementById("drop-area").style.color = DROP_COLOR_HOVER;
});

document.addEventListener("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("drop-area").style.border = DROP_BORDER_NORMAL;
    document.getElementById("drop-area").style.color = DROP_COLOR_NORMAL;
});

document.addEventListener("drop", function (e) {
    e.preventDefault();

    document.getElementById("drop-area").style.border = DROP_BORDER_NORMAL;
    document.getElementById("drop-area").style.color = DROP_COLOR_NORMAL;

    // Check if files are present in the drop event
    if (e.dataTransfer.files.length > 0) {
        // Get the first dropped file
        const file = e.dataTransfer.files[0];
        // Call the loadDataset function with the file
        loadDataset(file);
    } else {
        console.log("No files were dropped.");
    }
});

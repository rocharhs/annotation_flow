const MAX_FILE_SIZE_MB = 30
const MSG_EXCEEDS_LIMIT = "File size exceeds the allowed limit of " + MAX_FILE_SIZE_MB + "Mb. Please choose a smaller file."

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
        console.log("File size is within the allowed limit. Proceeding...");
        if (file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv")) {
            // Implement the logic to load the CSV dataset or send it to the backend
            console.log("File is a CSV. Proceeding...");
            alert("File is a CSV. Implement your backend logic here.");

            // Here you can use 'file' as needed, for example, passing it to another function or sending it to the backend
        }else{
            alert("File size is within the allowed limit. But it should be a csv");
        }
        
    } else {
        // Display an error message if the file size exceeds the limit
        console.log(MSG_EXCEEDS_LIMIT);
        alert(MSG_EXCEEDS_LIMIT);
    }
}

document.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("drop-area").style.border = "2px dashed #668aec";
});

document.addEventListener("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("drop-area").style.border = "2px dashed #fff";
});

document.addEventListener("drop", function (e) {
    e.preventDefault();

    document.getElementById("drop-area").style.border = "2px dashed #fff";

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

// script.js
function loadDataset() {
    // Implement the logic to load the dataset
    console.log("Dataset loaded!");
    alert("Dataset loaded! Implement your backend logic to handle the dataset.");
}

// Prevent the browser from opening the dropped file
document.addEventListener("dragover", function (e) {
    e.preventDefault();
});

document.addEventListener("drop", function (e) {
    e.preventDefault();
    loadDataset();
});
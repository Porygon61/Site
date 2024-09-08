// Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById(
        'clock'
    ).textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// File Input and Directory Listing
const fileInput = document.getElementById('fileInput');
const directoryListing = document.getElementById('directoryListing');
const showFolders = document.getElementById('showFolders');
const fileViewer = document.getElementById('fileViewer');

fileInput.addEventListener('change', function (event) {
    const files = event.target.files;
    displayFilesAndFolders(files);
});

showFolders.addEventListener('change', function () {
    const files = fileInput.files;
    if (files.length > 0) {
        displayFilesAndFolders(files);
    }
});

function displayFilesAndFolders(files) {
    directoryListing.innerHTML = '';

    Array.from(files).forEach((file) => {
        const isFolder = file.webkitRelativePath.includes('/');

        // Display files always, conditionally display folders based on checkbox
        if (isFolder) {
            const fileElement = document.createElement('div');
            fileElement.classList.add('file-element');
            fileElement.textContent = `${file.name} (${
                file.type || 'Unknown'
            }) - ${(file.size / 1024).toFixed(2)} KB`;
            fileElement.onclick = () => displayFile(file);
            directoryListing.appendChild(fileElement);
        }
    });
}

function displayFile(file) {
    const fileReader = new FileReader();

    if (file.type.startsWith('text/')) {
        fileReader.onload = function (e) {
            fileViewer.innerHTML = `<pre>${e.target.result}</pre>`;
        };
        fileReader.readAsText(file);
    } else if (file.type.startsWith('video/')) {
        fileViewer.innerHTML = `<video controls width="100%">
                              <source src="${URL.createObjectURL(
                                                                            file
                                                                        )}" type="${file.type}">
                              Your browser does not support the video tag.
                            </video>`;
    } else {
        fileViewer.innerHTML = `<p>Cannot display this file type: ${
            file.type || 'Unknown'
        }</p>`;
    }
}
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileNameDisplay = document.getElementById('file-name-display');

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        const fileName = file.name;
        const fileType = file.type;
        // Проверяем, является ли файл файлом Excel
        if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            fileType === 'application/vnd.ms-excel') {
            fileNameDisplay.textContent = fileName;
        } else {
            fileNameDisplay.textContent = 'Только файлы Excel разрешены';
            return;
        }
    } else {
        fileNameDisplay.textContent = '';
    }
}

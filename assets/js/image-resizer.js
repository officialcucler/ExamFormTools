// Image Resizer Tool Logic
document.addEventListener('DOMContentLoaded', function () {
    const uploadArea = document.getElementById('upload-area');
    const imageInput = document.getElementById('image-input');
    const uploadBtn = document.getElementById('upload-btn');
    const controlsPanel = document.getElementById('controls-panel');
    const previewPanel = document.getElementById('preview-panel');
    const examSelect = document.getElementById('exam-select');
    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');
    const qualitySlider = document.getElementById('quality-slider');
    const qualityValue = document.getElementById('quality-value');
    const resizeBtn = document.getElementById('resize-btn');
    const resetBtn = document.getElementById('reset-btn');
    const autoResizeBtn = document.getElementById('auto-resize-btn');
    const originalImage = document.getElementById('original-image');
    const resizedImage = document.getElementById('resized-image');
    const originalSize = document.getElementById('original-size');
    const originalDimensions = document.getElementById('original-dimensions');
    const resizedSize = document.getElementById('resized-size');
    const resizedDimensions = document.getElementById('resized-dimensions');
    const downloadBtn = document.getElementById('download-btn');

    let originalFile = null;
    let resizedBlob = null;

    // Exam requirements
    const examRequirements = {
        upsc: { width: 800, height: 600, quality: 80 },
        ssc: { width: 600, height: 800, quality: 75 },
        banking: { width: 400, height: 500, quality: 85 },
        railway: { width: 500, height: 600, quality: 80 },
        custom: { width: '', height: '', quality: 80 }
    };

    // Upload functionality
    uploadBtn.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Quality slider
    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = qualitySlider.value;
    });

    // Auto resize button
    autoResizeBtn.addEventListener('click', () => {
        if (originalImage.src) {
            const img = new Image();
            img.onload = function () {
                widthInput.value = this.naturalWidth;
                heightInput.value = this.naturalHeight;
            };
            img.src = originalImage.src;
        }
    });

    // Resize button
    resizeBtn.addEventListener('click', resizeImage);

    // Reset button
    resetBtn.addEventListener('click', resetTool);

    // New Upload button
    const newUploadBtn = document.getElementById('new-upload-btn');
    newUploadBtn.addEventListener('click', () => {
        resetTool();
        imageInput.click();
    });

    // Download button
    downloadBtn.addEventListener('click', downloadImage);

    // Exam select
    examSelect.addEventListener('change', setExamDimensions);
    setExamDimensions(); // Initialize on load

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    }

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        originalFile = file;
        const reader = new FileReader();
        reader.onload = function (e) {
            originalImage.src = e.target.result;
            originalImage.onload = function () {
                originalDimensions.textContent = `Dimensions: ${this.naturalWidth} x ${this.naturalHeight}`;
                originalSize.textContent = `Size: ${formatFileSize(file.size)}`;
                controlsPanel.style.display = 'block';
                previewPanel.style.display = 'block';
                uploadArea.style.display = 'none';
            };
        };
        reader.readAsDataURL(file);
    }

    function resizeImage() {
        if (!originalImage.src) return;

        const width = parseInt(widthInput.value);
        const height = parseInt(heightInput.value);
        const quality = parseInt(qualitySlider.value) / 100;

        if (!width || !height) {
            alert('Please enter valid width and height.');
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        const img = new Image();
        img.onload = function () {
            // Calculate aspect ratio to fit within the specified dimensions
            const aspectRatio = this.naturalWidth / this.naturalHeight;
            let drawWidth = width;
            let drawHeight = height;

            if (width / height > aspectRatio) {
                drawWidth = height * aspectRatio;
            } else {
                drawHeight = width / aspectRatio;
            }

            // Center the image
            const x = (width - drawWidth) / 2;
            const y = (height - drawHeight) / 2;

            ctx.drawImage(this, x, y, drawWidth, drawHeight);

            canvas.toBlob((blob) => {
                resizedBlob = blob;
                const url = URL.createObjectURL(blob);
                resizedImage.src = url;
                resizedImage.style.display = 'block';
                resizedDimensions.textContent = `Dimensions: ${width} x ${height}`;
                resizedSize.textContent = `Size: ${formatFileSize(blob.size)}`;
                downloadBtn.style.display = 'block';
            }, 'image/jpeg', quality);
        };
        img.src = originalImage.src;
    }

    function resetTool() {
        resizedBlob = null;
        widthInput.value = '';
        heightInput.value = '';
        qualitySlider.value = 80;
        qualityValue.textContent = '80';
        examSelect.value = 'custom';
        setExamDimensions(); // Reset exam preferences
        resizedImage.src = '';
        resizedImage.style.display = 'none';
        resizedSize.textContent = 'Size: --';
        resizedDimensions.textContent = 'Dimensions: --';
        downloadBtn.style.display = 'none';
    }

    function downloadImage() {
        if (!resizedBlob) return;

        const url = URL.createObjectURL(resizedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resized-image.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function setExamDimensions() {
        const selectedExam = examSelect.value;
        const requirements = examRequirements[selectedExam];
        const customOptions = document.getElementById('custom-options');

        if (selectedExam === 'custom') {
            customOptions.style.display = 'block';
            widthInput.value = '';
            heightInput.value = '';
            qualitySlider.value = 80;
            qualityValue.textContent = '80';
            autoResizeBtn.disabled = false;
            autoResizeBtn.style.opacity = '1';
        } else {
            customOptions.style.display = 'none';
            if (requirements) {
                widthInput.value = requirements.width || '';
                heightInput.value = requirements.height || '';
                qualitySlider.value = requirements.quality;
                qualityValue.textContent = requirements.quality;
            }
            autoResizeBtn.disabled = true;
            autoResizeBtn.style.opacity = '0.5';
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});

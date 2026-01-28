const imageInput = document.getElementById('imageInput');
const resizeBtn = document.getElementById('resizeBtn');
const canvas = document.getElementById('canvas');
const downloadBtn = document.getElementById('downloadBtn');

let originalImage = new Image();

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    originalImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

resizeBtn.addEventListener('click', () => {
  const width = parseInt(document.getElementById('widthInput').value);
  const height = parseInt(document.getElementById('heightInput').value);
  const targetKB = parseInt(document.getElementById('sizeInput').value);

  if (!width || !height || !originalImage.src) {
    alert('Please select image and enter width & height');
    return;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(originalImage, 0, 0, width, height);

  canvas.style.display = 'block';

  let quality = 0.95;
  let dataURL = canvas.toDataURL('image/jpeg', quality);

  if (targetKB) {
    while (dataURL.length / 1024 > targetKB && quality > 0.1) {
      quality -= 0.05;
      dataURL = canvas.toDataURL('image/jpeg', quality);
    }
  }

  downloadBtn.href = dataURL;
  downloadBtn.download = 'exam-photo.jpg';
  downloadBtn.style.display = 'inline-block';
});

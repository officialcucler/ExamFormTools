document.addEventListener('DOMContentLoaded', () => {
  console.log('ExamFormTools loaded');

  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }
});

const uploadImage = document.getElementById('uploadImage');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const lockAspect = document.getElementById('lockAspect');
const resizeBtn = document.getElementById('resizeBtn');
const canvas = document.getElementById('canvas');
const downloadBtn = document.getElementById('downloadBtn');

const ctx = canvas.getContext('2d');
let originalImage = new Image();
let aspectRatio = 1;

uploadImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    originalImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

originalImage.onload = () => {
  widthInput.value = originalImage.width;
  heightInput.value = originalImage.height;
  aspectRatio = originalImage.width / originalImage.height;
};

widthInput.addEventListener('input', () => {
  if (lockAspect.checked) {
    heightInput.value = Math.round(widthInput.value / aspectRatio);
  }
});

heightInput.addEventListener('input', () => {
  if (lockAspect.checked) {
    widthInput.value = Math.round(heightInput.value * aspectRatio);
  }
});

resizeBtn.addEventListener('click', () => {
  const w = widthInput.value;
  const h = heightInput.value;

  canvas.width = w;
  canvas.height = h;

  ctx.drawImage(originalImage, 0, 0, w, h);

  downloadBtn.href = canvas.toDataURL('image/png');
  downloadBtn.style.display = 'block';
});

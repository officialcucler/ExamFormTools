document.addEventListener('DOMContentLoaded',()=>{
  console.log('ExamFormTools loaded');
});


<body>
<script>
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
</script>
  </body>

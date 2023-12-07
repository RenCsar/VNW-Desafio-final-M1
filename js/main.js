window.addEventListener('DOMContentLoaded', () => {
    const responsiveImage = document.getElementById('responsiveImage');

    const changeImage = () => {
      if (window.innerWidth <= 500) {
        responsiveImage.src = './assets/banner-sm.webp';
      } else {
        responsiveImage.src = './assets/banner.webp';
      }
    }       
    changeImage();  
    window.addEventListener('resize', changeImage);
  });
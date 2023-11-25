window.addEventListener('DOMContentLoaded', () => {
    const responsiveImage = document.getElementById('responsiveImage');

    const changeImage = () => {
      if (window.innerWidth <= 500) {
        responsiveImage.src = './assets/banner-sm.png';
      } else {
        responsiveImage.src = './assets/banner.png';
      }
    }       
    changeImage();  
    window.addEventListener('resize', changeImage);
  });
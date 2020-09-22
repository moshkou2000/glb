jQuery(document).ready(function($) {  
  // Owl Carousel                     
  var owl = $('.carousel-fade-transition');
  if (owl && owl.owlCarousel)
    owl.owlCarousel({
      nav: true,
      dots: true,
      items: 1,
      loop: true,
      navText: ["&#xe605","&#xe606"],
      autoplay: true, 
      animateOut: 'fadeOut',
      autoplayTimeout: 5000
    });
});
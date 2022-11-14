import 'aos/dist/aos.css' // You can also use <link> for styles

import AOS from 'aos'
// ..
// AOS.init();

// AOS.init()

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  once: true,
  disable: 'phone',
  duration: 700,
  easing: 'ease-out-cubic',
})

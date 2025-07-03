/* writeen by us*/





// All JS from <script> tags in Sample_Maxxon-1.html goes here
// ... (JS will be filled in from the HTML file) ...

// ================= HEADER & NAVIGATION LOGIC =================
// Smooth scrolling for navigation links
const navAnchors = document.querySelectorAll('a[href^="#"]');
if (navAnchors && navAnchors.length > 0) {
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu after clicking a link
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenuEl = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenuEl) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuEl.classList.toggle('open');
        mobileMenuEl.classList.toggle('hidden');
    });
    const mobileMenuLinks = mobileMenuEl.querySelectorAll('a');
    if (mobileMenuLinks && mobileMenuLinks.length > 0) {
      mobileMenuLinks.forEach(link => {
          link.addEventListener('click', function() {
              mobileMenuEl.classList.remove('open');
              mobileMenuEl.classList.add('hidden');
          });
      });
    }
}

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-menu-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
        mobileNav.classList.toggle('active');
        // Animate icon
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
  }
});

/*
// Open booking popup
function openBookingPopup() {
    document.getElementById('bookingPopup').style.display = 'block';
}

// Close booking popup
function closeBookingPopup() {
    document.getElementById('bookingPopup').style.display = 'none';
    resetForm();
}

// Toggle form fields based on customer type
function toggleFormFields() {
    const customerType = document.getElementById('customerType').value;
    const individualFields = document.getElementById('individualFields');
    const organizationFields = document.getElementById('organizationFields');

    if (customerType === 'individual') {
        individualFields.style.display = 'block';
        organizationFields.style.display = 'none';
    } else if (customerType === 'organization') {
        individualFields.style.display = 'none';
        organizationFields.style.display = 'block';
    } else {
        individualFields.style.display = 'none';
        organizationFields.style.display = 'none';
    }
}

// Reset form
function resetForm() {
    document.getElementById('bookingForm').reset();
    document.getElementById('individualFields').style.display = 'none';
    document.getElementById('organizationFields').style.display = 'none';
}

// Handle form submission
// COMMENTED OUT - Duplicate handler exists in index.html with backend integration

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const customerType = document.getElementById('customerType').value;
    let formData = {
        customerType: customerType,
        services: [],
        queryMessage: document.getElementById('queryMessage').value
    };

    // Get selected services
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        formData.services.push(checkbox.value);
    });

    // Add customer-specific data
    if (customerType === 'individual') {
        formData.name = document.getElementById('individualName').value;
        formData.phone = document.getElementById('individualPhone').value;
        formData.age = document.getElementById('individualAge').value;
    } else if (customerType === 'organization') {
        formData.companyName = document.getElementById('companyName').value;
        formData.companySize = document.getElementById('companySize').value;
        formData.companyEmail = document.getElementById('cname').value;
        formData.designation = document.getElementById('designation').value;
    }

    // Validate form
    if (!customerType) {
        alert('Please select customer type');
        return;
    }

    if (formData.services.length === 0) {
        alert('Please select at least one service');
        return;
    }

    function isNonEmpty(str) {
      return typeof str === 'string' && str.trim().length > 0;
    }

    if (
      (formData.customerType === 'individual' &&
        isNonEmpty(formData.name) &&
        isNonEmpty(formData.phone) &&
        isNonEmpty(formData.age) &&
        formData.services.length > 0) ||
      (formData.customerType === 'organization' &&
        isNonEmpty(formData.companyName) &&
        isNonEmpty(formData.companySize) &&
        isNonEmpty(formData.designation) &&
        formData.services.length > 0)
    ) {
      alert('Booking request submitted successfully! We will contact you soon.');
      closeBookingPopup();
    } else {
      alert('Please fill in all the required fields');
    }
    
      
  });
}


// Close popup when clicking outside
const bookingPopup = document.getElementById('bookingPopup');
if (bookingPopup) {
  bookingPopup.addEventListener('click', function(e) {
    if (e.target === this) {
        closeBookingPopup();
    }
  });
}
*/ 

// ================= SECTION FADE-IN ANIMATION LOGIC =================
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
let scrollDirection = 'down';
const fadeInSections = document.querySelectorAll('.section-fade-in');
const animatedElements = document.querySelectorAll('.animated-element');

function getScrollDirection() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        scrollDirection = 'down';
    } else if (currentScroll < lastScrollTop) {
        scrollDirection = 'up';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

function animateSections() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8; // Trigger animation when 80% of section is visible
    
    fadeInSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        
        // Check if section is in viewport
        const isInViewport = sectionTop < triggerPoint && sectionBottom > 0;
        
        if (isInViewport) {
            // Remove existing animation classes
            section.classList.remove('animate-up', 'animate-down');
            
            // Add appropriate animation class based on scroll direction
            if (scrollDirection === 'down') {
                section.classList.add('animate-up');
            } else if (scrollDirection === 'up') {
                section.classList.add('animate-down');
            }
            
            // Animate individual elements within the section
            const elementsInSection = section.querySelectorAll('.animated-element');
            elementsInSection.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 100); // Stagger the animations
            });
        } else {
            // Reset section when out of viewport (optional - for re-animation)
            // Uncomment the next line if you want sections to re-animate when scrolling back
            // section.classList.remove('animate-up', 'animate-down');
        }
    });
}

// Animate individual elements on scroll
function animateElements() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.7;
    
    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        
        if (elementTop < triggerPoint) {
            element.classList.add('animate-in');
        }
    });
}

// Throttled scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        getScrollDirection();
        animateSections();
        animateElements();
    }, 10); // Small delay for performance
}, { passive: true });

// Initial animation on page load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateSections();
        animateElements();
    }, 100);
});

// Also trigger on window resize
window.addEventListener('resize', () => {
    animateSections();
    animateElements();
});

// ================= MENU ANIMATION LOGIC =================
// Animate menu items on desktop
window.addEventListener('DOMContentLoaded', () => {
    // Animate left menu (main nav)
    const leftMenu = document.querySelector('.menu-animate');
    if (leftMenu) {
        leftMenu.querySelectorAll('li').forEach((li, idx) => {
            setTimeout(() => {
                li.classList.add('animated');
            }, idx * 120);
        });
    }
    // Animate right menu (header buttons)
    const rightMenu = document.querySelector('.menu-animate-right');
    if (rightMenu) {
        rightMenu.querySelectorAll('li').forEach((li, idx) => {
            setTimeout(() => {
                li.classList.add('animated');
            }, idx * 120);
        });
    }

    // Hide modals on load
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
   
    // Modal logic for login/register
    const openLoginBtn = document.getElementById('open-login-modal');
    const openRegisterLink = document.getElementById('open-register-link');
    const openLoginLink = document.getElementById('open-login-link');
    const closeLoginBtn = document.getElementById('close-login-modal');
    const closeRegisterBtn = document.getElementById('close-register-modal');
    const mobileMenu = document.getElementById('mobile-menu');

    function closeAllModals() {
        if (loginModal) loginModal.style.display = 'none';
        if (registerModal) registerModal.style.display = 'none';
    }
    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', function() {
            closeAllModals();
            if (loginModal) loginModal.style.display = 'flex';
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                mobileMenu.classList.add('hidden');
            }
        });
    }
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', function() {
            if (loginModal) loginModal.style.display = 'none';
        });
    }
    if (closeRegisterBtn) {
        closeRegisterBtn.addEventListener('click', function() {
            if (registerModal) registerModal.style.display = 'none';
        });
    }
    if (openRegisterLink) {
        openRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeAllModals();
            if (registerModal) registerModal.style.display = 'flex';
        });
    }
    if (openLoginLink) {
        openLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeAllModals();
            if (loginModal) loginModal.style.display = 'flex';
        });
    }
    // Close modal on outside click
    [loginModal, registerModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    });
});

// Intersection Observer for animated elements within sections
const elementObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
};
const elementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, elementObserverOptions);
animatedElements.forEach(element => {
    elementObserver.observe(element);
});

// --- 3D India Map Logic (Three.js) ---
let mapScene, mapCamera, mapRenderer, mapControls, indiaMapPlane, raycaster, mouse;
let mapMarkers = []; // Array to store Three.js city marker objects
let activeMapMarkerMesh = null; // To keep track of the currently active 3D marker

// Define city data with 3D coordinates (approximated for the new image-textured map)
// These coordinates are relative to a 3x2 plane, adjusted to fit the map image
const city3DData = {
    "Mumbai": {
        name: "Maharashtra (Mumbai)",
        state: "Maharashtra",
        city: "Mumbai",
        companies: ["Reliance Industries", "Tata Consultancy Services", "Larsen & Toubro"],
        description: "Major industrial and financial hub. Maxon has completed camps at several top companies.",
        services: ["Advanced Diagnostics", "Executive Health", "Emergency Training"],
        image: "https://placehold.co/400x250/28a745/FFFFFF?text=Mumbai+Maharashtra",
        contact: "+91 22 7654 3210",
        position: { x: -0.85, y: -0.25, z: 0.05 } // West coast, lower
    },
    "Bengaluru": {
        name: "Karnataka (Bengaluru)",
        state: "Karnataka",
        city: "Bengaluru",
        companies: ["Infosys", "Wipro", "Biocon"],
        description: "IT and biotech capital. Maxon has served leading tech campuses.",
        services: ["IT Health Camps", "Mental Health Support", "Ergonomic Assessments"],
        image: "https://placehold.co/400x250/ffc107/000000?text=Bengaluru+Karnataka",
        contact: "+91 80 1234 5678",
        position: { x: -0.35, y: -1.05, z: 0.05 } // South, slightly west
    },
    "Chennai": {
        name: "Tamil Nadu (Chennai)",
        state: "Tamil Nadu",
        city: "Chennai",
        companies: ["Ashok Leyland", "TVS Motors", "Cognizant"],
        description: "Manufacturing and IT hub. Maxon has completed camps in major industries.",
        services: ["Occupational Health", "Emergency Response", "Industrial Screenings"],
        image: "https://placehold.co/400x250/dc3545/FFFFFF?text=Chennai+TamilNadu",
        contact: "+91 44 3456 7890",
        position: { x: 0.65, y: -1.05, z: 0.05 } // South-east
    },
    "Kolkata": {
        name: "West Bengal (Kolkata)",
        state: "West Bengal",
        city: "Kolkata",
        companies: ["ITC Limited", "Coal India", "Bandhan Bank"],
        description: "Eastern metro with diverse industries. Maxon has run public health and corporate camps.",
        services: ["Public Health Camps", "Mass Vaccination", "Preventive Health"],
        image: "https://placehold.co/400x250/17a2b8/FFFFFF?text=Kolkata+WestBengal",
        contact: "+91 33 8765 4321",
        position: { x: 1.05, y: 0.05, z: 0.05 } // East
    },
    "Delhi": {
        name: "Delhi NCR",
        state: "Delhi NCR",
        city: "Delhi",
        companies: ["Maruti Suzuki", "HCL Technologies", "DLF"],
        description: "Corporate and government hub. Maxon has supported many NCR companies.",
        services: ["Full Check-ups", "Specialist Consultations", "Vaccination Drives"],
        image: "https://placehold.co/400x250/007bff/FFFFFF?text=Delhi+NCR",
        contact: "+91 11 2345 6789",
        position: { x: -0.05, y: 1.0, z: 0.05 } // North
    },
    "Ongole": {
        name: "Andhra Pradesh (Ongole)",
        state: "Andhra Pradesh",
        city: "Ongole",
        companies: ["The India Cements Ltd", "KCP Cements", "APGENCO"],
        description: "Maxon's headquarters. Special focus on mining, quarry, and industrial health camps.",
        services: ["Mining Medicals", "Annual Health Checks", "Vaccination"],
        image: "https://placehold.co/400x250/00bfff/FFFFFF?text=Ongole+AndhraPradesh",
        contact: "+91 8790289947",
        position: { x: 0.25, y: -0.45, z: 0.05 }, // South-central
        highlight: true // Special highlight for Ongole
    },
    "Hyderabad": {
        name: "Telangana (Hyderabad)",
        state: "Telangana",
        city: "Hyderabad",
        companies: ["Dr. Reddy's Labs", "Aurobindo Pharma", "TCS Hyderabad"],
        description: "Pharma and IT hub. Maxon has completed wellness and lab camps for top firms.",
        services: ["Lab Services", "Disease Prevention", "Wellness Challenges"],
        image: "https://placehold.co/400x250/6f42c1/FFFFFF?text=Hyderabad+Telangana",
        contact: "+91 40 9012 3456",
        position: { x: 0.05, y: -0.25, z: 0.05 } // Central-south
    }
};

const INDIA_MAP_IMAGE_URL = 'https://t3.ftcdn.net/jpg/01/95/88/46/360_F_195884609_ic25mQpf4aVmh8QpOLbAh0lbfTSscOXA.jpg';

// (Full JavaScript code from Sample_Maxxon-1.html lines 883-1772 goes here, as previously extracted)
// ... existing code ... 

// --- Service Card Details Popup Logic ---
const serviceDetails = {
  'Laboratory Services': {
    title: 'Laboratory Services',
    desc: 'NABL-accredited lab services for accurate diagnostics onsite. Includes blood, urine, and other pathology tests with rapid turnaround and digital reporting.',
    list: [
      'Blood, urine, and pathology tests',
      'Onsite sample collection',
      'Digital and instant reporting',
      'NABL-accredited quality assurance'
    ]
  },
  'Mobile Digital X-Ray': {
    title: 'Mobile Digital X-Ray',
    desc: 'Portable X-ray services for quick and efficient onsite imaging. Ideal for workplaces, construction sites, and remote locations.',
    list: [
      'Portable digital X-ray machine',
      'Immediate image review',
      'Expert radiologist reporting',
      'Safe and compliant procedures'
    ]
  },
  'Computerized ECG': {
    title: 'Computerized ECG',
    desc: 'Onsite ECG for cardiac health assessment and monitoring. Fast, accurate, and interpreted by specialists.',
    list: [
      '12-lead ECG recording',
      'Instant results',
      'Specialist interpretation',
      'Early detection of cardiac issues'
    ]
  },
  'Pulmonary Function Test': {
    title: 'Pulmonary Function Test',
    desc: 'Lung function testing for respiratory health onsite. Essential for industries with dust, fumes, or respiratory risk.',
    list: [
      'Spirometry and lung capacity tests',
      'Onsite technician',
      'Immediate feedback',
      'Occupational health compliance'
    ]
  },
  '2D Echo': {
    title: '2D Echo',
    desc: 'Advanced cardiac imaging for comprehensive heart checkups. Non-invasive, safe, and performed by experts.',
    list: [
      '2D echocardiography',
      'Heart structure and function assessment',
      'Performed by trained sonographers',
      'Specialist reporting'
    ]
  },
  'Audiometry': {
    title: 'Audiometry',
    desc: 'Onsite hearing and vision tests for employee health. Detects early signs of hearing loss or vision problems.',
    list: [
      'Pure tone audiometry',
      'Vision acuity and color tests',
      'Occupational screening',
      'Immediate results'
    ]
  },
  'Vision Testing': {
    title: 'Vision Testing',
    desc: 'Onsite vision tests for employee health. Detects early signs of vision problems.',
    list: [
      'Vision acuity and color tests',
      'Occupational screening',
      'Immediate results',
      'Professional optometrist'
    ]
  },
  'Vaccination Services': {
    title: 'Vaccination Services',
    desc: 'Comprehensive vaccination programs for workplace safety. Includes flu, hepatitis, COVID-19, and more.',
    list: [
      'Onsite vaccination camps',
      'Wide range of vaccines',
      'Cold chain compliance',
      'Certified medical staff'
    ]
  },
  'First Aid & Health Awareness Training': {
    title: 'First Aid & Health Awareness Training',
    desc: 'Training programs to empower your workforce in health and safety. Includes first aid, CPR, and health awareness.',
    list: [
      'First aid and CPR training',
      'Health and safety workshops',
      'Customizable for your workplace',
      'Certification provided'
    ]
  },
  'Pre-Employment & Periodical Health Checks': {
    title: 'Pre-Employment & Periodical Health Checks',
    desc: 'Pre-employment, annual, and periodical medical examinations for compliance and employee well-being.',
    list: [
      'Pre-employment health checks',
      'Annual/periodical exams',
      'Fitness and compliance reports',
      'Customizable for industry needs'
    ]
  }
};

const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('service-modal');
const serviceModalBody = document.getElementById('service-modal-body');
const serviceModalClose = document.getElementById('service-modal-close');

if (serviceCards && serviceModal && serviceModalBody && serviceModalClose) {
  serviceCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = card.querySelector('h3')?.textContent?.trim();
      const details = serviceDetails[title];
      if (details) {
        serviceModalBody.innerHTML = `
          <div class="service-modal-title">${details.title}</div>
          <div class="service-modal-desc">${details.desc}</div>
          <ul class="service-modal-list list-disc pl-6">
            ${details.list.map(item => `<li>${item}</li>`).join('')}
          </ul>
        `;
        serviceModal.classList.add('active');
      }
    });
  });
  function closeServiceModalWithAnimation() {
    const modalContent = serviceModal.querySelector('.service-modal-content');
    if (modalContent) {
      modalContent.classList.add('modal-closing');
      setTimeout(() => {
        serviceModal.classList.remove('active');
        modalContent.classList.remove('modal-closing');
      }, 400);
    } else {
      serviceModal.classList.remove('active');
    }
  }
  serviceModalClose.addEventListener('click', closeServiceModalWithAnimation);
  serviceModal.addEventListener('click', function(e) {
    if (e.target === serviceModal) {
      closeServiceModalWithAnimation();
    }
  });
}

// --- Home Slideshow Logic ---
(function() {
  /*const slides = document.querySelectorAll('#home-slideshow-bg .slideshow-img');*/
  const slides = document.querySelectorAll('#he .img_');
  const prevBtn = document.getElementById('slideshow-prev');
  const nextBtn = document.getElementById('slideshow-next');
  const dotsContainer = document.getElementById('slideshow-dots');
  let current = 0;
  let timer = null;
  let isAnimating = false;


  // Initialize slides
  slides.forEach((img, index) => {
      //alert('running');
    img.classList.remove('active', 'fade-out');

    if (index === 0) {
      img.classList.add('active');
    }
    
    // Error handling
    img.onerror = function() {
      if (img.src.indexOf('maxonlogo.png') === -1) {
        img.src = 'maxonlogo.png';
      }
    };
  });

  function showSlide(idx) {
      //alert("fine");
    if (isAnimating || idx === current) return;
    //alert("fine");
    isAnimating = true;
    
    const currentSlide = slides[current];
    const nextSlide = slides[idx];
    
    // Add fade-out class to current slide
    currentSlide.classList.add('fade-out');
    currentSlide.style.height = '0px';
    currentSlide.classList.remove('active');
    
    // Show next slide
      if(window.innerWidth <= 700){
          nextSlide.style.height = '300px';
      }
      else{
          nextSlide.style.height = '600px';
      }
      //nextSlide.style.height = '500px';
    nextSlide.classList.add('active');
    nextSlide.classList.remove('fade-out');
    
    // Update current index
    current = idx;
    
    // Update dots
    updateDots();
    
    // Reset animation flag after transition
    setTimeout(() => {
      isAnimating = false;
    }, 1500); // Match the CSS transition duration
  }

  function nextSlide() {
    const nextIdx = (current + 1) % slides.length;
    showSlide(nextIdx);
  }

  function prevSlide() {
    const prevIdx = (current - 1 + slides.length) % slides.length;
    showSlide(prevIdx);
  }

  function updateDots() {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-colors duration-300 focus:outline-none ${
        i === current ? 'bg-blue-700' : 'bg-blue-200 hover:bg-blue-300'
      }`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        if (i !== current) {
          showSlide(i);
          resetTimer();
        }
      });
      dotsContainer.appendChild(dot);
    });
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, 3000);
  }


  // Initialize slideshow
  if (slides.length > 0) {
    // Create dots
    updateDots();
    
    // Start auto-play after initial delay
    setTimeout(() => {
      resetTimer();
    }, 3000);

    
    // Add event listeners
    if (nextBtn) {
        //alert("nextbtn");
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }
    else{
        alert("no nextbtn");
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }
  }
  else {
      alert("else");
  }
})();

// --- Seamless Infinite Logo Carousel with Arrows ---
let carouselTrack;
let images;
let imageWidth;
let scrollPos = 0;
let animationFrameId;
let scrollSpeed = 1.0; // default for desktop

function getResponsiveScrollSpeed() {
  const width = window.innerWidth;
  if (width < 600) return 2.2; // Faster for small screens
  if (width < 900) return 1.5; // Medium speed for tablets
  return 1.0; // Default for desktop
}

// Set initial speed
scrollSpeed = getResponsiveScrollSpeed();

window.addEventListener('resize', () => {
  scrollSpeed = getResponsiveScrollSpeed();
});

function setupInfiniteScroll() {
  carouselTrack = document.querySelector('.carousel-track');
  images = carouselTrack.querySelectorAll('img');

  if (images.length === 0) return;

  // Duplicate the images for seamless loop
  images.forEach(img => {
    const clone = img.cloneNode(true);
    carouselTrack.appendChild(clone);
  });

  // Recalculate images after cloning
  images = carouselTrack.querySelectorAll('img');
  
  // Start continuous animation from position 0
  startContinuousAnimation(0);
  
  window.addEventListener('resize', () => {
    // Restart animation on resize
    cancelAnimationFrame(animationFrameId);
    startContinuousAnimation(0);
  });
}

function stopScrolling() {
  cancelAnimationFrame(animationFrameId);
}

// Manual navigation - smooth scrolling in clicked direction
function scrollByOne(dir) {
  // Pause the continuous animation
  cancelAnimationFrame(animationFrameId);
  
  // Calculate how much to scroll (one image width plus margin)
  const scrollAmount = 120; // Approximate width of one logo + margin
  
  // Smoothly scroll in the clicked direction
  let currentPosition = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '') || 0);
  let targetPosition = currentPosition + (dir * scrollAmount);
  
  // Add smooth transition for manual scrolling
  carouselTrack.style.transition = 'transform 1s ease-in-out';
  carouselTrack.style.transform = `translateX(${targetPosition}px)`;
  
  // Resume continuous animation after manual scroll
  setTimeout(() => {
    carouselTrack.style.transition = 'none';
    // Restart continuous animation from the current position
    startContinuousAnimation(targetPosition);
  }, 1000);
}

// New function to start continuous animation from a specific position
function startContinuousAnimation(startPosition = 0) {
  let position = Math.abs(startPosition);
  let speed = 0.8;
  let totalWidth = 0;
  
  function calcWidth() {
    totalWidth = 0;
    for (let i = 0; i < images.length / 2; i++) {
      totalWidth += images[i].offsetWidth + (parseFloat(getComputedStyle(images[i]).marginRight) || 0) + (parseFloat(getComputedStyle(images[i]).marginLeft) || 0);
    }
  }
  
  calcWidth();
  
  function animate() {
    position += speed;
    if (position >= totalWidth) {
      position = 0;
      carouselTrack.style.transition = 'none';
      carouselTrack.style.transform = `translateX(0px)`;
      void carouselTrack.offsetWidth; // Force reflow
      carouselTrack.style.transition = '';
    }
    carouselTrack.style.transform = `translateX(${-position}px)`;
    animationFrameId = requestAnimationFrame(animate);
  }
  
  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  setupInfiniteScroll();
  document.querySelector('.carousel-arrow.left').addEventListener('click', () => scrollByOne(1));
  document.querySelector('.carousel-arrow.right').addEventListener('click', () => scrollByOne(-1));
});

// Animated counters for Our Impact section
function animateImpactCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const isPercent = counter.parentElement && counter.parentElement.textContent.includes('%');
    const isPlus = counter.parentElement && counter.parentElement.textContent.includes('+');
    let count = 0;
    const duration = 2000; // ms
    const step = Math.ceil(target / (duration / 16));
    function updateCounter() {
      count += step;
      if (count >= target) {
        count = target;
        counter.textContent = count + (isPercent ? '%' : '') + (isPlus ? '+' : '');
      } else {
        counter.textContent = count + (isPercent ? '%' : '') + (isPlus ? '+' : '');
        requestAnimationFrame(updateCounter);
      }
    }
    // Start from 0
    counter.textContent = (isPercent ? '0%' : '0') + (isPlus ? '+' : '');
    requestAnimationFrame(updateCounter);
  });
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateImpactCounters);
} else {
  animateImpactCounters();
}

// ================= ENHANCED MENU INTERACTIONS =================

// Handle active menu state based on current section
function updateActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('#header_div_right ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    // Remove active class from all menu items
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section's menu item
    if (currentSection) {
        const activeLink = document.querySelector(`#header_div_right ul li a[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Simple smooth scrolling
function simpleSmoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click handlers to menu links
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#header_div_right ul li a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            simpleSmoothScroll(targetId);
        });
    });
    
    // Update active menu on scroll
    window.addEventListener('scroll', () => {
        updateActiveMenu();
    });
    
    // Initial active state
    updateActiveMenu();
});

// --- Dynamic Footer Logic ---
(function() {
  const fixedFooter = document.querySelector('.fixed-footer');
  let lastScrollTop = 0;
  let scrollDirection = 'down';
  let scrollThreshold = 0;
  
  if (fixedFooter) {
    // Initialize footer with full height
    fixedFooter.style.height = '60px';
    fixedFooter.style.padding = '18px 0';
    
    function updateFooterSize() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      // Determine scroll direction
      scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
      lastScrollTop = scrollTop;
      
      // Update footer based on scroll position
      if (scrollTop < 100) {
        // At the top - full size
        fixedFooter.className = 'fixed-footer';
        fixedFooter.style.height = '60px';
        fixedFooter.style.padding = '18px 0';
      } else if (scrollTop < 300) {
        // Slight scroll - reduce size
        fixedFooter.className = 'fixed-footer scrolled';
        fixedFooter.style.height = '50px';
        fixedFooter.style.padding = '15px 0';
      } else if (scrollTop < 600) {
        // More scroll - further reduce
        fixedFooter.className = 'fixed-footer scrolled-more';
        fixedFooter.style.height = '40px';
        fixedFooter.style.padding = '12px 0';
      } else {
        // Maximum scroll - smallest size
        fixedFooter.className = 'fixed-footer scrolled-max';
        fixedFooter.style.height = '30px';
        fixedFooter.style.padding = '8px 0';
      }
      
      // Add smooth transition for mobile devices
      if (window.innerWidth <= 768) {
        if (scrollTop < 100) {
          fixedFooter.style.height = '55px';
          fixedFooter.style.padding = '16px 0';
        } else if (scrollTop < 300) {
          fixedFooter.style.height = '45px';
          fixedFooter.style.padding = '13px 0';
        } else if (scrollTop < 600) {
          fixedFooter.style.height = '37px';
          fixedFooter.style.padding = '10px 0';
        } else {
          fixedFooter.style.height = '30px';
          fixedFooter.style.padding = '8px 0';
        }
      }
      
      // Extra small screens
      if (window.innerWidth <= 480) {
        if (scrollTop < 100) {
          fixedFooter.style.height = '60px';
          fixedFooter.style.padding = '15px 0';
        } else if (scrollTop < 300) {
          fixedFooter.style.height = '50px';
          fixedFooter.style.padding = '12px 0';
        } else if (scrollTop < 600) {
          fixedFooter.style.height = '40px';
          fixedFooter.style.padding = '10px 0';
        } else {
          fixedFooter.style.height = '30px';
          fixedFooter.style.padding = '8px 0';
        }
      }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateFooterSize);
        ticking = true;
      }
    }
    
    function handleScroll() {
      ticking = false;
      requestTick();
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set correct state
    updateFooterSize();
    
    // Handle window resize
    window.addEventListener('resize', updateFooterSize);
  }
})();

(function() {
  function handleMobileHeader() {
    const header = document.getElementById('header_div');
    const main = document.querySelector('main');
    if (!header || !main) return;
    function adjustPadding() {
      if (window.innerWidth > 768) return;
      if (window.scrollY > 30) {
        header.classList.add('shrunk');
        main.style.paddingTop = '56px';
      } else {
        header.classList.remove('shrunk');
        main.style.paddingTop = '30vh';
      }
    }
    window.addEventListener('scroll', adjustPadding);
    window.addEventListener('resize', adjustPadding);
    adjustPadding();
  }
  document.addEventListener('DOMContentLoaded', handleMobileHeader);
})();

(function() {
  function popInGalleryImagesMobile() {
    const imgs = document.querySelectorAll('.gallery-img-pop');
    function checkImgs() {
      if (window.innerWidth > 768) {
        imgs.forEach(img => img.classList.remove('pop-in'));
        return;
      }
      imgs.forEach((img, idx) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
          if (!img.classList.contains('pop-in')) {
            img.classList.add('pop-in');
            console.log('Pop-in triggered for image', idx, img.src);
          }
        }
      });
    }
    window.addEventListener('scroll', checkImgs);
    window.addEventListener('resize', checkImgs);
    checkImgs();
  }
  document.addEventListener('DOMContentLoaded', popInGalleryImagesMobile);
})();

(function() {
  function startMobileGalleryCarousels() {
    // Only run on mobile
    if (window.innerWidth > 768) {
      // On desktop, show grid and hide carousels
      document.querySelectorAll('.gallery-grid').forEach(el => el.style.display = '');
      document.querySelectorAll('.gallery-carousel-1, .gallery-carousel-2').forEach(el => el.style.display = 'none');
      return;
    }
    // On mobile, hide grid and show carousels
    document.querySelectorAll('.gallery-grid').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.gallery-carousel-1, .gallery-carousel-2').forEach(el => el.style.display = 'flex');

    [1, 2].forEach(function(num) {
      const carousel = document.querySelector('.gallery-carousel-' + num);
      if (!carousel) return;
      // Only wrap if not already wrapped
      let inner = carousel.querySelector('.carousel-inner');
      if (!inner) {
        inner = document.createElement('div');
        inner.className = 'carousel-inner flex items-center';
        while (carousel.firstChild) inner.appendChild(carousel.firstChild);
        carousel.appendChild(inner);
      }
      // Only duplicate if not already duplicated
      const imgCount = Array.from(inner.children).filter(child => child.tagName === 'IMG').length;
      if (inner.children.length === imgCount) {
        for (let i = 0; i < imgCount; i++) {
          const clone = inner.children[i].cloneNode(true);
          inner.appendChild(clone);
        }
      }
      let position = 0;
      let speed = 0.4;
      let totalWidth = 0;
      function calcWidth() {
        totalWidth = 0;
        for (let i = 0; i < inner.children.length / 2; i++) {
          totalWidth += inner.children[i].offsetWidth + 16; // 16px gap
        }
      }
      // Wait for all images to load before starting animation
      let loaded = 0;
      const imgs = inner.querySelectorAll('img');
      imgs.forEach(img => {
        if (img.complete) loaded++;
        else img.addEventListener('load', () => {
          loaded++;
          if (loaded === imgs.length) {
            calcWidth();
            animate();
          }
        });
      });
      if (loaded === imgs.length) {
        calcWidth();
        animate();
      }
      function animate() {
        position += speed;
        if (position >= totalWidth) {
          position = 0;
          inner.style.transition = 'none';
          inner.style.transform = `translateX(0px)`;
          void inner.offsetWidth;
          inner.style.transition = '';
        }
        inner.style.transform = `translateX(${-position}px)`;
        requestAnimationFrame(animate);
      }
      window.addEventListener('resize', calcWidth);
    });
  }
  window.addEventListener('resize', startMobileGalleryCarousels);
  document.addEventListener('DOMContentLoaded', startMobileGalleryCarousels);
})();

// Header background toggle on scroll
window.addEventListener('scroll', function() {
  var header = document.getElementById('header_div');
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  // If you have .pc-header as a separate class, also toggle it
  var pcHeader = document.querySelector('.pc-header');
  if (pcHeader) {
    if (window.scrollY > 10) {
      pcHeader.classList.add('scrolled');
    } else {
      pcHeader.classList.remove('scrolled');
    }
  }
});

// Remove scroll event that toggles hero text visibility
// The hero text and button should always be visible

// Remove scroll-up show/hide logic for fixed footer
// Always show the fixed footer
window.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('show-footer');
});


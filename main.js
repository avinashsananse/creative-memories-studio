// ========================================================
// CREATIVE MEMORIES STUDIO - MULTI-PAGE ROUTER & ENGINE
// 100% Mobile Optimized, Zero-Reload Seamless Switching
// ========================================================

// --- MASTER MULTI-PAGE ROUTER ---
function navigateTo(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page-view');
  pages.forEach(p => p.classList.remove('active-page'));

  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update navbar active indicators
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('text-gold-400', 'border-b', 'border-gold-400', 'pb-0.5');
    link.classList.add('hover:text-gold-400');
  });

  const activeNav = document.getElementById('nav-' + pageId);
  if (activeNav) {
    activeNav.classList.add('text-gold-400', 'border-b', 'border-gold-400', 'pb-0.5');
    activeNav.classList.remove('hover:text-gold-400');
  }
}

// --- REVIEW CAROUSEL ---
const reviewsData = [
  {
    quote: '"Creative Memories Studio has captured our most beautiful moments in the most amazing way. The team is professional, creative and very cooperative. Highly recommended!"',
    author: 'Rohit & Sneha',
    tag: 'Wedding Client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    quote: '"The 4K cinematic wedding film and the express same-day reels took our Instagram by storm! Avinash and his team are true visual artists."',
    author: 'Aditya & Pooja',
    tag: 'Destination Wedding',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    quote: '"Unbelievable corporate commercial production! Drone shots, color grading, and speed of delivery exceeded our board expectations."',
    author: 'Vikram Joshi',
    tag: 'Corporate Film Client',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];
let currentReviewIdx = 0;

function nextReview() {
  currentReviewIdx = (currentReviewIdx + 1) % reviewsData.length;
  updateReviewUI();
}

function prevReview() {
  currentReviewIdx = (currentReviewIdx - 1 + reviewsData.length) % reviewsData.length;
  updateReviewUI();
}

function updateReviewUI() {
  const q = document.getElementById('review-text');
  const a = document.getElementById('review-author');
  const t = document.getElementById('review-tag');
  const img = document.getElementById('review-avatar');
  if (q && a && t && img) {
    q.innerText = reviewsData[currentReviewIdx].quote;
    a.innerText = reviewsData[currentReviewIdx].author;
    t.innerText = reviewsData[currentReviewIdx].tag;
    img.src = reviewsData[currentReviewIdx].avatar;
  }
}

// --- AUDIO UNMUTE TOGGLE ---
let isAudioMuted = true;
function toggleAudio() {
  const icon = document.getElementById('audio-icon');
  const label = document.getElementById('audio-label');
  isAudioMuted = !isAudioMuted;
  if (!isAudioMuted) {
    icon.className = "fa-solid fa-volume-high text-xs text-gold-400";
    label.innerText = "PLAYING";
  } else {
    icon.className = "fa-solid fa-volume-xmark text-xs";
    label.innerText = "UNMUTE";
  }
}

// --- 100+ CATEGORIES SWITCHER ---
function switchCatTab(tabName) {
  const tabs = ['photo', 'video', 'film', 'reels', 'editing'];
  tabs.forEach(t => {
    const content = document.getElementById('cat-tab-' + t);
    const btn = document.getElementById('tab-btn-' + t);
    if (content) content.classList.add('hidden');
    if (btn) {
      btn.className = "px-5 py-3 font-semibold uppercase tracking-wider text-gray-400 hover:text-white whitespace-nowrap";
    }
  });

  const activeContent = document.getElementById('cat-tab-' + tabName);
  const activeBtn = document.getElementById('tab-btn-' + tabName);
  if (activeContent) activeContent.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.className = "px-5 py-3 font-bold uppercase tracking-wider text-gold-400 border-b-2 border-gold-400 whitespace-nowrap";
  }
}

// --- STEP 2: SMART CALENDAR & PRIORITY REQUEST LOGIC ---
function selectDate(dateLabel, isBooked) {
  const box = document.getElementById('booking-alert-box');
  const title = document.getElementById('selected-date-text');
  const msg = document.getElementById('selected-date-msg');
  if (!box || !title || !msg) return;

  box.classList.remove('hidden');
  title.innerText = "Selected Slot: " + dateLabel;

  if (isBooked) {
    msg.innerHTML = "<span class='text-amber-400 font-bold'>⚠️ This date has an ongoing shoot.</span> However, you can still submit a <b>Priority Request</b>! We will check team availability and respond within 2 hours via WhatsApp.";
  } else {
    msg.innerHTML = "<span class='text-emerald-400 font-bold'>✓ Slot is fully open!</span> You can proceed with standard Stage 1 (25%) booking.";
  }
}

// --- STEP 3: AI FACE RECOGNITION SCANNER SIMULATION ---
function previewSelfie(event) {
  const file = event.target.files[0];
  if (!file) return;

  const preview = document.getElementById('selfie-preview');
  const defaultIcon = document.getElementById('default-scanner-icon');
  const scanLine = document.getElementById('scanner-line');
  const status = document.getElementById('ai-status');
  const count = document.getElementById('ai-count');
  const results = document.getElementById('matched-results');

  if (preview) {
    preview.src = URL.createObjectURL(file);
    preview.classList.remove('hidden');
  }
  if (defaultIcon) defaultIcon.classList.add('hidden');
  if (scanLine) scanLine.classList.remove('hidden');

  if (status) status.innerText = "Scanning face features & matching album...";
  if (count) count.classList.add('hidden');
  if (results) results.classList.add('hidden');

  setTimeout(() => {
    if (scanLine) scanLine.classList.add('hidden');
    if (status) status.innerHTML = "<span class='text-emerald-400 font-bold'>✓ Face Verified Successfully!</span>";
    if (count) count.classList.remove('hidden');
    if (results) results.classList.remove('hidden');
  }, 1400);
}

// --- STEP 4: CLIENT PRIVATE PROOFING & WATERMARK GALLERY ---
let selectedPhotosCount = 0;

function unlockGallery() {
  const pinInput = document.getElementById('client-passcode');
  const errorMsg = document.getElementById('login-error');
  const loginCard = document.getElementById('client-login-card');
  const galleryPanel = document.getElementById('private-gallery-panel');

  if (!pinInput) return;
  const pin = pinInput.value.trim();

  if (pin === "2026") {
    if (loginCard) loginCard.classList.add('hidden');
    if (galleryPanel) galleryPanel.classList.remove('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');
  } else {
    if (errorMsg) errorMsg.classList.remove('hidden');
  }
}

function toggleSelectPhoto(btn) {
  const isSelected = btn.classList.contains('bg-gold-500');
  const counter = document.getElementById('selected-counter');

  if (!isSelected) {
    btn.classList.add('bg-gold-500', 'text-black', 'border-gold-500');
    btn.classList.remove('text-gray-300');
    btn.innerHTML = '<i class="fa-solid fa-heart text-red-600"></i> <b>Selected</b>';
    selectedPhotosCount++;
  } else {
    btn.classList.remove('bg-gold-500', 'text-black', 'border-gold-500');
    btn.classList.add('text-gray-300');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i> <span>Select for Album</span>';
    selectedPhotosCount--;
  }

  if (counter) counter.innerText = selectedPhotosCount + " / 80 Photos";
}

function requestTouchup(imgName) {
  const note = prompt("Enter retouching instruction for " + imgName + " (e.g. Skin smooth, remove background object):");
  if (note && note.trim() !== "") {
    alert("Retouch request noted for " + imgName + ": " + note.trim());
  }
}

function submitAlbumSelection() {
  if (selectedPhotosCount === 0) {
    alert("Please select at least 1 photo for your album!");
    return;
  }
  alert("Success! " + selectedPhotosCount + " photos submitted to Creative Memories Studio for album layout design. Our team will contact you!");
}

// --- STEP 5: SMART BUDGET ESTIMATOR & 4-STAGE SPLIT ---
let basePrice = 45000;

function setDuration(days, price, btn) {
  basePrice = price;
  const buttons = document.querySelectorAll('.duration-btn');
  buttons.forEach(b => {
    b.classList.remove('active-option', 'border-gold-400', 'bg-gold-500/20', 'text-white', 'font-bold');
    b.classList.add('border-white/10', 'bg-dark-900', 'text-gray-300', 'font-medium');
  });

  btn.classList.add('active-option', 'border-gold-400', 'bg-gold-500/20', 'text-white', 'font-bold');
  btn.classList.remove('border-white/10', 'bg-dark-900', 'text-gray-300', 'font-medium');
  calculateBudget();
}

function calculateBudget() {
  let addonTotal = 0;
  const checkboxes = document.querySelectorAll('.addon-check:checked');
  checkboxes.forEach(cb => {
    addonTotal += parseInt(cb.value);
  });

  const grandTotal = basePrice + addonTotal;
  const stageAmount = Math.round(grandTotal / 4);

  const totalElem = document.getElementById('total-package-price');
  const s1 = document.getElementById('stage1-val');
  const s2 = document.getElementById('stage2-val');
  const s3 = document.getElementById('stage3-val');
  const s4 = document.getElementById('stage4-val');

  if (totalElem) totalElem.innerText = "₹" + grandTotal.toLocaleString('en-IN');
  if (s1) s1.innerText = "₹" + stageAmount.toLocaleString('en-IN');
  if (s2) s2.innerText = "₹" + stageAmount.toLocaleString('en-IN');
  if (s3) s3.innerText = "₹" + stageAmount.toLocaleString('en-IN');
  if (s4) s4.innerText = "₹" + stageAmount.toLocaleString('en-IN');
}

function sendCalculatedQuoteToWhatsApp() {
  const total = document.getElementById('total-package-price') ? document.getElementById('total-package-price').innerText : "Custom";
  const stage = document.getElementById('stage1-val') ? document.getElementById('stage1-val').innerText : "Advance";
  const message = `Hello Creative Memories Studio! I customized a package on your website.%0A%0AEstimated Total: ${total}%0ABooking Advance (25%): ${stage}%0A%0AI want to discuss this shoot and lock my date!`;
  window.open(`https://wa.me/918806567350?text=${message}`, '_blank');
}

// --- STEP 6: GUEST LIVE FEED SLIDESHOW STREAM ---
const sampleSlides = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80"
];
let slideIndex = 0;

setInterval(() => {
  slideIndex = (slideIndex + 1) % sampleSlides.length;
  const slideImg = document.getElementById('slideshow-image');
  if (slideImg) {
    slideImg.style.opacity = '0';
    setTimeout(() => {
      slideImg.src = sampleSlides[slideIndex];
      slideImg.style.opacity = '1';
    }, 300);
  }
}, 4000);

function handleGuestUpload(event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    const newUrl = URL.createObjectURL(files[0]);
    sampleSlides.unshift(newUrl);
    const slideImg = document.getElementById('slideshow-image');
    const author = document.getElementById('slide-author');
    const count = document.getElementById('live-upload-count');

    if (slideImg) slideImg.src = newUrl;
    if (author) author.innerText = "Uploaded by You (Live Now!)";
    if (count) count.innerText = "Live Photos: " + sampleSlides.length;
    alert("Awesome! " + files.length + " photo(s) added to the Live Wedding Projector stream!");
  }
}

function toggleFullScreenSlide() {
  const elem = document.getElementById("slideshow-image");
  if (!elem) return;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}

// --- STEP 7: 3D FLIPBOOK e-ALBUM & PRINT MERCH STORE ---
const flipPages = [
  {
    left: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
    right: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80"
  },
  {
    left: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80",
    right: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80"
  }
];
let currentFlipSpread = 0;

function nextFlipPage() {
  if (currentFlipSpread < flipPages.length - 1) {
    currentFlipSpread++;
    updateFlipbookUI();
  }
}

function prevFlipPage() {
  if (currentFlipSpread > 0) {
    currentFlipSpread--;
    updateFlipbookUI();
  }
}

function updateFlipbookUI() {
  const leftPage = document.getElementById('flip-left-page');
  const rightPage = document.getElementById('flip-right-page');
  const pageNum = document.getElementById('flip-page-num');

  if (leftPage) leftPage.style.backgroundImage = `url('${flipPages[currentFlipSpread].left}')`;
  if (rightPage) rightPage.style.backgroundImage = `url('${flipPages[currentFlipSpread].right}')`;
  if (pageNum) pageNum.innerText = `Page ${ (currentFlipSpread * 2) + 1 }-${ (currentFlipSpread * 2) + 2 } / 4`;
}

function updateFramePrice() {
  const frameSelect = document.getElementById('frame-type');
  const totalDisplay = document.getElementById('frame-total-display');
  if (frameSelect && totalDisplay) {
    const price = frameSelect.value;
    totalDisplay.innerText = "₹" + parseInt(price).toLocaleString('en-IN');
  }
}

function orderFrameViaWhatsApp() {
  const selectElem = document.getElementById('frame-type');
  const addressElem = document.getElementById('frame-address');

  if (!selectElem || !addressElem) return;
  const selectedFrame = selectElem.options[selectElem.selectedIndex].text;
  const address = addressElem.value.trim();

  if (!address) {
    alert("Please enter delivery address before placing order!");
    return;
  }

  const msg = `Hello Creative Memories Studio! I want to order a custom frame.%0A%0AFrame: ${selectedFrame}%0ADelivery Address: ${encodeURIComponent(address)}%0A%0APlease share UPI details for payment!`;
  window.open(`https://wa.me/918806567350?text=${msg}`, '_blank');
}

// --- CONTACT FORM QUICK TRIGGER ---
function submitContactForm() {
  const name = document.getElementById('contact-name').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const msg = document.getElementById('contact-msg').value.trim();

  if (!name || !phone) {
    alert("Please fill your Name and Phone Number!");
    return;
  }

  const text = `Hello Creative Memories Studio!%0A%0AName: ${name}%0APhone: ${phone}%0ARequirement: ${encodeURIComponent(msg)}`;
  window.open(`https://wa.me/918806567350?text=${text}`, '_blank');
}

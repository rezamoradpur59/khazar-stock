document.addEventListener("DOMContentLoaded", () => {
  // ============================================================
  // ۱. مدیریت پنجره بازشوی تماس (پاپ‌آپ انتخاب دو شماره)
  // ============================================================
  const callBtn = document.getElementById("callToggleBtn");
  const callPopup = document.getElementById("callPopup");

  if (callBtn && callPopup) {
    callBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      callPopup.classList.toggle("show");
    });

    // بستن پنجره با کلیک در بیرون از آن
    document.addEventListener("click", (e) => {
      if (!callPopup.contains(e.target) && e.target !== callBtn) {
        callPopup.classList.remove("show");
      }
    });
  }

  // ============================================================
  // ۲. اسلایدر تصاویر صفحه اصلی
  // ============================================================
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  const intervalTime = 3500;

  function setSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    if (slides[index]) slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
  }

  function nextSlide() {
    if (slides.length === 0) return;
    currentIndex = (currentIndex + 1) % slides.length;
    setSlide(currentIndex);
  }

  if (slides.length > 0 && dots.length > 0) {
    let slideTimer = setInterval(nextSlide, intervalTime);
    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        clearInterval(slideTimer);
        currentIndex = idx;
        setSlide(currentIndex);
        slideTimer = setInterval(nextSlide, intervalTime);
      });
    });
  }

  // ============================================================
  // ۳. استعلام و جایگذاری خودکار قیمت‌ها از prices.json
  // ============================================================
  fetch('prices.json')
    .then(res => {
      if (!res.ok) throw new Error("فایل قیمت در دسترس نیست");
      return res.json();
    })
    .then(data => {
      for (const [key, value] of Object.entries(data)) {
        const el = document.getElementById('price-' + key);
        if (el && value && value.formatted_price) {
          el.innerText = value.formatted_price;
        }
      }
    })
    .catch(err => {
      console.log('وضعیت قیمت‌ها: استعلام مستقیم تلفنی');
      // در صورت لود نشدن قیمت‌ها، متن جایگزین نمایش داده می‌شود
      ['price-clutch_206', 'price-brake_206'].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.innerText === "در حال دریافت...") {
          el.innerText = "تماس بگیرید";
        }
      });
    });
});

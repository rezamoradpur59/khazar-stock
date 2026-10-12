document.addEventListener("DOMContentLoaded", () => {
    // مدیریت اسلایدر
    initSlider();
    // مدیریت پاپ‌آپ تماس
    initCallPopup();
});

// تابع نمایش قطعات بر اساس خودروی انتخابی
function showParts(carId) {
    const container = document.getElementById('parts-container');
    const list = document.getElementById('parts-list');
    const title = document.getElementById('selected-car-title');
    
    // شبیه‌سازی بانک اطلاعاتی قطعات
    const database = {
        '206': [
            { id: 'clutch_206', name: 'دیسک و صفحه تیپ ۵' },
            { id: 'brake_206', name: 'لنت ترمز جلو' },
            { id: 'dynamo_206', name: 'دینام استوک' },
            { id: 'starter_206', name: 'استارت' },
            { id: 'gearbox_206', name: 'گیربکس کامل' }
        ]
    };

    const parts = database[carId] || [];
    
    // پاکسازی لیست قبلی
    list.innerHTML = '';
    title.innerText = `قطعات موجود برای: ${carId === '206' ? 'پژو ۲۰۶ / ۲۰۷' : 'خودروی انتخابی'}`;

    // ایجاد کارت‌های قطعات
    parts.forEach(part => {
        const card = document.createElement('div');
        card.className = 'part-card';
        card.innerHTML = `
            <div class="part-title">${part.name}</div>
            <span class="part-price" id="price-${part.id}">در حال بررسی قیمت...</span>
            <a href="https://wa.me/989397235970?text=سلام،%20استعلام%20${part.name}" target="_blank" class="part-wa-link">
                <i class="fa-brands fa-whatsapp"></i> سفارش واتس‌اپ
            </a>
        `;
        list.appendChild(card);
    });

    container.style.display = 'block';
    
    // پس از ایجاد المان‌ها، قیمت‌ها را فچ کن
    fetchPrices();
}

function fetchPrices() {
    fetch('prices.json')
        .then(res => {
            if (!res.ok) throw new Error("فایل قیمت پیدا نشد");
            return res.json();
        })
        .then(data => {
            for (const [key, value] of Object.entries(data)) {
                const el = document.getElementById('price-' + key);
                if (el) el.innerText = value.formatted_price;
            }
        })
        .catch(err => {
            console.error('خطا در لود قیمت:', err);
            // حل مشکل "در حال دریافت" همیشگی:
            document.querySelectorAll('.part-price').forEach(el => {
                if (el.innerText === "در حال بررسی قیمت...") {
                    el.innerText = "تماس بگیرید";
                    el.style.color = "#ffcc00"; // رنگ متمایز برای جلب توجه
                }
            });
        });
}

// توابع کمکی (اسلایدر و پاپ‌آپ ثابت بمانند)
function initSlider() { /* کد اسلایدر قبلی */ }
function initCallPopup() { /* کد پاپ‌آپ قبلی */ }

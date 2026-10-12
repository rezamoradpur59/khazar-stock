// بانک اطلاعاتی قطعات کامل برای خودروهای مختلف
const carPartsDatabase = {
  '206': [
    { id: 'clutch_206', name: 'دیسک و صفحه تیپ ۵' },
    { id: 'brake_206', name: 'لنت ترمز جلو' },
    { id: 'dynamo_206', name: 'دینام کامل استوک' },
    { id: 'starter_206', name: 'استارت اصل فرانسه' },
    { id: 'gearbox_206', name: 'گیربکس کامل دستی' },
    { id: 'cylinder_206', name: 'سرسیلندر کامل' }
  ],
  '405': [
    { id: 'clutch_405', name: 'دیسک و صفحه والئو' },
    { id: 'brake_405', name: 'لنت ترمز جلو پژو ۴۰۵' },
    { id: 'dynamo_405', name: 'دینام استوک اصلی' },
    { id: 'gearbox_405', name: 'گیربکس زانتایی / ۴۰۵' }
  ],
  'samand': [
    { id: 'clutch_samand', name: 'دیسک و صفحه ملی EF7' },
    { id: 'dynamo_samand', name: 'دینام EF7 و XU7' },
    { id: 'starter_samand', name: 'استارت کامل' }
  ],
  'tandar': [
    { id: 'clutch_tandar', name: 'دیسک و صفحه ال۹۰ (Reno)' },
    { id: 'brake_tandar', name: 'لنت ترمز جلو ال۹۰' }
  ],
  'default': [
    { id: 'general_part', name: 'قطعات موتوری و بدنه استوک' },
    { id: 'general_brake', name: 'سیستم ترمز کامل' }
  ]
};

function showCarParts(carKey) {
  const container = document.getElementById('dynamic-parts-container');
  const listContainer = document.getElementById('dynamic-parts-list');
  const titleEl = document.getElementById('dynamic-car-title');
  
  if (!container || !listContainer) return;

  const parts = carPartsDatabase[carKey] || carPartsDatabase['default'];
  
  // عناوین خودروها
  const carNames = {
    '206': 'پژو ۲۰۶ و ۲۰۷',
    '405': 'پژو پارس / ۴۰۵',
    'samand': 'سمند / سورن / دنا',
    'tandar': 'رنو تندر ۹۰ (ال۹۰)',
    'tara': 'تارا / رانا',
    'pride': 'پراید',
    'tiba': 'تیبا / ساینا / کوییک',
    'nissan': 'وانت نیسان زامیاد',
    'shahin': 'شاهین',
    'megane': 'رنو مگان / ساندرو'
  };

  titleEl.innerText = `قطعات موجود برای: ${carNames[carKey] || 'خودروی انتخابی'}`;
  listContainer.innerHTML = '';

  parts.forEach(part => {
    const card = document.createElement('div');
    card.className = 'part-card';
    card.innerHTML = `
      <div class="part-title">${part.name}</div>
      <span class="part-price" id="price-${part.id}">در حال دریافت...</span>
      <a href="https://wa.me/989397235970?text=سلام،%20استعلام%20قيمت%20${encodeURIComponent(part.name)}" target="_blank" class="part-wa-link">
        <i class="fa-brands fa-whatsapp"></i> سفارش واتس‌اپ
      </a>
    `;
    listContainer.appendChild(card);
  });

  container.style.display = 'block';
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // استعلام قیمت‌ها
  fetchPricesForDynamicParts();
}

function closeParts() {
  const container = document.getElementById('dynamic-parts-container');
  if (container) container.style.display = 'none';
}

function fetchPricesForDynamicParts() {
  fetch('prices.json')
    .then(res => {
      if (!res.ok) throw new Error("خطا در دسترسی به قیمت‌ها");
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
      console.log('استعلام قیمت از طریق واتس‌اپ');
      document.querySelectorAll('.part-price').forEach(el => {
        if (el.innerText === "در حال دریافت...") {
          el.innerText = "تماس / استعلام";
        }
      });
    });
}

import json
import requests

# لیست قطعات اختصاصی پژو ۲۰۶ و ۲۰۷ به همراه کلیدواژه جستجو در ترب
PEUGEOT_PARTS = [
    {
        "id": "clutch_206_tu5",
        "name": "کیت کلاچ (دیسک و صفحه) ۲۰۶ تیپ ۵ والئو",
        "query": "دیسک و صفحه 206 تیپ 5 والئو"
    },
    {
        "id": "clutch_206_tu3",
        "name": "کیت کلاچ (دیسک و صفحه) ۲۰۶ تیپ ۲ والئو",
        "query": "دیسک و صفحه 206 تیپ 2 والئو"
    },
    {
        "id": "brake_front_206",
        "name": "لنت ترمز جلو پژو ۲۰۶ و ۲۰۷",
        "query": "لنت ترمز جلو 206"
    },
    {
        "id": "brake_rear_206",
        "name": "لنت ترمز عقب پژو ۲۰۶ / ۲۰۷ (دیسکی)",
        "query": "لنت ترمز عقب دیسکی 206"
    },
    {
        "id": "timing_belt_206_tu5",
        "name": "تسمه تایم ۲۰۶ تیپ ۵ و ۲۰۷ (پاورگریپ)",
        "query": "تسمه تایم 206 تیپ 5 پاورگریپ"
    },
    {
        "id": "shock_front_206",
        "name": "کمک فنر جلو چپ و راست پژو ۲۰۶ / ۲۰۷",
        "query": "کمک فنر جلو 206 عظام"
    },
    {
        "id": "headlight_207",
        "name": "چراغ جلو پژو ۲۰۷ کروز (جفت)",
        "query": "چراغ جلو 207 کروز"
    },
    {
        "id": "alternator_206",
        "name": "دینام پژو ۲۰۶ و ۲۰۷ (اورجینال/عظام)",
        "query": "دینام 206 والئو عظام"
    }
]

def fetch_price(query):
    try:
        url = "https://api.torob.com/v4/base-product/search/"
        params = {
            "sort": "popularity",
            "page": 0,
            "size": 1,
            "q": query,
            "category": 458  # دسته‌بندی قطعات خودرو ترب
        }
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        res = requests.get(url, params=params, headers=headers, timeout=12)
        data = res.json()
        results = data.get("results", [])
        if results and "price" in results[0]:
            base_price = int(results[0]["price"])
            # محاسبه با ۵ درصد افزایش قیمت
            final_price = int(base_price * 1.05)
            return final_price
    except Exception as e:
        print(f"خطا در دریافت قیمت ({query}): {e}")
    return None

def main():
    prices = {}
    print("شروع استعلام قطعات پژو ۲۰۶ و ۲۰۷...")
    for part in PEUGEOT_PARTS:
        price = fetch_price(part["query"])
        prices[part["id"]] = {
            "name": part["name"],
            "price": price if price else 0,
            "formatted_price": f"{price:,} تومان" if price else "استعلام تلفنی"
        }
        print(f"قطعه: {part['name']} -> قیمت با ۵٪: {prices[part['id']]['formatted_price']}")

    with open("prices.json", "w", encoding="utf-8") as f:
        json.dump(prices, f, ensure_ascii=False, indent=2)
    print("فایل prices.json با موفقیت به‌روزرسانی شد.")

if __name__ == "__main__":
    main()

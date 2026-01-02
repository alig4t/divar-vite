# راهنمای Deploy کردن روی Netlify

## روش 1: استفاده از Static API (ساده‌تر - پیشنهادی)

این روش از داده‌های محلی `db.json` استفاده میکنه و نیازی به سرور جداگانه نداره.

### مراحل:
1. پروژه رو روی GitHub بزار
2. به Netlify برو و "New site from Git" رو انتخاب کن
3. Repository رو انتخاب کن
4. Build settings:
   - Build command: `npm run build:netlify`
   - Publish directory: `dist`
5. Deploy کن!

## روش 2: استفاده از JSONBin.io

اگه میخوای داده‌ها رو از یه API خارجی بگیری:

### مراحل:
1. به [JSONBin.io](https://jsonbin.io) برو و اکانت بساز
2. یه Bin جدید بساز و محتویات `db.json` رو توش کپی کن
3. API Key و Bin ID رو از سایت بگیر
4. فایل `src/services/api-production.js` رو ویرایش کن:
   ```js
   const BIN_ID = 'YOUR_BIN_ID_HERE';
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
5. فایل `src/config.jsx` رو تغییر بده تا از production API استفاده کنه:
   ```js
   import productionApiService from './services/api-production';
   const apiService = isProduction ? productionApiService : localApiService;
   ```

## روش 3: استفاده از Netlify Functions

برای API پیچیده‌تر میتونی از Netlify Functions استفاده کنی.

## تست محلی Production Build

```bash
npm run build
npm run preview
```

## نکات مهم:
- در حالت production، JSON Server کار نمیکنه
- Static API از داده‌های محلی استفاده میکنه
- برای تغییر داده‌ها باید پروژه رو دوباره deploy کنی
- همه عکس‌ها از Unsplash میان و نیازی به آپلود نداری

## Environment Variables (اختیاری)

میتونی در Netlify environment variables تعریف کنی:
- `VITE_API_TYPE`: "static" یا "jsonbin"
- `VITE_JSONBIN_ID`: Bin ID
- `VITE_JSONBIN_KEY`: API Key
# 🏠 پروژه دیوار - پلتفرم آگهی‌های رایگان

## 📋 معرفی پروژه

**دیوار** یک پلتفرم مدرن و کامل برای ثبت و جستجوی آگهی‌های رایگان است که با استفاده از جدیدترین تکنولوژی‌های وب توسعه یافته است. این پروژه شامل تمامی ویژگی‌های یک سایت آگهی‌های واقعی مانند دیوار اصلی می‌باشد.

---

## 🛠 تکنولوژی‌های استفاده شده

### Frontend
- **React 18** - جدیدترین نسخه با پشتیبانی از Concurrent Features
- **Vite** - ابزار Build سریع و مدرن
- **React Router DOM v6** - مدیریت Routing پیشرفته
- **Tailwind CSS** - Framework CSS مدرن و Utility-First
- **Material Tailwind** - کامپوننت‌های UI زیبا و آماده

### Backend & Data
- **JSON Server** - Mock API برای توسعه
- **Mock Authentication** - سیستم احراز هویت شبیه‌سازی شده
- **LocalStorage** - ذخیره‌سازی محلی داده‌ها

### Tools & Libraries
- **React Icons** - آیکون‌های مدرن و متنوع
- **React Dropzone** - آپلود فایل با Drag & Drop
- **React Hook Form** - مدیریت فرم‌های پیشرفته
- **Swiper** - اسلایدر تصاویر حرفه‌ای
- **Concurrently** - اجرای همزمان سرورها

---

## ✨ ویژگی‌های کلیدی

### 🎨 طراحی و رابط کاربری
- **طراحی Responsive** - سازگار با تمامی دستگاه‌ها
- **UI/UX مدرن** - رابط کاربری زیبا و کاربرپسند
- **Dark/Light Theme** - پشتیبانی از تم‌های مختلف
- **انیمیشن‌های نرم** - تجربه کاربری روان و جذاب
- **RTL Support** - پشتیبانی کامل از زبان فارسی

### 🔐 سیستم احراز هویت
- **ثبت نام و ورود** - سیستم کامل مدیریت کاربران
- **محافظت از صفحات** - HOC برای صفحات محافظت شده
- **مدیریت Session** - نگهداری وضعیت ورود کاربر
- **صفحه پروفایل** - داشبورد شخصی کاربر

### 📝 مدیریت آگهی‌ها
- **ثبت آگهی** - فرم پیشرفته با اعتبارسنجی
- **آپلود تصاویر** - امکان آپلود چندین تصویر
- **دسته‌بندی هوشمند** - سیستم دسته‌بندی پویا
- **ویرایش آگهی** - امکان ویرایش آگهی‌های ثبت شده
- **حذف آگهی** - مدیریت آگهی‌های شخصی

### 🔍 جستجو و فیلترینگ
- **جستجوی پیشرفته** - جستجو در عنوان و توضیحات
- **فیلترهای هوشمند**:
  - فیلتر قیمت (حداقل/حداکثر)
  - فیلتر منطقه جغرافیایی
  - فیلتر دسته‌بندی
  - فیلترهای تخصصی هر دسته
- **مرتب‌سازی** - بر اساس تاریخ، قیمت، و...
- **ذخیره فیلترها** - حفظ تنظیمات جستجو

### 🗺 مدیریت مکان
- **انتخاب شهر** - سیستم انتخاب شهر پیشرفته
- **فیلتر محله** - جستجو بر اساس محله‌های مختلف
- **نقشه تعاملی** - نمایش موقعیت آگهی‌ها
- **جستجوی مکانی** - یافتن آگهی‌های اطراف

### 📱 تجربه کاربری موبایل
- **Mobile-First Design** - طراحی اولویت موبایل
- **Touch Gestures** - پشتیبانی از حرکات لمسی
- **Navigation منوی کشویی** - منوی موبایل بهینه
- **Performance بهینه** - سرعت بالا در موبایل

---

## 🏗 معماری پروژه

### 📁 ساختار فولدرها
```
src/
├── components/          # کامپوننت‌های قابل استفاده مجدد
│   ├── Filters/        # سیستم فیلترینگ پیشرفته
│   ├── Layout/         # قالب‌های صفحات
│   ├── Navbar/         # نوار ناوبری
│   ├── Posts/          # نمایش آگهی‌ها
│   ├── Sidebar/        # نوار کناری
│   └── UI/             # کامپوننت‌های عمومی UI
├── pages/              # صفحات اصلی (Lazy Loaded)
├── services/           # لایه سرویس API
├── context/            # مدیریت State سراسری
├── helper/             # توابع کمکی
└── assets/             # فایل‌های استاتیک
```

### 🔄 الگوهای طراحی
- **Component-Based Architecture** - معماری مبتنی بر کامپوننت
- **Custom Hooks** - هوک‌های سفارشی برای منطق مشترک
- **Context API** - مدیریت State سراسری
- **Service Layer** - جداسازی منطق API
- **HOC Pattern** - کامپوننت‌های مرتبه بالا

---

## ⚡ بهینه‌سازی‌های عملکرد

### 🚀 Performance Optimizations
- **Lazy Loading** - بارگذاری تنبل صفحات
- **Code Splitting** - تقسیم کد برای بهبود سرعت
- **Memoization** - بهینه‌سازی رندرینگ مجدد
- **Virtual Scrolling** - اسکرول مجازی برای لیست‌های بزرگ
- **Image Optimization** - بهینه‌سازی تصاویر

### 🧠 Memory Management
- **useCallback** - بهینه‌سازی توابع
- **useMemo** - بهینه‌سازی محاسبات
- **React.memo** - جلوگیری از رندر غیرضروری
- **Cleanup Functions** - پاکسازی منابع

---

## 📊 ویژگی‌های داده

### 💾 مدیریت داده‌ها
- **100+ آگهی نمونه** - داده‌های واقعی و متنوع
- **6 دسته‌بندی اصلی**:
  - 🏠 املاک (خرید/اجاره آپارتمان، ویلا)
  - 🚗 وسایل نقلیه (خودرو، موتور)
  - 📱 کالای دیجیتال (موبایل، لپ‌تاپ)
  - 🏡 خانه و آشپزخانه (مبل، لوازم خانگی)
  - 👕 وسایل شخصی (پوشاک، اکسسوری)
  - 🎯 سرگرمی و ورزش

### 🖼 مدیریت تصاویر
- **تصاویر واقعی** - استفاده از Unsplash API
- **چندین تصویر** - تا 4 تصویر برای هر آگهی
- **Gallery مدرن** - نمایش تصاویر با Swiper
- **Lazy Loading** - بارگذاری تنبل تصاویر

---

## 🔧 ویژگی‌های توسعه

### 🛠 Development Experience
- **Hot Module Replacement** - بروزرسانی فوری کد
- **ESLint Configuration** - کیفیت کد بالا
- **Modern JavaScript** - ES6+ Features
- **TypeScript Ready** - آماده برای TypeScript
- **Git Hooks** - کنترل کیفیت قبل از Commit

### 📦 Build & Deployment
- **Vite Build** - Build سریع و بهینه
- **Environment Variables** - مدیریت متغیرهای محیط
- **Production Optimization** - بهینه‌سازی برای Production
- **Static Deployment** - قابلیت Deploy روی CDN

---

## 🎯 ویژگی‌های خاص

### 🔍 سیستم فیلترینگ پیشرفته
- **فیلتر قیمت** - با قابلیت وارد کردن مقدار دلخواه
- **فیلتر مکان** - انتخاب چندگانه شهر و محله
- **فیلترهای دسته‌ای** - فیلترهای مخصوص هر دسته
- **ذخیره در URL** - حفظ فیلترها در آدرس صفحه
- **پاکسازی سریع** - امکان حذف سریع فیلترها

### 📱 Responsive Design
- **Mobile Navigation** - منوی موبایل بهینه
- **Touch Optimized** - بهینه برای لمس
- **Adaptive Layout** - تطبیق با اندازه صفحه
- **Cross-Browser** - سازگاری با مرورگرهای مختلف

### 🎨 UI/UX Excellence
- **Material Design** - اصول طراحی Material
- **Consistent Colors** - پالت رنگی یکپارچه
- **Smooth Animations** - انیمیشن‌های نرم
- **Loading States** - حالت‌های بارگذاری زیبا
- **Error Handling** - مدیریت خطاها با UI مناسب

---

## 📈 آمار پروژه

| ویژگی | تعداد/مقدار |
|--------|-------------|
| **خطوط کد** | 5000+ |
| **کامپوننت‌ها** | 25+ |
| **صفحات** | 7 |
| **آگهی‌های نمونه** | 100 |
| **دسته‌بندی** | 6 اصلی + زیردسته‌ها |
| **شهرها** | 10 شهر |
| **فیلترها** | 15+ نوع مختلف |

---

## 🚀 نحوه اجرا

### پیش‌نیازها
```bash
Node.js >= 16
npm >= 8
```

### نصب و راه‌اندازی
```bash
# کلون پروژه
git clone [repository-url]
cd divar-vite

# نصب وابستگی‌ها
npm install

# اجرای پروژه (Frontend + Mock Backend)
npm run dev:full

# یا اجرای جداگانه
npm run mock-server  # Backend: http://localhost:3001
npm run dev          # Frontend: http://localhost:5173
```

### Build برای Production
```bash
npm run build
npm run preview
```

---

## 🎓 مهارت‌های نمایش داده شده

### Frontend Development
- ✅ React 18 و Hooks پیشرفته
- ✅ State Management با Context API
- ✅ Routing پیشرفته با React Router
- ✅ Responsive Design با Tailwind CSS
- ✅ Performance Optimization

### JavaScript/ES6+
- ✅ Modern JavaScript Features
- ✅ Async/Await و Promise Handling
- ✅ Destructuring و Spread Operator
- ✅ Array/Object Methods پیشرفته
- ✅ Module System (ES6 Modules)

### UI/UX Design
- ✅ Material Design Implementation
- ✅ Mobile-First Approach
- ✅ Accessibility Best Practices
- ✅ User Experience Optimization
- ✅ Cross-Browser Compatibility

### Development Tools
- ✅ Vite Build Tool
- ✅ ESLint Code Quality
- ✅ Git Version Control
- ✅ NPM Package Management
- ✅ Development Workflow

---

## 🏆 نتیجه‌گیری

این پروژه نمایانگر تسلط کامل بر تکنولوژی‌های مدرن Frontend و توانایی ایجاد یک اپلیکیشن کامل و حرفه‌ای است. از طراحی UI/UX گرفته تا پیاده‌سازی منطق پیچیده و بهینه‌سازی عملکرد، تمامی جنبه‌های توسعه وب مدرن در این پروژه پوشش داده شده است.

---

## 📞 اطلاعات تماس

برای مشاهده کد منبع کامل یا اطلاعات بیشتر در مورد این پروژه، لطفاً با من تماس بگیرید.

**تاریخ آخرین بروزرسانی:** دی ماه 1403

---

*این پروژه با ❤️ و استفاده از جدیدترین تکنولوژی‌های وب توسعه یافته است.*
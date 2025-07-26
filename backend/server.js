const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'cafe_menu.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ خطا در اتصال به دیتابیس:', err.message);
  } else {
    console.log('✅ اتصال به دیتابیس SQLite برقرار شد');
    initDatabase();
  }
});

// Initialize database tables and sample data
function initDatabase() {
  // Create menu_items table
  db.run(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    item_type TEXT NOT NULL,
    description TEXT,
    image TEXT,
    available BOOLEAN DEFAULT 1
  )`, (err) => {
    if (err) {
      console.error('❌ خطا در ایجاد جدول menu_items:', err.message);
    } else {
      console.log('✅ جدول menu_items ایجاد شد');
      insertSampleMenuItems();
    }
  });

  // Create orders table
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_number INTEGER NOT NULL,
    items TEXT NOT NULL,
    total_price REAL NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'pending'
  )`, (err) => {
    if (err) {
      console.error('❌ خطا در ایجاد جدول orders:', err.message);
    } else {
      console.log('✅ جدول orders ایجاد شد');
    }
  });
}

// Insert sample menu items
function insertSampleMenuItems() {
  // Check if data already exists
  db.get('SELECT COUNT(*) as count FROM menu_items', (err, row) => {
    if (err) {
      console.error('❌ خطا در بررسی داده‌ها:', err.message);
      return;
    }
    
    if (row.count === 0) {
      const sampleItems = [
        // نوشیدنی‌ها (drinks)
        { name: 'قهوه اسپرسو', price: 15000, item_type: 'drink', description: 'قهوه تازه برگرفته شده' },
        { name: 'کاپوچینو', price: 18000, item_type: 'drink', description: 'قهوه با شیر داغ و کف' },
        { name: 'لاته', price: 20000, item_type: 'drink', description: 'قهوه با شیر و کف ملایم' },
        { name: 'چای سنتی', price: 8000, item_type: 'drink', description: 'چای ایرانی با هل' },
        { name: 'آب پرتقال طبیعی', price: 12000, item_type: 'drink', description: 'آب پرتقال تازه' },
        { name: 'شیک شکلات', price: 22000, item_type: 'drink', description: 'شیر با شکلات و بستنی' },
        
        // غذای اصلی (main_dish)
        { name: 'پیتزا مخصوص', price: 45000, item_type: 'main_dish', description: 'پیتزا با گوشت و سبزیجات' },
        { name: 'برگر کلاسیک', price: 35000, item_type: 'main_dish', description: 'برگر گوشت با سس مخصوص' },
        { name: 'پاستا آلفردو', price: 38000, item_type: 'main_dish', description: 'پاستا با سس کرمی' },
        { name: 'کباب کوبیده', price: 42000, item_type: 'main_dish', description: 'کباب سنتی ایرانی' },
        { name: 'ساندویچ مرغ', price: 25000, item_type: 'main_dish', description: 'ساندویچ با فیله مرغ' },
        { name: 'غذای مخصوص روز', price: 48000, item_type: 'main_dish', description: 'غذای ویژه سرآشپز' },
        
        // دسر (dessert)
        { name: 'کیک شکلاتی', price: 18000, item_type: 'dessert', description: 'کیک تازه با شکلات' },
        { name: 'تیرامیسو', price: 25000, item_type: 'dessert', description: 'دسر ایتالیایی کلاسیک' },
        { name: 'بستنی وانیلی', price: 15000, item_type: 'dessert', description: 'بستنی خانگی وانیلی' },
        { name: 'کرم کارامل', price: 20000, item_type: 'dessert', description: 'دسر کرمی با کارامل' },
        { name: 'فالوده شیرازی', price: 12000, item_type: 'dessert', description: 'دسر سنتی ایرانی' },
        { name: 'کوکی تازه', price: 8000, item_type: 'dessert', description: 'کوکی تازه پخت' }
      ];

      const stmt = db.prepare('INSERT INTO menu_items (name, price, item_type, description) VALUES (?, ?, ?, ?)');
      
      sampleItems.forEach(item => {
        stmt.run([item.name, item.price, item.item_type, item.description], (err) => {
          if (err) {
            console.error('❌ خطا در درج آیتم:', item.name, err.message);
          }
        });
      });
      
      stmt.finalize(() => {
        console.log('✅ نمونه آیتم‌های منو درج شدند');
      });
    } else {
      console.log('✅ داده‌های منو از قبل موجود است');
    }
  });
}

// API Routes

// Get all items
app.get('/api/items', (req, res) => {
  const { item_type } = req.query;
  
  let query = 'SELECT * FROM menu_items WHERE available = 1';
  let params = [];
  
  if (item_type) {
    query += ' AND item_type = ?';
    params.push(item_type);
  }
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('❌ خطا در دریافت آیتم‌ها:', err.message);
      res.status(500).json({ error: 'خطا در دریافت آیتم‌ها' });
      return;
    }
    console.log(`✅ ${rows.length} آیتم برای ${item_type || 'همه دسته‌ها'} بازگردانده شد`);
    res.json(rows);
  });
});

// Get items by category
app.get('/api/items/:category', (req, res) => {
  const category = req.params.category;
  
  db.all('SELECT * FROM menu_items WHERE item_type = ? AND available = 1', [category], (err, rows) => {
    if (err) {
      console.error('❌ خطا در دریافت آیتم‌های دسته:', err.message);
      res.status(500).json({ error: 'خطا در دریافت آیتم‌ها' });
      return;
    }
    console.log(`✅ ${rows.length} آیتم برای دسته ${category} بازگردانده شد`);
    res.json(rows);
  });
});

// Submit order
app.post('/api/orders', (req, res) => {
  const { table_number, items, total_price } = req.body;
  
  if (!table_number || !items || !total_price) {
    return res.status(400).json({ error: 'اطلاعات ناقص' });
  }
  
  const itemsJson = JSON.stringify(items);
  
  db.run(
    'INSERT INTO orders (table_number, items, total_price) VALUES (?, ?, ?)',
    [table_number, itemsJson, total_price],
    function(err) {
      if (err) {
        console.error('❌ خطا در ثبت سفارش:', err.message);
        res.status(500).json({ error: 'خطا در ثبت سفارش' });
        return;
      }
      console.log(`✅ سفارش جدید ثبت شد - ID: ${this.lastID}`);
      res.json({ 
        success: true, 
        order_id: this.lastID,
        message: 'سفارش با موفقیت ثبت شد'
      });
    }
  );
});

// Get all orders
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY order_date DESC', (err, rows) => {
    if (err) {
      console.error('❌ خطا در دریافت سفارش‌ها:', err.message);
      res.status(500).json({ error: 'خطا در دریافت سفارش‌ها' });
      return;
    }
    
    // Parse items JSON for each order
    const ordersWithParsedItems = rows.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));
    
    res.json(ordersWithParsedItems);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'سرور کافه آنلاین است' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 سرور کافه در پورت ${PORT} اجرا شد`);
  console.log(`📍 آدرس: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 در حال بستن سرور...');
  db.close((err) => {
    if (err) {
      console.error('❌ خطا در بستن دیتابیس:', err.message);
    } else {
      console.log('✅ اتصال دیتابیس بسته شد');
    }
    process.exit(0);
  });
});
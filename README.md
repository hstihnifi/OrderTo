# Cafe Menu Ordering System

A complete Angular + Node.js cafe ordering system with SQLite database.

## Features

- 🏠 **Home Page**: Browse categories (Drinks, Main Dishes, Desserts)
- 🛒 **Cart Page**: View items, adjust quantities with +/- buttons
- 📝 **Submit Page**: Review orders and select table number
- 💾 **Backend API**: RESTful API with SQLite database
- 🔄 **Real-time Data**: Dynamic menu items and order management

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both Servers

#### Option A: Start both at once
```bash
npm run start:both
```

#### Option B: Start separately
```bash
# Terminal 1 - Backend Server
npm run start:backend

# Terminal 2 - Angular Frontend  
npm start
```

### 3. Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## How to Use

1. **Home Page** (`/`):
   - Click on any category (نوشیدنی‌ها, غذای اصلی, دسر)
   - Click "ثبت نهایی سفارش" to go to final order page

2. **Cart Page** (`/cart/:category`):
   - View items for the selected category
   - Use `+` and `-` buttons to adjust quantities
   - Click "افزودن به سبد خرید" to save selections
   - Navigate back to home or continue shopping

3. **Submit Page** (`/submit`):
   - Review all selected items from different categories
   - Enter table number
   - Click "ثبت نهایی" to complete the order

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/items?item_type=drink` - Get drinks
- `GET /api/items?item_type=main_dish` - Get main dishes  
- `GET /api/items?item_type=dessert` - Get desserts
- `POST /api/orders` - Submit order
- `GET /api/orders` - Get all orders

## Testing the API

```bash
# Test health
curl http://localhost:5000/api/health

# Test drinks
curl "http://localhost:5000/api/items?item_type=drink"

# Test main dishes
curl "http://localhost:5000/api/items?item_type=main_dish"

# Test desserts
curl "http://localhost:5000/api/items?item_type=dessert"
```

## Database

The application uses SQLite database (`backend/cafe_menu.db`) with:

- **menu_items** table: Contains menu items with categories
- **orders** table: Stores customer orders with table numbers

Sample data is automatically created on first run.

## Project Structure

```
├── src/app/
│   ├── home/          # Home page component
│   ├── cart/          # Cart/category page component  
│   ├── submit/        # Final order submission
│   └── services/      # Angular services
├── backend/
│   ├── server.js      # Express server
│   └── cafe_menu.db   # SQLite database
└── package.json       # Dependencies and scripts
```

## Troubleshooting

### Items not showing when clicking categories?

1. **Check if backend is running**:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Check if Angular is running**:
   ```bash
   curl http://localhost:4200
   ```

3. **Check browser console** for any JavaScript errors

4. **Check network tab** in browser dev tools for API calls

### Database issues?

Delete `backend/cafe_menu.db` and restart the backend server to recreate with fresh data.

### Port conflicts?

- Backend runs on port 5000
- Frontend runs on port 4200  
- Make sure these ports are available

## Development

- Frontend: Angular 18 with standalone components
- Backend: Node.js with Express
- Database: SQLite3
- API: RESTful with JSON responses

Enjoy your cafe ordering system! 🍽️

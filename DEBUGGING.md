# 🔍 Debugging Your Cafe Menu Components

## The Problem
Your Angular components are not showing items when you click on categories because there's likely an issue with the API connection to your Python backend.

## How to Debug

### Step 1: Check Your Python Backend
1. **Make sure your Python backend is running**
   - Start your Docker containers with PostgreSQL and your Python API
   - Your backend should be accessible (common ports: 8000 for Django, 5000 for Flask)

2. **Test your backend directly**
   ```bash
   # Test if your backend is running (change port if needed)
   curl http://localhost:5000/api/health
   # or
   curl http://localhost:8000/api/health
   
   # Test your items endpoint
   curl "http://localhost:5000/api/items/?item_type=drink"
   ```

### Step 2: Update Angular API Configuration
1. **Check your backend port** in `src/app/services/api.service.ts`
   ```typescript
   // Change this line to match your Python backend port
   private baseUrl = 'http://localhost:5000/api';  // Flask usually uses 5000
   // or
   private baseUrl = 'http://localhost:8000/api';  // Django usually uses 8000
   ```

### Step 3: Test in Browser
1. **Start your Angular app**:
   ```bash
   npm start
   ```

2. **Open browser and go to**: http://localhost:4200

3. **Open Developer Tools** (F12) and go to **Console** tab

4. **Click on any category** (نوشیدنی‌ها, غذای اصلی, دسر)

5. **Check the console messages**:
   - You should see debug messages starting with 🔍, 🌐, ✅, or ❌
   - You should see the API URL being called
   - Check for any error messages

6. **Click the "Test API Connection" button** on the cart page
   - This will test if your backend is reachable

### Step 4: Check Network Tab
1. **In Developer Tools, go to Network tab**
2. **Click on a category**
3. **Look for the API call** (should be something like `items/?item_type=drink`)
4. **Check the response**:
   - **Status 200**: Good! Check if data is returned
   - **Status 404**: Your endpoint URL is wrong
   - **Status 500**: Your backend has an error
   - **CORS error**: Your backend doesn't allow requests from localhost:4200
   - **Connection refused**: Your backend is not running

## Common Issues & Solutions

### Issue 1: Wrong Port
**Symptoms**: Connection refused, 404 errors
**Solution**: Update the port in `api.service.ts`
```typescript
// Try different ports:
private baseUrl = 'http://localhost:8000/api';  // Django
private baseUrl = 'http://localhost:5000/api';  // Flask
private baseUrl = 'http://localhost:3000/api';  // Express
```

### Issue 2: Wrong Endpoint Structure
**Symptoms**: 404 errors, but backend is running
**Solution**: Check your Python backend endpoints. Maybe it uses:
```typescript
// Instead of: /api/items/?item_type=drink
// Try: /api/items/drink/
// or: /items?category=drink
// or: /menu/items/?type=drink
```

### Issue 3: CORS Issues
**Symptoms**: CORS errors in console
**Solution**: Add CORS headers to your Python backend:
```python
# For Flask
from flask_cors import CORS
CORS(app)

# For Django
# Add 'corsheaders' to INSTALLED_APPS and middleware
```

### Issue 4: Data Format Mismatch
**Symptoms**: API returns data but components don't show items
**Solution**: Check if your Python backend returns data in the expected format:
```json
[
  {
    "id": 1,
    "name": "قهوه اسپرسو",
    "price": 15000,
    "item_type": "drink"
  }
]
```

## What I Fixed in Your Components

1. **Added debugging logs** to see what's happening
2. **Added error handling** to catch and display API errors
3. **Added a test button** to manually test API connection
4. **Added loading states** to show when items are being fetched
5. **Made the API URL configurable** for easy changes

## Next Steps

1. **Start your Python backend first**
2. **Update the API URL** in `api.service.ts` if needed
3. **Start Angular** with `npm start`
4. **Open browser console** and click on categories
5. **Use the debug information** to identify the exact issue

The debug information will tell you exactly what's wrong! 🎯
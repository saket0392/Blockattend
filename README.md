# BlockAttend

Role-based attendance system with:
- Student dashboard
- Faculty dashboard + QR session creation
- Admin analytics dashboard

All dashboard data is served from backend APIs (no hardcoded/static cards).

## Tech
- Frontend: React + Vite
- Backend: Express + MongoDB (Mongoose)

## Environment

### Backend (`server/.env`)
```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/blockattend
JWT_SECRET=your_jwt_secret
```

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8000
```

## Run locally

```bash
# terminal 1 (backend)
cd server
npm install
node Server.js

# terminal 2 (frontend)
cd ..
npm install
npm run dev
```

## Production / Deploy notes
- Set `VITE_API_BASE_URL` to your deployed backend URL.
- Set `PORT`, `MONGO_URI`, and `JWT_SECRET` in backend environment.
- CORS is enabled in backend; tighten origin allowlist for production.
- Build frontend with:
```bash
npm run build
```

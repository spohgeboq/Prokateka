import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "Prokateka Rental Platform Backend API",
    time: new Date().toISOString(),
  });
});

// 2. Mock Equipment API (ready to connect to PostgreSQL)
app.get("/api/equipment", (req: Request, res: Response) => {
  const { tier, branch, search } = req.query;
  res.json({
    message: "Equipment list endpoint ready for PostgreSQL query",
    filters: { tier, branch, search },
  });
});

// 3. Booking creation & WhatsApp notify webhook endpoint
app.post("/api/bookings", (req: Request, res: Response) => {
  const {
    equipmentId,
    customerName,
    customerPhone,
    days,
    deliveryType,
    deliveryAddress,
    totalPrice,
    deposit,
    withOperator,
  } = req.body;

  if (!equipmentId || !customerPhone || !days) {
    return res.status(400).json({
      error: "Missing required fields: equipmentId, customerPhone, days are mandatory",
    });
  }

  // Generate confirmation payload
  const bookingRecord = {
    id: Math.floor(1000 + Math.random() * 9000),
    equipmentId,
    customerName,
    customerPhone,
    days,
    deliveryType,
    deliveryAddress,
    totalPrice,
    deposit,
    withOperator,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return res.status(201).json({
    success: true,
    message: "Booking registered. Ready for WhatsApp notification dispatch.",
    booking: bookingRecord,
  });
});

// 4. Server-side WhatsApp notification forwarder (Green API / Chat-API gateway)
app.post("/api/whatsapp/notify", (req: Request, res: Response) => {
  const { bookingId, managerPhone } = req.body;
  res.json({
    success: true,
    message: `WhatsApp notification queued for manager at ${managerPhone || "default"}`,
    bookingId,
  });
});

app.listen(PORT, () => {
  console.log(`[Prokateka Backend API] running on http://localhost:${PORT}`);
});

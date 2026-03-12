const { Router } = require("express");
const authRoutes = require("./auth.routes");
const zoneRoutes = require("./zone.routes");
const deviceRoutes = require("./device.routes");
const eventRoutes = require("./event.routes");
const { requireAuth } = require("../middlewares/auth.middleware");
const { getFirebaseStatus } = require("../config/firebase");

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    firebase: getFirebaseStatus(),
  });
});

router.use("/api/auth", authRoutes);
router.use("/api/zones", requireAuth, zoneRoutes);
router.use("/api/devices", requireAuth, deviceRoutes);
router.use("/api/events", requireAuth, eventRoutes);

module.exports = router;

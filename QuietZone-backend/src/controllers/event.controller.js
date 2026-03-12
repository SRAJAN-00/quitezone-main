const mongoose = require("mongoose");
const GeofenceEvent = require("../models/GeofenceEvent");
const Zone = require("../models/Zone");
const HttpError = require("../utils/httpError");
const { requireEnum } = require("../utils/validation");
const { sendTransitionPush } = require("../services/push.service");

async function createTransitionEvent(req, res, next) {
  try {
    const transition = requireEnum(req.body.transition, "transition", ["enter", "exit"]);
    const modeApplied = req.body.modeApplied || "unknown";
    const previousMode = req.body.previousMode || "unknown";
    const metadata = req.body.metadata || {};
    const triggeredAt = req.body.triggeredAt ? new Date(req.body.triggeredAt) : new Date();

    let zoneId = null;
    let zoneName = "";

    if (req.body.zoneId) {
      if (!mongoose.Types.ObjectId.isValid(req.body.zoneId)) {
        throw new HttpError(400, "Invalid zoneId");
      }
      const zone = await Zone.findOne({ _id: req.body.zoneId, ownerId: req.auth.userId });
      if (!zone) {
        throw new HttpError(404, "Zone not found");
      }
      zoneId = zone._id;
      zoneName = zone.name;
    } else if (req.body.zoneName) {
      zoneName = String(req.body.zoneName);
    }

    const event = await GeofenceEvent.create({
      userId: req.auth.userId,
      zoneId,
      zoneName,
      transition,
      modeApplied,
      previousMode,
      metadata,
      triggeredAt,
    });

    const pushResult = await sendTransitionPush({
      userId: req.auth.userId,
      transition,
      zoneName,
      modeApplied,
    });

    res.status(201).json({
      event: {
        id: event._id.toString(),
        transition: event.transition,
        zoneId: event.zoneId ? event.zoneId.toString() : null,
        zoneName: event.zoneName,
        modeApplied: event.modeApplied,
        previousMode: event.previousMode,
        triggeredAt: event.triggeredAt,
        createdAt: event.createdAt,
      },
      push: pushResult,
    });
  } catch (error) {
    next(error);
  }
}

async function listEvents(req, res, next) {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const events = await GeofenceEvent.find({ userId: req.auth.userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    res.json({
      events: events.map((event) => ({
        id: event._id.toString(),
        transition: event.transition,
        zoneId: event.zoneId ? event.zoneId.toString() : null,
        zoneName: event.zoneName,
        modeApplied: event.modeApplied,
        previousMode: event.previousMode,
        triggeredAt: event.triggeredAt,
        createdAt: event.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTransitionEvent,
  listEvents,
};

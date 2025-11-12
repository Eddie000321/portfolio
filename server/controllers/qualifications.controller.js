import Qualification from "../models/qualification.model.js";
import dbErrorHandler from "../helpers/dbErrorHandler.js";

const normalizeQualificationPayload = (payload = {}) => {
  const normalized = { ...payload };
  if ("highlights" in normalized) {
    if (Array.isArray(normalized.highlights)) {
      normalized.highlights = normalized.highlights
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (typeof normalized.highlights === "string") {
      normalized.highlights = normalized.highlights
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      normalized.highlights = [];
    }
  }
  return normalized;
};

const getNextOrder = async () => {
  const lastQualification = await Qualification.findOne()
    .sort({ order: -1 })
    .lean();
  return typeof lastQualification?.order === "number"
    ? lastQualification.order + 1
    : 0;
};

const create = async (req, res) => {
  try {
    const payload = normalizeQualificationPayload(req.body);
    if (typeof payload.order !== "number") {
      payload.order = await getNextOrder();
    }
    const qualification = await Qualification.create(payload);
    res.status(201).json(qualification);
  } catch (err) {
    res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

const getAll = async (_req, res) => {
  try {
    const qualifications = await Qualification.find().sort({
      order: 1,
      createdAt: -1,
    });
    res.json(qualifications);
  } catch (_err) {
    res.status(500).json({ error: "Failed to fetch qualifications" });
  }
};

const getById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.json(qualification);
  } catch (_err) {
    res.status(400).json({ error: "Invalid qualification id" });
  }
};

const updateById = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      normalizeQualificationPayload(req.body),
      { new: true, runValidators: true }
    );
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.json(qualification);
  } catch (err) {
    res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

const deleteById = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.json({ message: "Qualification deleted" });
  } catch (_err) {
    res.status(400).json({ error: "Invalid qualification id" });
  }
};

const deleteAll = async (_req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: "All qualifications deleted" });
  } catch (_err) {
    res.status(500).json({ error: "Failed to delete qualifications" });
  }
};

const reorder = async (req, res) => {
  const { order } = req.body;
  if (!Array.isArray(order) || order.length === 0) {
    return res.status(400).json({ error: "Order payload is required" });
  }
  try {
    const bulkOps = order.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));
    await Qualification.bulkWrite(bulkOps);
    const qualifications = await Qualification.find().sort({
      order: 1,
      createdAt: -1,
    });
    res.json(qualifications);
  } catch (_err) {
    res.status(400).json({ error: "Failed to reorder qualifications" });
  }
};

export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  deleteAll,
  reorder,
};

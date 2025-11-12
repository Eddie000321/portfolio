import Project from "../models/project.model.js";
import dbErrorHandler from "../helpers/dbErrorHandler.js";

const normalizeProjectPayload = (payload = {}) => {
  const normalized = { ...payload };
  const normalizeArrayField = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => item.trim()).filter(Boolean);
    }
    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  };

  if ("technologies" in normalized) {
    normalized.technologies = normalizeArrayField(normalized.technologies);
  }
  if ("highlights" in normalized) {
    normalized.highlights = normalizeArrayField(normalized.highlights);
  }

  return normalized;
};

const getNextOrder = async () => {
  const lastProject = await Project.findOne().sort({ order: -1 }).lean();
  return typeof lastProject?.order === "number" ? lastProject.order + 1 : 0;
};

const create = async (req, res) => {
  try {
    const payload = normalizeProjectPayload(req.body);
    if (typeof payload.order !== "number") {
      payload.order = await getNextOrder();
    }
    const project = await Project.create(payload);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

const getAll = async (_req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (_err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

const getById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (_err) {
    res.status(400).json({ error: "Invalid project id" });
  }
};

const updateById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      normalizeProjectPayload(req.body),
      {
        new: true,
        runValidators: true,
      }
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

const deleteById = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (_err) {
    res.status(400).json({ error: "Invalid project id" });
  }
};

const deleteAll = async (_req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All projects deleted" });
  } catch (_err) {
    res.status(500).json({ error: "Failed to delete projects" });
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
    await Project.bulkWrite(bulkOps);
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (_err) {
    res.status(400).json({ error: "Failed to reorder projects" });
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

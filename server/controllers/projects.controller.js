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

const create = async (req, res) => {
  try {
    const project = await Project.create(normalizeProjectPayload(req.body));
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

const getAll = async (_req, res) => {
  try {
    const projects = await Project.find();
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

export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  deleteAll,
};

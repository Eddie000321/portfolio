import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";
import githubRoutes from "./routes/github.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import qualificationsRoutes from "./routes/qualifications.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/api/contacts", contactsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/qualifications", qualificationsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/github", githubRoutes);

export default app;

import User from "../models/user.model.js";

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@portfolio.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";
  const adminName = process.env.ADMIN_NAME || "Portfolio Admin";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    if (existingAdmin.role !== "admin") {
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.info(`Elevated ${adminEmail} to admin role`);
    }
    return;
  }

  const adminUser = new User({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: "admin",
  });
  await adminUser.save();
  console.info(
    `Seeded default admin user (${adminEmail}). Update the password via environment variables before production use.`
  );
};

export default seedAdmin;

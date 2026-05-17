import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://harshit:Harshit%40123@userinfo.lmbsytd.mongodb.net/jayshree_blogs";

async function seedAdmin() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection("users");

    // Check if admin exists
    const existingAdmin = await users.findOne({ email: "admin@jayshree.com" });
    if (existingAdmin) {
      console.log("✅ Admin user already exists.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Create admin user
    const result = await users.insertOne({
      email: "admin@jayshree.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@jayshree.com");
    console.log("Password: Admin@123");
    console.log("ID:", result.insertedId);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    await client.close();
  }
}

seedAdmin();

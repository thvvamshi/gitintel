require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");
const initializeDatabase = require("./config/initDb");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const connection = await pool.getConnection();

    console.log("✅ Database connected");

    connection.release();

    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

startServer();
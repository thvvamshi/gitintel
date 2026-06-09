const pool = require("./db");

const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,

        github_id BIGINT NOT NULL UNIQUE,

        username VARCHAR(255) NOT NULL UNIQUE,

        name VARCHAR(255),

        bio TEXT,

        company VARCHAR(255),

        location VARCHAR(255),

        blog VARCHAR(500),

        avatar_url VARCHAR(500),

        profile_url VARCHAR(500),

        followers INT DEFAULT 0,

        following INT DEFAULT 0,

        public_repos INT DEFAULT 0,

        public_gists INT DEFAULT 0,

        total_stars INT DEFAULT 0,

        top_language VARCHAR(100),

        most_starred_repo VARCHAR(255),

        account_created_at DATETIME,

        account_age_years INT,

        followers_repo_ratio DECIMAL(10,2),

        analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Migration for existing tables
    try {
      await pool.query(`
        ALTER TABLE profiles
        ADD COLUMN total_stars INT DEFAULT 0
      `);
    } catch (error) {}

    try {
      await pool.query(`
        ALTER TABLE profiles
        ADD COLUMN top_language VARCHAR(100)
      `);
    } catch (error) {}

    try {
      await pool.query(`
        ALTER TABLE profiles
        ADD COLUMN most_starred_repo VARCHAR(255)
      `);
    } catch (error) {}

    console.log("✅ Profiles table ready");
  } catch (error) {
    console.error("❌ Database initialization failed");
    throw error;
  }
};

module.exports = initializeDatabase;
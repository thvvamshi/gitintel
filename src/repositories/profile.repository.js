const pool = require("../config/db");

const createProfile = async (profile) => {
  const query = `
    INSERT INTO profiles (
      github_id,
      username,
      name,
      bio,
      company,
      location,
      blog,
      avatar_url,
      profile_url,
      followers,
      following,
      public_repos,
      public_gists,
      account_created_at,
      account_age_years,
      followers_repo_ratio
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    profile.githubId,
    profile.username,
    profile.name,
    profile.bio,
    profile.company,
    profile.location,
    profile.blog,
    profile.avatarUrl,
    profile.profileUrl,
    profile.followers,
    profile.following,
    profile.publicRepos,
    profile.publicGists,
    profile.accountCreatedAt,
    profile.accountAgeYears,
    profile.followersRepoRatio,
  ];

  const [result] = await pool.query(query, values);

  return result;
};

const getAllProfiles = async () => {
  const [rows] = await pool.query(`
    SELECT *
    FROM profiles
    ORDER BY analyzed_at DESC
  `);

  return rows;
};

const getProfileByUsername = async (username) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM profiles
    WHERE username = ?
    `,
    [username],
  );

  return rows[0];
};


const findByUsername = async (username) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM profiles
    WHERE username = ?
    `,
    [username]
  );

  return rows[0];
};


module.exports = {
  createProfile,
  getAllProfiles,
  getProfileByUsername,
  findByUsername,
};
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

module.exports = {
  createProfile,
};
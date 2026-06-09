const { getGithubProfile } = require("../services/github.service");
const calculateInsights = require("../utils/calculateInsights");
const { createProfile } = require("../repositories/profile.repository");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const githubProfile = await getGithubProfile(username);

    const insights = calculateInsights(githubProfile);

    await createProfile({
      githubId: githubProfile.id,
      username: githubProfile.login,
      name: githubProfile.name,
      bio: githubProfile.bio,
      company: githubProfile.company,
      location: githubProfile.location,
      blog: githubProfile.blog,
      avatarUrl: githubProfile.avatar_url,
      profileUrl: githubProfile.html_url,
      followers: githubProfile.followers,
      following: githubProfile.following,
      publicRepos: githubProfile.public_repos,
      publicGists: githubProfile.public_gists,
      accountCreatedAt: new Date(githubProfile.created_at)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      ...insights,
    });

    return res.status(201).json({
      success: true,
      message: "Profile analyzed successfully",
      data: {
        username: githubProfile.login,
        followers: githubProfile.followers,
        publicRepos: githubProfile.public_repos,
        ...insights,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeProfile,
};

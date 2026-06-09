const { getGithubProfile } = require("../services/github.service");
const calculateInsights = require("../utils/calculateInsights");

const {
  createProfile,
  getAllProfiles,
  getProfileByUsername,
  findByUsername,
} = require("../repositories/profile.repository");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    // Check if already analyzed
    const existingProfile = await findByUsername(username);

    if (existingProfile) {
      return res.status(200).json({
        success: true,
        message: "Profile already analyzed",
        data: existingProfile,
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
    // GitHub user not found
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfiles();

    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await getProfileByUsername(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
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
  getProfiles,
  getProfile,
};
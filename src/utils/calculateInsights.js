const calculateInsights = (profile) => {
  const accountAgeYears =
    new Date().getFullYear() -
    new Date(profile.created_at).getFullYear();

  const followersRepoRatio =
    profile.public_repos > 0
      ? Number(
          (profile.followers / profile.public_repos).toFixed(2)
        )
      : 0;

  return {
    accountAgeYears,
    followersRepoRatio,
  };
};

module.exports = calculateInsights;
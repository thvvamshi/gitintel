const repositoryInsights = (repos) => {
  let totalStars = 0;

  let maxStars = 0;

  let mostStarredRepo = null;

  const languageCount = {};

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;

    if (repo.stargazers_count > maxStars) {
      maxStars = repo.stargazers_count;
      mostStarredRepo = repo.name;
    }

    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
  });

  const topLanguage =
    Object.keys(languageCount).length
      ? Object.keys(languageCount).reduce((a, b) =>
          languageCount[a] > languageCount[b]
            ? a
            : b
        )
      : null;

  return {
    totalStars,
    topLanguage,
    mostStarredRepo,
  };
};

module.exports = repositoryInsights;
function match(a, b) {
  const ret = {};
  Object.keys(a).forEach(key => {
    const diff = Math.abs(a[key] - b[key]);
    ret[key] = 1 - diff;
  });
  return ret;
}

function score(m) {
  return (
    m.Openness * 0.1 +
    m.Conscientiousness * 0.1 +
    m.Extraversion * 0.4 +
    m.Agreeableness * 0.2 +
    m.Neuroticism * 0.2
  );
}

module.exports = {
  match: match,
  score: score
};

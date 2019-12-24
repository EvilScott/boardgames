export const overlap = (a, b) =>
  ((a || []).filter(v => (b || []).includes(v)) || []).length;

export const overlap = (g, f) =>
  ((g || []).filter(v => (f || []).includes(v)) || []).length >= f.length;

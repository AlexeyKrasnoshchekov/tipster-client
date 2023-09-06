export const deleteOverData = async (date) => {
  const res = await fetch(`http://localhost:8000/over/delete`);
  const text = await res.text();
  return text;
};
export const loadOverData = async (date) => {
  const res = await fetch(`http://localhost:8000/over/load`);
  const text = await res.text();
  return text;
};
export const loadCrawlData = async (date) => {
  const res = await fetch(`http://localhost:8000/crawl/load`);
  const text = await res.text();
  return text;
};

export const deleteOverData = async (date) => {
  const res = await fetch(`https://tipster-server.vercel.app/over/delete`);
  const text = await res.text();
  return text;
};
export const loadOverData = async (date) => {
  const res = await fetch(`https://tipster-server.vercel.app/over/load`);
  const text = await res.text();
  return text;
};
export const loadCrawlData = async (date) => {
  const res = await fetch(`https://tipster-server.vercel.app/crawl/load`);
  const text = await res.text();
  return text;
};

export const deleteOverData = async (date) => {
  const res = await fetch(`https://tipster-server.vercel.app/over/delete/?date=${date}`);
//   const res = await fetch(`http://localhost:8000/over/delete/?date=${date}`);
  const text = await res.text();
  return text;
};
export const loadOverData = async () => {
  const res = await fetch(`https://tipster-server.vercel.app/over/load`);
//   const res = await fetch(`http://localhost:8000/over/load`);
  const text = await res.text();
  return text;
};
export const loadCrawlData = async () => {
  const res = await fetch(`https://tipster-server.vercel.app/crawl/load`);
//   const res = await fetch(`http://localhost:8000/crawl/load`);
  const text = await res.text();
  return text;
};

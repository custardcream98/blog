/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://custardcream.vercel.app/",
  generateRobotsTxt: true,
  priority: 1.0,
  generateIndexSitemap: false,
};

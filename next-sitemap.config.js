/** @type {import('next-sitemap').IConfig} */
module.exports = {
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  priority: 1.0,
  siteUrl: process.env.NEXT_PUBLIC_HOST,
};

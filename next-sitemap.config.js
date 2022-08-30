/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://" + process.env.NEXT_PUBLIC_HOST,
  generateRobotsTxt: true,
  priority: 1.0,
  generateIndexSitemap: false,
};

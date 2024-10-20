/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yoursaas.com',
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://yoursaas.com/server-sitemap.xml', // <==== Add here
    ],
  },
}

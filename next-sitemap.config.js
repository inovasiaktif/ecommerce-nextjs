/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://inovasiaktif.com',
    generateRobotsTxt: true,
    exclude: ['/cart', '/checkout', '/thank-you']
}
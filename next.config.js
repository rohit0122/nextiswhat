/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_SECRET: 'asfsafasdfaslak3o4uwasfnaoi34uw8eryhasdfjq209tyw8h'
  },
  publicRuntimeConfig: {
    API_BASE_PATH: process.env.API_BASE_PATH
  }
}

module.exports = nextConfig

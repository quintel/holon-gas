/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode breaks react-joyride. We enable it on a case-by-case basis.
  reactStrictMode: false,
  experimental: { esmExternals: false },
};

module.exports = nextConfig;

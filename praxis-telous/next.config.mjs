/** @type {import('next').NextConfig} */

const repoName = 'Praxis-Telous';

// A flag to check if the application is being built for production.
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
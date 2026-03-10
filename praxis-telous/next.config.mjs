/** @type {import('next').NextConfig} */

// IMPORTANT: This value should be the name of your GitHub repository.
// For example, if your repository URL is https://github.com/your-name/praxis-telous,
// then the value should be 'praxis-telous'.
const repoName = 'praxis-telous';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Enable static export
  output: 'export',
  trailingSlash: true,

  // Configure paths for GitHub Pages
  basePath: isProd ? `/${repoName}` : '',

  // Image optimization is not compatible with static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
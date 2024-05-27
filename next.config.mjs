/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cloudflare-ipfs.com', 'example.com'],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp4)$/,
      type: 'asset/resource',
      generator: {
        filename: 'videos/[name].[hash][ext]',
      },
    });

    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:section(home|about|skills|projects|contacts)",
        destination: "/",
      },
      {
        source: "/projects/:slug*",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;

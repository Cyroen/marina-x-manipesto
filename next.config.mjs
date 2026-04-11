/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**')]
  }
};

export default nextConfig;

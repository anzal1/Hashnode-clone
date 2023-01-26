module.exports = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/:username",
      },
    ];
  },
};

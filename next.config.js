/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "www.gravatar.com"],
  },
  env: {
    TMDB_API_KEY: "023e7fa152989334a68b0ed2985b5fb8",
    MONGO_URI:
      "mongodb+srv://lk09:movieshub@cluster0.gdshp.mongodb.net/movieshub?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;

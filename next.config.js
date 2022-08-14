/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "www.gravatar.com"],
  },
  env: {
    TMDB_API_KEY: "api_key=023e7fa152989334a68b0ed2985b5fb8",
    MONGO_URL:
      "mongodb+srv://lk09:movieshub@cluster0.gdshp.mongodb.net/movieshub?retryWrites=true&w=majority",
    JWT_SECRET_KEY: "this-is-my-very-secure-secret-key",
  },
};

module.exports = nextConfig;

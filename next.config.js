const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  images: {
    domains: [
      "image.tmdb.org",
      "platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
      "thumbs.dreamstime.com",
      "media.wired.com",
      "images.unsplash.com",
      "cdn.vox-cdn.com",
      "a0.muscache.com",
      "www.s1s1s1.com",
      "www.ideapocket.com",
      "www.madonna-av.com",
      "www.attackers.net",
      "www.moodyz.com",
      "www.tameikegoro.jp",
      "image.up-timely.com",
      "www.premium-beauty.com",
      "www.kawaiikawaii.jp",
    ],
  },
});

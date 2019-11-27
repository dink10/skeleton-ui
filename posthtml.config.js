module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
      }
    }
  }
}

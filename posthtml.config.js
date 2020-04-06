module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        GOOGLE_LOGIN_CLIENT_ID: process.env.GOOGLE_LOGIN_CLIENT_ID
      }
    }
  }
}

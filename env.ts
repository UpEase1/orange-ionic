//! Remove this on production or change it to use .env with nodeenv or vercel's own ENV system
const env = {
  API_URL: "http://localhost:8000/api",
  API_VERSION: "v1",
  NODE_ENV: "development",
}

export default env;
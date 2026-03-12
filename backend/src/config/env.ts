import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile, override: true });
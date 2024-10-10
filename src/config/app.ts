import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  name: process.env["APP_NAME"],
  mode:process.env["APP_MODE"],
  key:process.env["APP_KEY"]
}))

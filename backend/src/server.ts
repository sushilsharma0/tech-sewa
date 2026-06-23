import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

async function bootstrap() {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log(`TechSewa API running on ${env.API_URL}`);
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});

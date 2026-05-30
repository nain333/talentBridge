import app from "./src/app.js";
import { configDotenv } from "dotenv";
configDotenv();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(process.env.PORT)
});
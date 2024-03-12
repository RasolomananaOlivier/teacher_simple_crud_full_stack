import { connectDB } from "../database";
import { professorSeeder } from "./professorSeeder";

async function executeSeeders() {
  try {
    await connectDB();

    await professorSeeder(25);
  } catch (error) {
    console.log(error);
  }
}

executeSeeders().then(() => {
  process.exit();
});

import { faker } from "@faker-js/faker";
import ProfessorModel, { IProfessor } from "../models/professor";

export async function professorSeeder(count: number) {
  console.log("Seeding users");

  const professors: IProfessor[] = [];
  for (let i = 0; i < count; i++) {
    const professorCount = await ProfessorModel.countDocuments();
    professors.push({
      code: `en_${professorCount + i + 1}`,
      name: faker.person.fullName(),
      hourlyRate: faker.number.int({ min: 2500, max: 7500 }),
      hours: faker.number.int({ min: 160, max: 200 }),
    });
  }

  await ProfessorModel.deleteMany({});

  await ProfessorModel.create(professors);

  console.log("Users seeded");
}

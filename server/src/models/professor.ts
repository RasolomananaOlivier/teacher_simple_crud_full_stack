import mongoose, { Schema, Document } from "mongoose";

// Define the Professor interface
export interface IProfessor {
  code: string;
  name: string;
  hourlyRate: number;
  hours: number;
  createdAt?: Date;
}

// Define the Professor schema
const ProfessorSchema: Schema = new Schema<IProfessor>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  hours: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Professor model
const ProfessorModel = mongoose.model<IProfessor>("Professor", ProfessorSchema);

export default ProfessorModel;

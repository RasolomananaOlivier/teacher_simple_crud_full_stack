import { Request, Response, Router } from "express";
import { z } from "zod";
import ProfessorModel from "../models/professor";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  try {
    const query = req.query;

    const limit = (query.limit as unknown as number) ?? 15;
    const page = (query.page as unknown as number) ?? 1;
    const name = (query.name as string) ?? "";

    const docQuery = {
      name: {
        $regex: name,
        $options: "i",
      },
    };

    const professors = await ProfessorModel.find(docQuery)
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 })
      .exec();

    const count = await ProfessorModel.find(docQuery).countDocuments();

    return res.status(200).json({
      message: "Successfully retrieved professors",
      data: professors,
      meta: {
        limit,
        page,
        total: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
});

const professorSchema = z.object({
  name: z.string(),
  hourlyRate: z.number().int().min(2500).max(7500),
  hours: z.number().int().min(0),
});

router.post("", async (req, res) => {
  try {
    const result = professorSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid data",
        error: result.error,
      });
    }

    const newProfessor = await ProfessorModel.create({
      ...result.data,
      code: `prof_${(await ProfessorModel.countDocuments()) + 1}`,
    });

    return res.status(201).json({
      message: "Professor created",
      data: newProfessor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const professor = await ProfessorModel.findById(id);

    return res.status(200).json({
      message: "Professor retrieved",
      data: professor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
});

const updateProfessorSchema = z.object({
  name: z.string().optional(),
  hourlyRate: z.number().int().min(2500).max(7500).optional(),
  hours: z.number().int().min(160).max(200).optional(),
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const professor = updateProfessorSchema.parse(req.body);

    const updatedProfessor = await ProfessorModel.findByIdAndUpdate(
      id,
      professor,
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Professor updated",
      data: updatedProfessor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await ProfessorModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Professor deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
});

export default router;

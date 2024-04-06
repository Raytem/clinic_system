import { z } from "zod";

export const createRecipeSchema = z.object({
    drugName: z.string().min(1, 'Required'),
    instructionForUsage: z.string().min(1, 'Required'),
})
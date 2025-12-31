import z from 'zod'

export const productSchema = z.object({
  sku: z.string().min(3).max(50),
  name: z.string().min(3).max(100),
  cost: z.number().positive(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  brandId: z.number(),
  description: z.string().optional(),

  barcode: z
    .string()
    .max(50)
    .transform((val) => (val === '' ? undefined : val))
    .optional()
    .refine((val) => val === undefined || /^[0-9]{8,14}$/.test(val), {
      message: 'El código debe tener entre 8 y 14 dígitos',
    }),

  categoryIds: z.array(z.number().int()).optional(),
  properties: z.record(z.string(), z.string()).optional(),
})

export type ProductFormData = z.infer<typeof productSchema>

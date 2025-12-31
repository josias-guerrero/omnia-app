import { apiFetch } from "@/lib/http";
import { Category } from "./types.categories";

export const CategoryApi = {
  findAll: () => apiFetch<Category[]>({endpoint: '/api/v1/categories'})
}

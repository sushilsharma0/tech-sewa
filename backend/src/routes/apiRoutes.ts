import { Router } from "express";
import {
  compare,
  createController,
  dashboardStats,
  deleteController,
  detailController,
  listController,
  priceHistory,
  priceUpdate,
  search,
  updateController
} from "../controllers/resourceControllers.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { cache } from "../middleware/cache.js";

export const apiRoutes = Router();

apiRoutes.get("/news", cache(60), listController("news", { status: "published" }));
apiRoutes.get("/news/:slug", cache(120), detailController("news"));
apiRoutes.get("/reviews", cache(60), listController("reviews", { status: "published" }));
apiRoutes.get("/reviews/:slug", cache(120), detailController("reviews"));
apiRoutes.get("/products", cache(60), listController("products", { status: "published" }));
apiRoutes.get("/products/:slug", cache(120), detailController("products"));
apiRoutes.get("/brands", cache(300), listController("brands"));
apiRoutes.get("/brands/:slug", cache(300), detailController("brands"));
apiRoutes.get("/search", search);
apiRoutes.get("/compare", compare);
apiRoutes.get("/products/:productId/price-history", cache(120), priceHistory);

apiRoutes.use("/admin", requireAuth, requireRole("admin", "editor"));
apiRoutes.get("/admin/stats", dashboardStats);

for (const resource of ["news", "reviews", "products", "brands", "advertisements", "media", "settings", "comments", "users"] as const) {
  apiRoutes.get(`/admin/${resource}`, listController(resource));
  apiRoutes.post(`/admin/${resource}`, createController(resource));
  apiRoutes.patch(`/admin/${resource}/:id`, updateController(resource));
  apiRoutes.delete(`/admin/${resource}/:id`, deleteController(resource));
}

apiRoutes.post("/admin/products/:productId/price", priceUpdate);

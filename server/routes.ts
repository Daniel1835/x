import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMcSchema, insertReviewSchema, insertPhotographerSchema, insertDecoratorSchema, insertSanggarSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import fs from "fs";
import path from "path";
import { randomUUID, createHash } from "crypto";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Irwansyah12@";
const SECRET_KEY = "bulukumba-admin-secret-2024";

function generateToken(username: string): string {
  const timestamp = Date.now().toString();
  const data = `${username}:${timestamp}:${SECRET_KEY}`;
  const hash = createHash("sha256").update(data).digest("hex");
  const token = Buffer.from(`${username}:${timestamp}:${hash}`).toString("base64");
  return token;
}

function validateToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, timestamp, hash] = decoded.split(":");
    
    if (!username || !timestamp || !hash) return false;
    
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000;
    if (tokenAge > maxAge) return false;
    
    const expectedData = `${username}:${timestamp}:${SECRET_KEY}`;
    const expectedHash = createHash("sha256").update(expectedData).digest("hex");
    
    return hash === expectedHash && username === ADMIN_USERNAME;
  } catch {
    return false;
  }
}

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const token = authHeader.slice(7);
  if (!validateToken(token)) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
  
  next();
}

const photoMap: Record<string, string> = {
  "/api/placeholder/mc1": "professional_indones_c3e423b3.jpg",
  "/api/placeholder/mc2": "professional_indones_95410a03.jpg",
  "/api/placeholder/mc3": "professional_indones_d97190f1.jpg",
  "/api/placeholder/mc4": "professional_indones_f9b04a6a.jpg",
  "/api/placeholder/mc5": "professional_indones_4914f3f8.jpg",
  "/api/placeholder/mc6": "professional_indones_2e1a324e.jpg",
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/placeholder/:id", (req, res) => {
    const placeholderKey = `/api/placeholder/${req.params.id}`;
    const fileName = photoMap[placeholderKey];
    
    if (fileName) {
      const filePath = path.join(process.cwd(), "attached_assets", "stock_images", fileName);
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
        return;
      }
    }
    
    res.redirect(`https://ui-avatars.com/api/?name=MC&background=0ea5e9&color=fff&size=256`);
  });

  app.get("/api/mcs", async (req, res) => {
    try {
      const mcs = await storage.getMCs();
      res.json(mcs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch MCs" });
    }
  });

  app.get("/api/mcs/:id", async (req, res) => {
    try {
      const mc = await storage.getMC(req.params.id);
      if (!mc) {
        res.status(404).json({ error: "MC not found" });
        return;
      }
      
      await storage.incrementMCViews(req.params.id);
      res.json(mc);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch MC" });
    }
  });

  app.post("/api/mcs", async (req, res) => {
    try {
      const result = insertMcSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        res.status(400).json({ error: validationError.toString() });
        return;
      }

      const mc = await storage.createMC(result.data);
      res.status(201).json(mc);
    } catch (error) {
      res.status(500).json({ error: "Failed to create MC" });
    }
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticle(req.params.id);
      if (!article) {
        res.status(404).json({ error: "Article not found" });
        return;
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.get("/api/reviews/:mcId", async (req, res) => {
    try {
      const reviews = await storage.getReviews(req.params.mcId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const result = insertReviewSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        res.status(400).json({ error: validationError.toString() });
        return;
      }

      const review = await storage.createReview(result.data);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  app.get("/api/photographers", async (req, res) => {
    try {
      const photographers = await storage.getPhotographers();
      res.json(photographers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch photographers" });
    }
  });

  app.get("/api/photographers/:id", async (req, res) => {
    try {
      const photographer = await storage.getPhotographer(req.params.id);
      if (!photographer) {
        res.status(404).json({ error: "Photographer not found" });
        return;
      }
      
      await storage.incrementPhotographerViews(req.params.id);
      res.json(photographer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch photographer" });
    }
  });

  app.post("/api/photographers", async (req, res) => {
    try {
      const result = insertPhotographerSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        res.status(400).json({ error: validationError.toString() });
        return;
      }

      const photographer = await storage.createPhotographer(result.data);
      res.status(201).json(photographer);
    } catch (error) {
      res.status(500).json({ error: "Failed to create photographer" });
    }
  });

  app.get("/api/decorators", async (req, res) => {
    try {
      const decorators = await storage.getDecorators();
      res.json(decorators);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch decorators" });
    }
  });

  app.get("/api/decorators/:id", async (req, res) => {
    try {
      const decorator = await storage.getDecorator(req.params.id);
      if (!decorator) {
        res.status(404).json({ error: "Decorator not found" });
        return;
      }
      
      await storage.incrementDecoratorViews(req.params.id);
      res.json(decorator);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch decorator" });
    }
  });

  app.post("/api/decorators", async (req, res) => {
    try {
      const result = insertDecoratorSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        res.status(400).json({ error: validationError.toString() });
        return;
      }

      const decorator = await storage.createDecorator(result.data);
      res.status(201).json(decorator);
    } catch (error) {
      res.status(500).json({ error: "Failed to create decorator" });
    }
  });

  app.get("/api/sanggars", async (req, res) => {
    try {
      const sanggars = await storage.getSanggars();
      res.json(sanggars);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sanggars" });
    }
  });

  app.get("/api/sanggars/:id", async (req, res) => {
    try {
      const sanggar = await storage.getSanggar(req.params.id);
      if (!sanggar) {
        res.status(404).json({ error: "Sanggar not found" });
        return;
      }
      
      await storage.incrementSanggarViews(req.params.id);
      res.json(sanggar);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sanggar" });
    }
  });

  app.post("/api/sanggars", async (req, res) => {
    try {
      const result = insertSanggarSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        res.status(400).json({ error: validationError.toString() });
        return;
      }

      const sanggar = await storage.createSanggar(result.data);
      res.status(201).json(sanggar);
    } catch (error) {
      res.status(500).json({ error: "Failed to create sanggar" });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = generateToken(username);
        res.json({ token, message: "Login berhasil" });
      } else {
        res.status(401).json({ error: "Username atau password salah" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login gagal" });
    }
  });

  app.get("/api/admin/mc", adminAuth, async (req, res) => {
    try {
      const mcs = await storage.getMCs();
      res.json(mcs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch MCs" });
    }
  });

  app.put("/api/admin/mc/:id", adminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const mc = await storage.getMC(id);
      
      if (!mc) {
        res.status(404).json({ error: "MC tidak ditemukan" });
        return;
      }

      const result = insertMcSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        res.status(400).json({ error: validationError.toString() });
        return;
      }

      const updatedMC = await storage.updateMC(id, result.data);
      res.json(updatedMC);
    } catch (error) {
      res.status(500).json({ error: "Gagal memperbarui MC" });
    }
  });

  app.delete("/api/admin/mc/:id", adminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const mc = await storage.getMC(id);
      
      if (!mc) {
        res.status(404).json({ error: "MC tidak ditemukan" });
        return;
      }

      const deleted = await storage.deleteMC(id);
      if (deleted) {
        res.json({ message: "MC berhasil dihapus" });
      } else {
        res.status(500).json({ error: "Gagal menghapus MC" });
      }
    } catch (error) {
      res.status(500).json({ error: "Gagal menghapus MC" });
    }
  });

  return httpServer;
}

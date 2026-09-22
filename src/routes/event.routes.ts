import { Router } from "express";
import { getEvent,createEvent} from "../controllers/event.controller.js"; 

const router=Router();

router.get("/:id",getEvent);
router.post("/", createEvent);


export default router
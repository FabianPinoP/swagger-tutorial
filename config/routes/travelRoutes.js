import express from "express";
import {
  getAllTravels,
  createTravels,
  updateTravels,
  deleteTravels,
  getTravelsLimit,
  getOrderAndLimitTravels,
  travelsWithPagination,
  filterTravels,
  getTravelsWithHateoas,
  getTravelById,
} from "../../src/api/v1/controllers/travelsController.js";
import { isLogin } from "../../middlewares/isLogin.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Travels
 *   description: API para la gestión de viajes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Travels:
 *       type: object
 *       required:
 *         - destino
 *         - presupuesto
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the users
 *         destino:
 *           type: string
 *           description: The travel's destination
 *         presupuesto:
 *           type: integer
 *           description: The travel's budget
 *         createdAt:
 *           type: string
 *           description: The date of the record's creation
 *         updatedAt:
 *           type: string
 *           description: The date of the record's last update
 *       example:
 *         destino: paris
 *         presupuesto: 1000
 */

/**
 * @swagger
 * /travels:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Obtener todos los viajes
 *     tags: [Travels]
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 travels:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Travels'
 *       '400':
 *         description: Error al obtener los viajes
 */

router.get("/travels", isLogin, getAllTravels);

/**
 * @swagger
 * /travels:
 *   post:
 *     summary: Crear un nuevo viaje
 *     tags: [Travels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                travel:
 *                  $ref: '#/components/schemas/Travels'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 travel:
 *                   $ref: '#/components/schemas/Travels'
 *       '400':
 *         description: Error al obtener los viajes
 */

router.post("/travels", createTravels);

/**
 * @swagger
 * /travels/{id}:
 *   put:
 *     summary: Actualizar un viaje
 *     tags: [Travels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The travel's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               travel:
 *                 $ref: '#/components/schemas/Travels'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 travel:
 *                   $ref: '#/components/schemas/Travels'
 *       '400':
 *         description: Error al obtener los viajes
 */

router.put("/travels/:id", updateTravels);

/**
 * @swagger
 * /travels/{id}:
 *   delete:
 *     summary: Eliminar un viaje
 *     tags: [Travels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The travel's id
 *     responses:
 *       '204':
 *         description: Success
 *       '400':
 *         description: Error al obtener los viajes
 */

router.delete("/travels/:id", deleteTravels);
router.get("/travels_with_limit", getTravelsLimit);
router.get("/travels_with_limit_and_order", getOrderAndLimitTravels);
router.get("/travels_with_pagination", travelsWithPagination);
router.get("/filter_travels", filterTravels);
router.get("/travels_with_hateoas", getTravelsWithHateoas);
router.get("/travels/:id", getTravelById);

export default router;

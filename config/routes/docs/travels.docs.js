/**
 * @swagger
 * tags:
 *   name: Travels
 *   description: end points para la gestión de viajes
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
 *         description: Error al crear un viaje
 */

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
 *         description: Error al actualizar el viaje
 */

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
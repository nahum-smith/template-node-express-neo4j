var Company = require("../models/company");
var dbUtils = require("../neo4j/dbUtils");
var uuidv1 = require("uuid/v1");
/**
 * @swagger
 * /api/v0/companies:
 *   post:
 *     tags:
 *     - company
 *     description: ''
 *     summary: Add a new company
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Company object that needs to be added to the system. ID will be replaced by system.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Company'
 *     security:
 *       - Bearer: []
 *       - api_key: []
 *     responses:
 *       200:
 *         description: Company created
 *       401:
 *         description: Unauthorized. Need JWT.
 *       409:
 *         description: Invalid payload
 */
exports.create = async function (req, res, next) {
  let currentDate = Date.now();
  req.body.id = uuidv1();
  req.body.createdDate = currentDate;
  req.body.updatedDate = currentDate;
  var db = dbUtils.getSession(req)
  var response = await Company.create(db, req.body)
    .then(response => response)
    .catch(next);

  res.send(response)
};
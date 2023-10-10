import Router from 'express';
import { CaseController } from '../controller/case-controller';
import {
  validateCreateNewCase,
  validateUpdateCase,
} from '../validators/case-validators';
import {
  validateCaseIdParam,
  validateClientIdParam,
  validateStaffIdParam,
} from '../validators/common-validators';

export const caseRouter = Router();

const controller = new CaseController();

/**
 * GET /api/case/client/:clientId - Gets all cases raised by a client of clientId.
 * @param clientId - The ID of the client.
 */
caseRouter.get('/client/:clientId', validateClientIdParam, (req, res) =>
  controller.getByClient(req, res)
);

/**
 * GET /api/case/staff/:staffId - Gets all cases handled by a staff member with staffId.
 * @param staffId - The ID of the staff member.
 */
caseRouter.get('/staff/:staffId', validateStaffIdParam, (req, res) =>
  controller.getByStaff(req, res)
);

/**
 * GET /api/case/completed - Gets all completed cases.
 */
caseRouter.get('/completed', (req, res) =>
  controller.getAllCompleted(req, res)
);

/**
 * GET /api/case/outstanding - Gets all outstanding cases.
 */
caseRouter.get('/outstanding', (req, res) =>
  controller.getAllOutstanding(req, res)
);

/**
 * POST /api/case - Creates a new case.
 * @body data - The data for the new case (request_message, status, client, staff, creation_date).
 */
caseRouter.post('/', validateCreateNewCase, (req, res) =>
  controller.createCase(req, res)
);

/**
 * PUT /api/case/:caseId - Updates the case with cid equals to caseId.
 * @param caseId - The ID of the case.
 * @body data - The new data for the case (request_message, status, client, staff, creation_date).
 */
caseRouter.put(
  '/:caseId',
  validateCaseIdParam,
  validateUpdateCase,
  (req, res) => controller.updateCase(req, res)
);

/**
 * DELETE /api/case/:caseId - Deletes the case with cid equals to caseId.
 * @param caseId - The ID of the case.
 */
caseRouter.delete('/:caseId', validateCaseIdParam, (req, res) =>
  controller.deleteCase(req, res)
);

/**
 * GET /api/case/:caseId - Gets the case with cid equals to caseId.
 * @param caseId - The ID of the case.
 */
caseRouter.get('/:caseId', validateCaseIdParam, (req, res) =>
  controller.getCaseByCaseId(req, res)
);

/**
 * GET /api/case - Gets all the cases.
 */
caseRouter.get('/', (req, res) => controller.getAllCases(req, res));

import Router from 'express';
import { CaseController } from '../controller/case-controller';
import {
  validateCreateNewCase,
  validateUpdateCase,
} from '../validators/case-validators';

export const caseRouter = Router();

const controller = new CaseController();

// GET /api/case/client/:clientId - Gets all cases raised by client of clientId
caseRouter.get('/client/:clientId', (req, res) =>
  controller.getByClient(req, res)
);
// GET /api/case/staff/:staffId - Gets all cases handled by a staff member with staffId
caseRouter.get('/staff/:staffId', (req, res) =>
  controller.getByStaff(req, res)
);
// GET /api/case/completed - Gets all completed cases
caseRouter.get('/completed', (req, res) =>
  controller.getAllCompleted(req, res)
);
// GET /api/case/outstanding - Gets all completed cases
caseRouter.get('/outstanding', (req, res) =>
  controller.getAllOutstanding(req, res)
);
// POST /api/case - Creates a new case
caseRouter.post('/', validateCreateNewCase, (req, res) =>
  controller.createCase(req, res)
);
// UPDATE /api/case/:caseId - Updates the case with cid equals to caseId
caseRouter.put('/:caseId', validateUpdateCase, (req, res) =>
  controller.updateCase(req, res)
);
// DELETE /api/case/:caseId - Deletes the case with cid equals to caseId
caseRouter.delete('/:caseId', validateUpdateCase, (req, res) =>
  controller.deleteCase(req, res)
);
// GET /api/case/:caseId - Gets the case with cid equals to caseId
caseRouter.get('/:caseId', (req, res) => controller.getCaseByCaseId(req, res));

// GET /api/case - Gets all the cases.
caseRouter.get('/', (req, res) => controller.getAllCases(req, res));

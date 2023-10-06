import Router from 'express';
import { CaseController } from '../controller/case-controller';
export const caseRouter = Router();

const controller = new CaseController();

// - GET /api/case/client/{client-id} - Gets all cases raised by client of client-id
caseRouter.get('/client/{client-id}', controller.getByClient);
// - GET /api/case/staff/{staff-id} - Gets all cases handled by a staff member with staff-id
caseRouter.get('/staff/{staff-id}', controller.getByStaff);
// - GET /api/case/completed - Gets all completed cases
caseRouter.get('/completed', controller.getAllCompleted);
// - GET /api/case/outstanding - Gets all completed cases
caseRouter.get('/outstanding', controller.getAllOutstanding);
// - POST /api/case - Creates a new case
caseRouter.post('/', controller.createCase);
// - UPDATE /api/case/{case-id} - Updates the case with case-id
caseRouter.put('/{case-id}', controller.updateCase);

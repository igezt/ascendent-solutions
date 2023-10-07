import Router from 'express';
import { ClientController } from '../controller/client-controller';
import {
  validateCreateNewClient,
  validateUpdateClient,
} from '../validators/client-validator';
export const clientRouter = Router();
const controller = new ClientController();
// POST /api/client - Creates a new client
clientRouter.post('/', validateCreateNewClient, (req, res) =>
  controller.createClient(req, res)
);
// DELETE /api/client/:clientId - Deletes the client with clientId
clientRouter.delete('/:clientId', (req, res) =>
  controller.deleteClient(req, res)
);
// GET /api/client/:clientId - Gets the information about a client with clientId
clientRouter.get('/:clientId', (req, res) => controller.getClient(req, res));
// UPDATE /api/client/:clientId - Updates the information about a client with clientId
clientRouter.put('/:clientId', validateUpdateClient, (req, res) =>
  controller.updateClient(req, res)
);
// GET /api/client - Gets all the clients.
clientRouter.get('/', (req, res) => controller.getAllClient(req, res));

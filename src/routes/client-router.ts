import Router from 'express';
import { ClientController } from '../controller/client-controller';
import {
  validateCreateNewClient,
  validateUpdateClient,
} from '../validators/client-validator';
import { validateClientIdParam } from '../validators/common-validators';

export const clientRouter = Router();
const controller = new ClientController();

/**
 * POST /api/client - Creates a new client.
 * @body data - The data for the new client (name, address, birthday, company).
 */
clientRouter.post('/', validateCreateNewClient, (req, res) =>
  controller.createClient(req, res)
);

/**
 * DELETE /api/client/:clientId - Deletes the client with clientId.
 * @param clientId - The ID of the client.
 */
clientRouter.delete('/:clientId', validateClientIdParam, (req, res) =>
  controller.deleteClient(req, res)
);

/**
 * GET /api/client/:clientId - Gets the information about a client with clientId.
 * @param clientId - The ID of the client.
 */
clientRouter.get('/:clientId', validateClientIdParam, (req, res) =>
  controller.getClient(req, res)
);

/**
 * PUT /api/client/:clientId - Updates the information about a client with clientId.
 * @param clientId - The ID of the client.
 * @body data - The new data for the client (name, address, birthday, company).
 */
clientRouter.put(
  '/:clientId',
  validateClientIdParam,
  validateUpdateClient,
  (req, res) => controller.updateClient(req, res)
);

/**
 * GET /api/client - Gets all the clients.
 */
clientRouter.get('/', (req, res) => controller.getAllClient(req, res));

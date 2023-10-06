import Router from 'express';
import { ClientController } from '../controller/client-controller';
export const clientRouter = Router();
const controller = new ClientController();
// POST /api/client - Creates a new client
clientRouter.post('/', controller.createClient);
// DELETE /api/client/{client-id} - Deletes the client with client-id
clientRouter.delete('/{client-id}', controller.deleteClient);
// GET /api/client/{client-id} - Gets the information about a client with client-id
clientRouter.get('/{client-id}', controller.getClient);
// UPDATE /api/client/{client-id} - Updates the information about a client with client-id
clientRouter.put('/{client-id}', controller.updateClient);

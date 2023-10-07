import { NextFunction, Request, Response } from 'express';
import { ClientService } from '../service/client-service';
import {
  CreateClientSchema,
  UpdateClientSchema,
} from '../validators/client-validator';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';
import { Prisma } from '@prisma/client';

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  public async createClient(req: Request, res: Response) {
    const clientParams: CreateClientSchema = req.body;
    const createNewCasteDto = new CreateClientDto(clientParams);

    try {
      const newClient = await this.clientService.createClient(
        createNewCasteDto
      );
      return res.status(201).json(newClient);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }
  public async deleteClient(req: Request, res: Response) {
    const clientIdToDelete = Number(req.params.clientId);

    try {
      const deletedCase = await this.clientService.deleteClient({
        cid: clientIdToDelete,
      });
      return res.status(201).json(deletedCase);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  public async getClient(req: Request, res: Response) {
    const clientIdToGet = Number(req.params.clientId);
    const client = this.clientService.getClient({ cid: clientIdToGet });
    if (!client) {
      return res.status(404).json({
        err: 'No client with that clientId has been found',
      });
    }
    return res.status(200).json({ client });
  }

  public async updateClient(req: Request, res: Response) {
    const clientParams: UpdateClientSchema = req.body;
    const updateClientDto = new UpdateClientDto(
      Number(req.params.caseId),
      clientParams
    );

    try {
      const newCase = await this.clientService.updateClient(updateClientDto);
      return res.status(201).json(newCase);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  public async getAllClient(req: Request, res: Response) {
    const allClients = await this.clientService.getManyClient({});
    return res.status(200).json({ client: allClients });
  }
}

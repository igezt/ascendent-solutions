import { NextFunction, Request, Response } from 'express';
import { ClientService } from '../service/client-service';

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  public createClient(req: Request, res: Response, next: NextFunction) {}
  public deleteClient(req: Request, res: Response, next: NextFunction) {}
  public getClient(req: Request, res: Response, next: NextFunction) {}
  public updateClient(req: Request, res: Response, next: NextFunction) {}
}

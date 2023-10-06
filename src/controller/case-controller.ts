import { NextFunction, Request, Response } from 'express';
import { CaseService } from '../service/case-service';

export class CaseController {
  private caseService: CaseService;

  constructor() {
    this.caseService = new CaseService();
  }

  public getByClient(req: Request, res: Response, next: NextFunction) {}
  public getByStaff(req: Request, res: Response, next: NextFunction) {}
  public getAllCompleted(req: Request, res: Response, next: NextFunction) {}
  public getAllOutstanding(req: Request, res: Response, next: NextFunction) {}
  public createCase(req: Request, res: Response, next: NextFunction) {}
  public updateCase(req: Request, res: Response, next: NextFunction) {}
}

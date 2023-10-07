import { NextFunction, Request, Response } from 'express';
import { CaseService } from '../service/case-service';
import { Prisma, Status } from '@prisma/client';
import { CreateCaseDto, UpdateCaseDto } from '../dtos/case.dto';
import {
  CreateNewCaseSchema,
  UpdateCaseSchema,
} from '../validators/case-validators';

export class CaseController {
  private caseService: CaseService;

  constructor() {
    this.caseService = new CaseService();
  }

  public async getByClient(req: Request, res: Response) {
    const clientId = Number(req.params.clientId);
    const casesWithClientId = await this.caseService.getManyCases({
      cid: clientId,
    });
    if (!casesWithClientId.length) {
      return res.status(404).json({
        err: 'No cases with that clientId has been found',
      });
    }

    return res.json({ cases: casesWithClientId });
  }

  public async getByStaff(req: Request, res: Response) {
    const staffId = Number(req.params.staffId);
    const casesWithStaffId = await this.caseService.getManyCases({
      eid: staffId,
    });
    if (!casesWithStaffId.length) {
      return res.status(404).json({
        err: 'No cases with that staffId has been found',
      });
    }

    return res.json({ cases: casesWithStaffId });
  }

  public async getAllCompleted(req: Request, res: Response) {
    const allCompletedCases = await this.caseService.getManyCases({
      status: Status.COMPLETED,
    });
    if (!allCompletedCases.length) {
      return res.status(404).json({
        err: 'No cases with that staffId has been found',
      });
    }

    return res.status(200).json({ cases: allCompletedCases });
  }

  public async getAllOutstanding(req: Request, res: Response) {
    const allOutstandingCases = await this.caseService.getManyCases({
      status: Status.OUTSTANDING,
    });
    if (!allOutstandingCases.length) {
      return res.status(404).json({
        err: 'No cases with that staffId has been found',
      });
    }

    return res.status(200).json({ cases: allOutstandingCases });
  }

  public async createCase(req: Request, res: Response) {
    const caseParams: CreateNewCaseSchema = req.body;
    const createNewCasteDto = new CreateCaseDto(caseParams);

    try {
      const newCase = await this.caseService.createNewCase(createNewCasteDto);
      return res.status(201).json(newCase);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  public async updateCase(req: Request, res: Response) {
    const caseParams: UpdateCaseSchema = req.body;
    const createNewCasteDto = new UpdateCaseDto(
      Number(req.params.caseId),
      caseParams
    );

    try {
      const newCase = await this.caseService.updateCase(createNewCasteDto);
      return res.status(201).json(newCase);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  public async deleteCase(req: Request, res: Response) {
    const caseIdToDelete = Number(req.params.caseId);
    try {
      const deletedCase = await this.caseService.deleteCase({
        id: caseIdToDelete,
      });
      return res.status(201).json(deletedCase);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        console.log(e);
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  public async getCaseByCaseId(req: Request, res: Response) {
    const caseIdToGet = Number(req.params.caseId);
    const caseWithCaseId = await this.caseService.getCase({ id: caseIdToGet });
    if (!caseWithCaseId) {
      return res.status(404).json({
        err: 'No case with that caseId has been found',
      });
    }
    return res.status(200).json({ case: caseWithCaseId });
  }

  public async getAllCases(req: Request, res: Response) {
    const allCases = await this.caseService.getManyCases({});
    return res.status(200).json({ case: allCases });
  }
}

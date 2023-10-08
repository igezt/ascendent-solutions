import { Request, Response } from 'express';
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

  /**
   * Retrieves all cases raised by a specific client.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with the cases or an error message.
   */
  public async getByClient(req: Request, res: Response) {
    const clientId = Number(req.params.clientId);
    try {
      const casesWithClientId = await this.caseService.getManyCases({
        cid: clientId,
      });
      return res.json({ cases: casesWithClientId });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  /**
   * Retrieves all cases handled by a specific staff member.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with the cases or an error message.
   */
  public async getByStaff(req: Request, res: Response) {
    const staffId = Number(req.params.staffId);
    try {
      const casesWithStaffId = await this.caseService.getManyCases({
        eid: staffId,
      });
      return res.json({ cases: casesWithStaffId });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  /**
   * Retrieves all cases that are marked as completed.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with the completed cases or an error message.
   */
  public async getAllCompleted(req: Request, res: Response) {
    try {
      const allCompletedCases = await this.caseService.getManyCases({
        status: Status.COMPLETED,
      });

      return res.status(200).json({ cases: allCompletedCases });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  /**
   * Retrieves all cases that are marked as outstanding.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with the outstanding cases or an error message.
   */
  public async getAllOutstanding(req: Request, res: Response) {
    try {
      const allOutstandingCases = await this.caseService.getManyCases({
        status: Status.OUTSTANDING,
      });
      return res.status(200).json({ cases: allOutstandingCases });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  /**
   * Creates a new case based on the data provided in the request body.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with the new case or an error message.
   */
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

  /**
   * Updates an existing case.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with the updated case or an error message.
   */
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

  /**
   * Deletes a case.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with the deleted case or an error message.
   */
  public async deleteCase(req: Request, res: Response) {
    const caseIdToDelete = Number(req.params.caseId);
    try {
      const deletedCase = await this.caseService.deleteCase({
        id: caseIdToDelete,
      });
      return res.status(200).json(deletedCase);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        console.log(e);
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  /**
   * Retrieves a specific case based on its `caseId`.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with the case or an error message.
   */
  public async getCaseByCaseId(req: Request, res: Response) {
    const caseIdToGet = Number(req.params.caseId);
    try {
      const caseWithCaseId = await this.caseService.getCase({
        id: caseIdToGet,
      });

      return res.status(200).json({ case: caseWithCaseId });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }

  /**
   * Retrieves all cases.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response with all the cases or an error message.
   */
  public async getAllCases(req: Request, res: Response) {
    try {
      const allCases = await this.caseService.getManyCases({});
      return res.status(200).json({ case: allCases });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ err: e.meta?.cause ?? e.message });
      } else {
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }
}

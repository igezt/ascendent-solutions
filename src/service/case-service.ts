import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';
import { CreateCaseDto, UpdateCaseDto } from '../dtos/case.dto';

/**
 * Case Service class definition.
 * This class is responsible for handling the database operations for cases.
 */
export class CaseService {
  private casePrisma: Prisma.CaseDelegate;

  /**
   * Initializes the Prisma client.
   */
  constructor() {
    this.casePrisma = prisma.case;
  }

  /**
   * Retrieves a single case based on the provided data.
   * @param data - Contains the case's information used for search criteria.
   * @returns The case that matches the provided data.
   */
  public async getCase(data: Prisma.CaseWhereInput) {
    const firstCase = await this.casePrisma.findFirst({ where: data });
    return firstCase;
  }

  /**
   * Retrieves multiple cases based on the provided data.
   * @param data - Contains the cases' information used for search criteria.
   * @returns The cases that match the provided data.
   */
  public async getManyCases(data: Prisma.CaseWhereInput) {
    const cases = await this.casePrisma.findMany({ where: data });
    return cases;
  }

  /**
   * Creates a new case.
   * @param data - Contains the data for the new case (request_message, status, client, staff, creation_date).
   * @returns The newly created case.
   */
  public async createNewCase(data: CreateCaseDto) {
    const newCase = await this.casePrisma.create({
      data: {
        request_message: data.request_message,
        status: data.status,
        client: { connect: { cid: data.cid } },
        staff: data.eid ? { connect: { eid: data.eid } } : undefined,
        creation_date: data.creation_date,
      },
    });
    return newCase;
  }

  /**
   * Updates a case based on the provided data.
   * @param data - Contains the new case's information.
   * @returns The updated case.
   */
  public async updateCase(data: UpdateCaseDto) {
    const updatedCase = await this.casePrisma.update({
      where: { id: data.id },
      data: {
        request_message: data.request_message,
        status: data.status,
        client: data.cid ? { connect: { cid: data.cid } } : undefined,
        staff: data.eid ? { connect: { eid: data.eid } } : undefined,
        creation_date: data.creation_date,
      },
    });
    return updatedCase;
  }

  /**
   * Deletes a case based on the provided data.
   * @param data - Contains the unique case's information used for search criteria.
   * @returns The deleted case.
   */
  public async deleteCase(data: Prisma.CaseWhereUniqueInput) {
    const deletedCase = await this.casePrisma.delete({
      where: { id: data.id },
    });
    return deletedCase;
  }
}

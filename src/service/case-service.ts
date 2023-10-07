import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';
import { CreateCaseDto, UpdateCaseDto } from '../dtos/case.dto';

export class CaseService {
  private casePrisma: Prisma.CaseDelegate;

  constructor() {
    this.casePrisma = prisma.case;
  }

  public async getCase(data: Prisma.CaseWhereInput) {
    const firstCase = await this.casePrisma.findFirst({ where: data });
    return firstCase;
  }

  public async getManyCases(data: Prisma.CaseWhereInput) {
    const cases = await this.casePrisma.findMany({ where: data });
    return cases;
  }

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

  public async updateCase(data: UpdateCaseDto) {
    const updatedCase = await this.casePrisma.update({
      where: { id: data.id },
      data: {
        request_message: data.request_message,
        status: data.status,
        client: data.eid ? { connect: { cid: data.cid } } : undefined,
        staff: data.eid ? { connect: { eid: data.eid } } : undefined,
        creation_date: data.creation_date,
      },
    });
    return updatedCase;
  }

  public async deleteCase(data: Prisma.CaseWhereUniqueInput) {
    const deletedCase = await this.casePrisma.delete({
      where: { id: data.id },
    });
    return deletedCase;
  }
}

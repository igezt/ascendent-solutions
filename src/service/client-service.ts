import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';

export class ClientService {
  private clientPrisma: Prisma.ClientDelegate;

  constructor() {
    this.clientPrisma = prisma.client;
  }

  public async createClient(data: CreateClientDto) {
    const newClient = await this.clientPrisma.create({
      data: {
        name: data.name,
        address: data.address,
        bday: data.bday,
        company: data.company,
      },
    });
    return newClient;
  }
  public async getClient(data: Prisma.ClientWhereInput) {
    const client = await this.clientPrisma.findFirst({
      where: {
        address: data.address,
        bday: data.bday,
        cid: data.cid,
        company: data.company,
        name: data.name,
      },
    });
    return client;
  }

  public async getManyClient(data: Prisma.ClientWhereInput) {
    const client = await this.clientPrisma.findMany({
      where: {
        address: data.address,
        bday: data.bday,
        cid: data.cid,
        company: data.company,
        name: data.name,
      },
    });
    return client;
  }

  public async deleteClient(data: Prisma.ClientWhereUniqueInput) {
    const deletedClient = await this.clientPrisma.delete({
      where: {
        address: data.address,
        bday: data.bday,
        cid: data.cid,
        company: data.company,
        name: data.name,
      },
    });

    return deletedClient;
  }
  public async updateClient(data: UpdateClientDto) {
    const updatedClient = await this.clientPrisma.update({
      where: { cid: data.cid },
      data: {
        address: data.address,
        bday: data.bday,
        company: data.company,
        name: data.name,
      },
    });
    return updatedClient;
  }
}

import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';

/**
 * Client Service class definition.
 * This class is responsible for handling the database operations for clients.
 */
export class ClientService {
  private clientPrisma: Prisma.ClientDelegate;

  /**
   * Initializes the Prisma client.
   */
  constructor() {
    this.clientPrisma = prisma.client;
  }

  /**
   * Creates a new client.
   * @param data - Contains the data for the new client (name, address, birthday, company).
   * @returns The newly created client.
   */
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

  /**
   * Retrieves a single client based on the provided data.
   * @param data - Contains the client's information used for search criteria (address, birthday, cid, company, name).
   * @returns The client that matches the provided data. Age is also attached as an augmented field that is calculated at runtime
   *  using the birthday of the client.
   */
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
    return {
      ...client,
      age: client?.bday
        ? new Date().getFullYear() - client.bday.getFullYear()
        : undefined,
    };
  }

  /**
   * Retrieves multiple clients based on the provided data.
   * @param data - Contains the clients' information used for search criteria (address, birthday, cid, company, name).
   * @returns The clients that match the provided data.
   */
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

  /**
   * Deletes a client based on the provided data.
   * @param data - Contains the unique client's information used for search criteria (address, birthday, cid, company, name).
   * @returns The deleted client.
   */
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

  /**
   * Updates a client based on the provided data.
   * @param data - Contains the new client's information.
   * @returns The updated client.
   */
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

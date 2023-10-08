import {
  CreateClientSchema,
  UpdateClientSchema,
} from '../validators/client-validator';

/**
 * Data Transfer Object (DTO) for creating a new client.
 * It validates the data for creating a new client.
 * @property name - The name of the client.
 * @property bday - The birthday of the client.
 * @property company - The company of the client.
 * @property address - The address of the client.
 */
export class CreateClientDto {
  public name: string;
  public bday: Date | undefined;
  public company: string;
  public address: string;

  constructor(data: CreateClientSchema) {
    this.name = data.name;
    this.bday = data.bday ? new Date(data.bday) : undefined;
    this.company = data.company;
    this.address = data.address;
  }
}

/**
 * Data Transfer Object (DTO) for updating a client.
 * It validates the data for updating a client.
 * @property cid - The ID of the client.
 * @property name - The name of the client.
 * @property bday - The birthday of the client.
 * @property company - The company of the client.
 * @property address - The address of the client.
 */
export class UpdateClientDto {
  public cid: number;
  public name: string;
  public bday: Date | undefined;
  public company: string;
  public address: string;

  constructor(cid: number, data: UpdateClientSchema) {
    this.cid = cid;
    this.name = data.name;
    this.bday = data.bday ? new Date(data.bday) : undefined;
    this.company = data.company;
    this.address = data.address;
  }
}

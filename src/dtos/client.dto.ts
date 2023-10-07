import {
  CreateClientSchema,
  UpdateClientSchema,
} from '../validators/client-validator';

export class CreateClientDto {
  public name: string;
  public bday: Date;
  public company: string;
  public address: string;

  constructor(data: CreateClientSchema) {
    this.name = data.name;
    this.bday = new Date(data.bday);
    this.company = data.company;
    this.address = data.address;
  }
}
export class UpdateClientDto {
  public cid: number;
  public name: string;
  public bday: Date;
  public company: string;
  public address: string;

  constructor(cid: number, data: UpdateClientSchema) {
    this.cid = cid;
    this.name = data.name;
    this.bday = new Date(data.bday);
    this.company = data.company;
    this.address = data.address;
  }
}

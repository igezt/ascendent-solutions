import Joi from 'joi';
import * as joi from '@hapi/joi';
import 'joi-extract-type';
import { createBodyValidator } from './create-validator';

/**
 * Joi schema for creating a new client.
 * @property name - The name of the client.
 * @property bday - The birthday of the client.
 * @property address - The address of the client.
 * @property company - The company of the client.
 */
const createNewClientRules = Joi.object({
  name: Joi.string(),
  bday: Joi.date(),
  address: Joi.string(),
  company: Joi.string(),
});

/**
 * Type for the data required to create a new client.
 * Extracted from the createNewClientRules schema.
 */
export type CreateClientSchema = joi.extractType<typeof createNewClientRules>;

/**
 * Validator middleware for creating a new client.
 * Uses the createNewClientRules schema.
 */
export const validateCreateNewClient =
  createBodyValidator(createNewClientRules);

/**
 * Joi schema for updating a client.
 * @property name - The name of the client.
 * @property bday - The birthday of the client.
 * @property address - The address of the client.
 * @property company - The company of the client.
 */
const updateClientRules = Joi.object({
  name: Joi.string(),
  bday: Joi.date(),
  address: Joi.string(),
  company: Joi.string(),
});

/**
 * Type for the data required to update a client.
 * Extracted from the updateClientRules schema.
 */
export type UpdateClientSchema = joi.extractType<typeof updateClientRules>;

/**
 * Validator middleware for updating a client.
 * Uses the updateClientRules schema.
 */
export const validateUpdateClient = createBodyValidator(updateClientRules);

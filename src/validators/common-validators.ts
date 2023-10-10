import Joi from 'joi';
import { createParamValidator } from './create-validator';

/**
 * Joi schema for checking clientId.
 * @property clientId - The ID of the client.
 */
const clientIdParamSchema = Joi.object({
  clientId: Joi.number().positive().required(),
});

export const validateClientIdParam = createParamValidator(clientIdParamSchema);

/**
 * Joi schema for checking staffId.
 * @property staffId - The ID of the staff.
 */
const staffIdParamSchema = Joi.object({
  staffId: Joi.number().positive().required(),
});

export const validateStaffIdParam = createParamValidator(staffIdParamSchema);

/**
 * Joi schema for checking caseId.
 * @property caseId - The ID of the case.
 */
const caseIdParamSchema = Joi.object({
  caseId: Joi.number().positive().required(),
});

export const validateCaseIdParam = createParamValidator(caseIdParamSchema);

import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

/**
 * Creates a middleware function for validating request bodies using a Joi schema.
 * @param schema - The Joi schema used to validate the request body.
 * @returns A middleware function that validates the request body against the provided schema.
 * If the validation fails, it sends a 400 response with the validation errors.
 * If the validation succeeds, it calls the next middleware function.
 */
export const createBodyValidator = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).send({
        err: error.details.map((detail) => detail.message.split('"').join('')),
      });
    } else {
      next();
    }
  };
};

/**
 * Creates a middleware function for validating request params using a Joi schema.
 * @param schema - The Joi schema used to validate the request body.
 * @returns A middleware function that validates the request body against the provided schema.
 * If the validation fails, it sends a 400 response with the validation errors.
 * If the validation succeeds, it calls the next middleware function.
 */
export const createParamValidator = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(400).send({
        err: error.details.map((detail) => detail.message.split('"').join('')),
      });
    } else {
      next();
    }
  };
};

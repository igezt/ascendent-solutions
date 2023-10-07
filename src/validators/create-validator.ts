import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const createValidator = (schema: Joi.ObjectSchema) => {
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

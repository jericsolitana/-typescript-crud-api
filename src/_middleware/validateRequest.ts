import type { Request, NextFunction } from 'express';
import Joi from 'joi';

export function validateRequest(
    req: Request,
    next: NextFunction,
    schema: Joi.ObjectSchema
): void {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        next(`Validation error: ${error.details.map((d) => d.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}
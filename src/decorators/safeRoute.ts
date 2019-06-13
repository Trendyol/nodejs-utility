import { Request, Response, NextFunction } from 'express';

export const safeRoute = (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = async function(req: Request, res: Response, next: NextFunction) {
      try {
        return await original.apply(this, [req, res, next]);
      } catch (e) {
        return next(e.stack || e);
      }
    };
  }
  return descriptor;
};

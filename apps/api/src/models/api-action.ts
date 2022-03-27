import {NextFunction, Request, Response} from 'express';

export type APIAction<TData> = (req: Request, res: Response, next: NextFunction) => Promise<TData>;

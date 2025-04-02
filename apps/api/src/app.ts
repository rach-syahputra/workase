import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import { corsOptions, PORT } from './config';
import { ResponseError } from './helpers/error';
import SampleRouter from './routers/sample/sample.router';
import CompanyReviewRouter from './routers/company-review.router';
import SearchCompanyReviewRouter from './routers/search-company-review.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors(corsOptions));
    this.app.options('*', (req, res) => {
      res.header('Access-Control-Allow-Origin', 'https://workase.vercel.app');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.sendStatus(204);
    });
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (!err) {
          next();
          return;
        }

        if (err instanceof ResponseError) {
          res.status(err.code || 500).json({
            success: false,
            error: {
              message: err.message,
            },
          });
        } else if (err instanceof Yup.ValidationError) {
          res.status(400).json({
            success: false,
            error: {
              message: err.errors[0],
              details: err.errors,
            },
          });
        } else if (err instanceof jwt.TokenExpiredError) {
          res.status(400).json({
            success: false,
            error: {
              message: 'jwt is expired',
            },
          });
        } else {
          console.log(err);

          res.status(500).json({
            success: false,
            error: {
              message: 'Something went wrong, please try again later',
              originalMessage: err.message,
            },
          });
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const companyReviewRouter = new CompanyReviewRouter();
    const searchCompanyReviewRouter = new SearchCompanyReviewRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/companies', companyReviewRouter.getRouter());
    this.app.use('/api/search', searchCompanyReviewRouter.getRouter());
  }

  public getServer(): Express {
    return this.app;
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}

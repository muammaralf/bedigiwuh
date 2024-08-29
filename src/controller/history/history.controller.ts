import { BaseController } from "../../common/base.controller";
import { HistoryService } from "../../service/history/history.service";
import { IHistoryUseCase } from "../../service/history/history.use_case";
import { Express, Request, Response } from "express"
import { dataToRestResponse, errorToRestResponse } from "../../common/rest.entity";
import { objectToCamel, objectToSnake } from "ts-case-convert";

export class HistoryController implements BaseController {

  private app: Express
  private service: IHistoryUseCase
  private prefix = 'histories'

  constructor(app: Express){
    this.app = app
    this.service = new HistoryService()
  }

  init(): void {
    this.app.get(`/${this.prefix}`, async (req: Request, res: Response) => {
      try {
        const data = await this.service.getHistories({
          perPage: req.query.perPage ? parseInt(req.query.perPage as string) : 10,
          currentPage: req.query.page ? parseInt(req.query.page as string) : 1,
          userId: req.query.userId ? parseInt(req.query.userId as string) : undefined,
          sortBy: req.query.sortBy as string | undefined,
          orderBy: req.query.orderBy as "asc" | "desc" | undefined ?? "asc",
          transactionDay: req.query.transactionDay as string | undefined,
        })

        res.status(200).json({
          success: true,
          message: 'Success',
          data: objectToCamel(data.data),
          stats: data.stats,
        })

      } catch (error) {
        res.status(400).json(errorToRestResponse(error))
      }
    })
  }
}
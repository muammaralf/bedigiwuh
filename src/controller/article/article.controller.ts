import { BaseController } from "../../common/base.controller";
import { Express, Request, Response } from "express"
import { IArticleUseCase } from "../../service/article/article.use_case";
import { dataToRestResponse, errorToRestResponse } from "../../common/rest.entity";
import { objectToCamel, objectToSnake } from "ts-case-convert";
import { Article } from "../../entity/article.entity";
import { ArticleService } from "../../service/article/article.service";

export class ArticleController implements BaseController {
  private app: Express
  private service: IArticleUseCase
  private prefix = 'articles'

  constructor(app: Express){
    this.app = app
    this.service = new ArticleService()
  }

  init(): void {
    this.app.get(`/${this.prefix}`, async (req: Request, res: Response) => {
      try {
        const data = await this.service.getAll({
          perPage: req.query.perPage ? parseInt(req.query.perPage as string) : 10,
          currentPage: req.query.page ? parseInt(req.query.page as string) : 1,
          query: req.query.q as string ?? "",
          sortBy: req.query.sortBy as string | undefined,
          orderBy: req.query.orderBy as "asc" | "desc" | undefined ?? "asc",
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

    this.app.get(`/${this.prefix}/:id`, async (req: Request, res: Response) => {
      try {
        const data = await this.service.getById(parseInt(req.params.id))
        res.status(200).json(dataToRestResponse(objectToCamel(data)))
      } catch (error) {
        res.status(400).json(errorToRestResponse(error))
      }
    })

    this.app.post(`/${this.prefix}`, async (req: Request, res: Response) => {
      try {
        await this.service.create(objectToSnake(req.body) as Article)
        res.status(200).json(dataToRestResponse(null))
      } catch (error) {
        res.status(400).json(errorToRestResponse(error))
      }
    })

    this.app.put(`/${this.prefix}/:id`, async (req: Request, res: Response) => {
      try {
        await this.service.update(parseInt(req.params.id), objectToSnake(req.body) as Article)
        res.status(200).json(dataToRestResponse(null))
      } catch (error) {
        res.status(400).json(errorToRestResponse(error))
      }
    })

    this.app.delete(`/${this.prefix}/:id`, async (req: Request, res: Response) => {
      try {
        await this.service.delete(parseInt(req.params.id))
        res.status(200).json(dataToRestResponse(null))
      } catch (error) {
        res.status(400).json(errorToRestResponse(error))
      }
    })
  }
}
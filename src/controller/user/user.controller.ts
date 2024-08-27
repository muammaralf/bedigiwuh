import { BaseController } from "../../common/base.controller";
import { Express, Request, Response } from "express"
import { IUserUseCase } from "../../service/user/user.use_case";
import { UserService } from "../../service/user/user.service";
import { objectToSnake } from "ts-case-convert";
import { User } from "../../entity/user.entity";
import { dataToRestResponse, errorToRestResponse } from "../../common/rest.entity";

export class UserController implements BaseController {
  private app: Express
  private service: IUserUseCase

  constructor(app: Express){
    this.app = app
    this.service = new UserService()
  }

  init(): void {
    this.app.post('/register', async (req: Request, res: Response) => {
      try {
        const data = await this.service.register(objectToSnake(req.body) as User)
        res.status(200).json(dataToRestResponse(data))
      } catch (error) {
        res.status(400).json(errorToRestResponse(error))
      }
    })

    this.app.post('/login', async (req: Request, res: Response) => {
      try {
        
        const data = await this.service.login(req.body.phoneNumber, req.body.password)
        res.status(200).json(dataToRestResponse(data))
      } catch (error) {
        res.status(400).json(errorToRestResponse(error))
      }
    })
    
    this.app.get('/me', async (req: Request, res: Response) => {
      try {
        const data = await this.service.getMe()
        res.status(200).json(dataToRestResponse(data))
      } catch (error) {
        res.status(400).json(errorToRestResponse(error))
      }
    })
  }
}
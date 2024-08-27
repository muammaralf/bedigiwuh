import { User } from "../../entity/user.entity";

export interface IUserUseCase {
  register(data: User): Promise<void>
  login(email: string, password: string): Promise<any>
  getMe(): Promise<any> 
}
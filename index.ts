import bodyparser from 'body-parser';
import express, { Express, Request, Response } from "express"
import cors from 'cors';
import { UserController } from './src/controller/user/user.controller';
import { initSupabase } from './src/util/supabase/supabase';
import { EventController } from './src/controller/event/event.controller';
import { ProductController } from './src/controller/product/product.controller';
import { ArticleController } from './src/controller/article/article.controller';
import { VideoController } from './src/controller/video/video.controller';
import { configDotenv } from 'dotenv';

const app: Express = express()
const port = 8080
app.use(bodyparser.json())
app.use(cors({credentials: true, origin: true}))

configDotenv()
initSupabase()

const userController = new UserController(app)
const eventController = new EventController(app)
const productController = new ProductController(app)
const articleController = new ArticleController(app)
const videoController = new VideoController(app)

userController.init()
eventController.init()
productController.init()
articleController.init()
videoController.init()

app.get('/', (_: Request, res: Response) => {
  res.send(`
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <pre>

      ░▒▓███████▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒▒▓███▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░ 
      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
      ░▒▓███████▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█████████████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░ 
                                                                                            
      </pre>
  </div>
  `)
})

app.listen(port, () => {
  console.log(`Digiwuh listen on port: ${port}`)
})
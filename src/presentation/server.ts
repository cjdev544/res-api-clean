import express, { Router } from 'express'
import path from 'node:path'

import morgan from 'morgan'

interface Options {
  port: number
  publicPath?: string
  routes: Router
}

export class Server {
  private app = express()
  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor(options: Options) {
    const { routes, port, publicPath = 'public' } = options
    this.port = port
    this.publicPath = publicPath
    this.routes = routes
    this.middlewares()
  }

  private middlewares() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
  }

  public async start() {
    this.app.use(this.routes)

    this.app.use(express.static('public'))

    this.app.get(/.*/, (_req, res) => {
      const indexPath = path.resolve(
        process.cwd(),
        this.publicPath,
        'index.html',
      )
      res.sendFile(indexPath)
    })

    this.app.listen(this.port, () => {
      console.log(`Server run on port: ${this.port}`)
    })
  }
}

import express from 'express'
import path from 'node:path'

interface Options {
  port: number
  publicPath?: string
}

export class Server {
  private app = express()
  private readonly port: number
  private readonly publicPath: string

  constructor(options: Options) {
    const { port, publicPath = 'public' } = options
    this.port = port
    this.publicPath = publicPath
  }

  public async start() {
    this.app.use(express.static('public'))

    this.app.get(/.*/, (req, res) => {
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

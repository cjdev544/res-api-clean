import { Request, Response } from 'express'

export class TodoController {
  public getTodos(_req: Request, res: Response) {
    console.log('todoController')
    return res.status(200).json([
      { id: 1, text: 'buy  milk', createdAt: Date.now() },
      { id: 2, text: 'buy  bread', createdAt: null },
      { id: 3, text: 'buy  butter', createdAt: Date.now() },
    ])
  }
}

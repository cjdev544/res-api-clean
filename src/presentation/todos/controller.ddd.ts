import { Request, Response } from 'express'

import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'
import { TodoRepository } from '../../domain'

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (_req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll()
    return res.status(200).json(todos)
  }

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id
    if (isNaN(id))
      return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = await this.todoRepository.findById(id)
    return res.status(200).json(todo)
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) return res.status(400).json({ error })

    const todo = await this.todoRepository.create(createTodoDto!)
    res.status(200).json(todo)
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
    if (error) return res.status(400).json({ error })

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
    res.json(updatedTodo)
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id

    const deletedTodo = await this.todoRepository.deleteById(id)
    return res.status(200).json(deletedTodo)
  }
}

import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'

export class TodoController {
  public getTodos = async (_req: Request, res: Response) => {
    try {
      const todos = await prisma.todo.findMany()
      return res.status(200).json(todos)
    } catch (error) {
      res.status(500).json({
        error: 'Error server',
      })
    }
  }

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id
    if (isNaN(id))
      return res.status(400).json({ error: 'ID argument is not a number' })

    try {
      const todo = await prisma.todo.findFirst({
        where: { id },
      })

      todo
        ? res.status(200).json(todo)
        : res.status(404).json({ error: `TODO with id: ${id} not found` })
    } catch (error) {
      res.status(500).json({
        error: 'Error server',
      })
    }
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) return res.status(400).json({ error })

    try {
      const todo = await prisma.todo.create({
        data: createTodoDto!,
      })

      res.json(todo)
    } catch (error) {
      res.status(500).json({
        error: 'Error server',
      })
    }
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
    if (error) return res.status(400).json({ error })

    try {
      const todo = await prisma.todo.findFirst({
        where: { id },
      })

      if (!todo)
        return res.status(404).json({ error: `Todo with id ${id} not found` })

      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: updateTodoDto!.values,
      })

      res.json(updatedTodo)
    } catch (error) {
      res.status(500).json({
        error: 'Error server',
      })
    }
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id

    const todo = await prisma.todo.findFirst({
      where: { id },
    })

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` })

    try {
      const deleted = await prisma.todo.delete({
        where: { id },
      })

      deleted
        ? res.json(deleted)
        : res.status(400).json({ error: `Todo with id ${id} not found` })
    } catch (error) {
      res.status(500).json({
        error: 'Error server',
      })
    }
  }
}

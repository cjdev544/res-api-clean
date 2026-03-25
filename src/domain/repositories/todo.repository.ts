import { CreateTodoDto } from '../dtos'
import { TodoEntity } from '../entities/todo.entity'
import { UpdateTodoDto } from '../dtos/todos/update-todo.tdo'

export abstract class TodoRepository {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
  //TODO: parameters
  abstract getAll(): Promise<TodoEntity[]>
  abstract findById(id: number): Promise<TodoEntity>
  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
  abstract deleteById(id: number): Promise<TodoEntity>
}

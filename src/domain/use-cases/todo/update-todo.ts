import { UpdateTodoDto } from '../../dtos'
import { TodoEntity } from '../../entities/todo.entity'
import { TodoRepository } from '../../repositories/todo.repository'

interface UpdateTodUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(dto)
  }
}

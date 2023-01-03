import { TodoParams } from './types';
import instance from '../axios';

export const todoApi = {
  getTodos() {
    return instance.get('/todos');
  },
  createTodo(body: TodoParams) {
    return instance.post('/todos', body);
  },
  deleteTodo(id: string) {
    return instance.delete(`/todos/${id}`);
  },
  updateTodo(id: string, body: TodoParams) {
    return instance.put(`/todos/${id}`, body);
  },
};

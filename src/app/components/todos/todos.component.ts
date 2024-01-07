import { Component, Input } from '@angular/core';
import { TodoComponent } from "../todo/todo.component";
import { NgFor } from "@angular/common";
import { NewTodoComponent } from "../new-todo/new-todo.component";
import { FormsModule, } from "@angular/forms";
interface IObj {
  id: number
  label: string
  complete: boolean
}
@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoComponent, NgFor, NewTodoComponent, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})


export class TodosComponent {

  todos: IObj[] = [
    {
      id: 1,
      label: "asd",
      complete: false
    }
  ]
  addNewTodo(event: any) {
    const lastItem = this.todos[this.todos.length - 1]

    const obj: IObj = {
      id: lastItem ? lastItem.id + 1 : 1,
      label: event.label,
      complete: false
    }
    this.todos.push(obj)
  }
  removeTodo({ id }: { id: number }) {
    console.log(id);
    const todoIndex = this.todos.findIndex((todo) => todo.id === id)
    this.todos.splice(todoIndex, 1)
  }

}

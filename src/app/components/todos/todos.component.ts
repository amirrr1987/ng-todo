import { Component,Input } from '@angular/core';
import {TodoComponent} from "../todo/todo.component";
import {NgFor} from "@angular/common";
import {NewTodoComponent} from "../new-todo/new-todo.component";
import {FormsModule,} from "@angular/forms";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoComponent, NgFor, NewTodoComponent,FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
todos= [
  {
    id: 1,
    label: "Job 1",
    complete: false
  },
  {
    id: 2,
    label: "Job 2",
    complete: true
  },
  {
    id: 3,
    label: "Job 3",
    complete: false
  },
]
}

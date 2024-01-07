import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.scss'
})
export class NewTodoComponent {
  tempTodo: string = ""
  @Output() updateTodo = new EventEmitter<{label: string}>();
  sendTodo() {
    if (this.tempTodo.length > 0) {
      this.updateTodo.emit({label: this.tempTodo})
      this.tempTodo = ""
    }
  }
}

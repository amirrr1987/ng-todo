import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo = { id: 1, label: "", complete : false}
  @Output() remove = new EventEmitter<{ id: number }>()

  removeItem(todoId: number) {
    this.remove.emit({ id: todoId })    
  }
}

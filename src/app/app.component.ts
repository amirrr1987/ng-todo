import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormsModule,} from "@angular/forms";
import {TodosComponent} from "./components/todos/todos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo';
  sendTodo($event: any){
    console.log($event)
  }
}

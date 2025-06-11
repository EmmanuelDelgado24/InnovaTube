import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ToastSuccessfullComponent } from './shared/components/toast-successfull/toast-successfull.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastSuccessfullComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  exito: boolean = false; 
  title = 'InnovaTube'
}

import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],  // ✅ Importamos LoginComponent
  template: `
    <app-login></app-login>  <!-- ✅ Agregamos el componente en la vista -->
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
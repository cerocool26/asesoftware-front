import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      this.loginError = false;
      this.router.navigate(['/generar-turnos']);
    } else {
      this.loginError = true;
    }
  }
}



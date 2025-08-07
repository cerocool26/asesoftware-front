import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { GenerarTurnosComponents } from './generar-turnos/generar-turnos';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'generar-turnos', component: GenerarTurnosComponents }
];

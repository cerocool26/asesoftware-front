import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Comerce } from '../models/comerce.model';

@Component({
  selector: 'app-generar-turnos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ],
  templateUrl: './generar-turnos.html',
  styleUrl: './generar-turnos.css'
})
export class GenerarTurnosComponents implements OnInit {
  usuario = localStorage.getItem('usuario') || '';
  comercios: Comerce[] = [];
  servicios: any[] = [];

  comercioSeleccionado: number | null = null;
  servicioSeleccionado: number | null = null;
  fechaInicio = '';
  fechaFin = '';
  turnos: any[] = [];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario') || '';
    this.obtenerComercios();
  }

  obtenerComercios() {
    this.http.get<Comerce[]>('comercios').subscribe(data => {
      this.comercios = data;
    });
  }

  cargarServicios() {
    if (this.comercioSeleccionado != null) {
      this.http
        .get<any[]>(`/servicios/${this.comercioSeleccionado}`)
        .subscribe(data => {
          this.servicios = data;
        });
    }
  }

  generarTurnos() {
    const body = {
      comercioId: this.comercioSeleccionado,
      servicioId: this.servicioSeleccionado,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin
    };

    this.http.post<any[]>('/turnos/generar', body).subscribe(turnos => {
      this.turnos = turnos;
    });
  }
}

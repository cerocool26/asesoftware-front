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
import { Service } from '../models/service.model';
import { Shift } from '../models/shift.model';
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';

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
    HttpClientModule,
    MatTableModule
  ],
  templateUrl: './generar-turnos.html',
  styleUrl: './generar-turnos.css'
})
export class GenerarTurnosComponents implements OnInit {
  usuario = localStorage.getItem('usuario') || '';
  comercios: Comerce[] = [];
  servicios: Service[] = [];

  comercioSeleccionado: number | null = null;
  servicioSeleccionado: number | null = null;
  fechaInicio = '';
  fechaFin = '';
  turnosGenerados: Shift[] = [];
  columnasTurnos: string[] = ['nombreComercio', 'nombreServicio', 'fechaTurno', 'horaInicio', 'horaFin'];

  constructor(private http: HttpClient,private router: Router,private cdRef: ChangeDetectorRef) {}

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
        .get<Service[]>(`/servicios/comercio/${this.comercioSeleccionado}`)
        .subscribe(data => {
          this.servicios = data;
        });
    }
  }

  generarTurnos() {
    const body = {
      idServicio: this.servicioSeleccionado,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin
    };

    this.http.post<Shift[]>('/turnos/generar', body).subscribe(turnos => {
      this.turnosGenerados = turnos;
      this.cdRef.detectChanges();
    });
  }
}

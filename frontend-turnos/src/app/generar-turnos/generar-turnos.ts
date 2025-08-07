import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-generar-turnos',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './generar-turnos.html',
  styleUrl: './generar-turnos.css'
})
export class GenerarTurnosComponents implements OnInit{
  usuario = localStorage.getItem('usuario') || '';
  comercios: any[] = [];
  servicios: any[] = [];

  comercioSeleccionado: number | null = null;
  servicioSeleccionado: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  turnos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("cargooo");
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

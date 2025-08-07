import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarTurnos } from './generar-turnos';

describe('GenerarTurnos', () => {
  let component: GenerarTurnos;
  let fixture: ComponentFixture<GenerarTurnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarTurnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarTurnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

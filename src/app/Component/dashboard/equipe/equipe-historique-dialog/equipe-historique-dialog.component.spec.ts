import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeHistoriqueDialogComponent } from './equipe-historique-dialog.component';

describe('EquipeHistoriqueDialogComponent', () => {
  let component: EquipeHistoriqueDialogComponent;
  let fixture: ComponentFixture<EquipeHistoriqueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipeHistoriqueDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipeHistoriqueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

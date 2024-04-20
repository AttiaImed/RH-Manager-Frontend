import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEquipeDialogComponent } from './ajouter-equipe-dialog.component';

describe('AjouterEquipeDialogComponent', () => {
  let component: AjouterEquipeDialogComponent;
  let fixture: ComponentFixture<AjouterEquipeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterEquipeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterEquipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

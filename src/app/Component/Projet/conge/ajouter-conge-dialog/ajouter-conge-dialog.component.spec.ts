import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCongeDialogComponent } from './ajouter-conge-dialog.component';

describe('AjouterCongeDialogComponent', () => {
  let component: AjouterCongeDialogComponent;
  let fixture: ComponentFixture<AjouterCongeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterCongeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterCongeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

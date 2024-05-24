import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterUserTeamComponent } from './ajouter-user-team.component';

describe('AjouterUserTeamComponent', () => {
  let component: AjouterUserTeamComponent;
  let fixture: ComponentFixture<AjouterUserTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterUserTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterUserTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

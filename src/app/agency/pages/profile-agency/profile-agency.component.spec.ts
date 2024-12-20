import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAgencyComponent } from './profile-agency.component';

describe('ProfileAgencyComponent', () => {
  let component: ProfileAgencyComponent;
  let fixture: ComponentFixture<ProfileAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAgencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

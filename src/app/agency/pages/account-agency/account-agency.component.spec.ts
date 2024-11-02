import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAgencyComponent } from './account-agency.component';

describe('AccountAgencyComponent', () => {
  let component: AccountAgencyComponent;
  let fixture: ComponentFixture<AccountAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountAgencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

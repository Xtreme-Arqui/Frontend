import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAdventurerComponent } from './account-adventurer.component';

describe('AccountAdventurerComponent', () => {
  let component: AccountAdventurerComponent;
  let fixture: ComponentFixture<AccountAdventurerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountAdventurerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAdventurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

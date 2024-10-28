import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdventurerComponent } from './data-adventurer.component';

describe('DataAdventurerComponent', () => {
  let component: DataAdventurerComponent;
  let fixture: ComponentFixture<DataAdventurerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAdventurerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAdventurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

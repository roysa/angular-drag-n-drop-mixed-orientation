import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DNDListComponent } from './dndlist.component';

describe('DNDListComponent', () => {
  let component: DNDListComponent;
  let fixture: ComponentFixture<DNDListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DNDListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DNDListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaFCCComponent } from './prueba-fcc.component';

describe('PruebaFCCComponent', () => {
  let component: PruebaFCCComponent;
  let fixture: ComponentFixture<PruebaFCCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaFCCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaFCCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

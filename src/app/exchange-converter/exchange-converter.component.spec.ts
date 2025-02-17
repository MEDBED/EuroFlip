import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeConverterComponent } from './exchange-converter.component';

describe('ExchangeConverterComponent', () => {
  let component: ExchangeConverterComponent;
  let fixture: ComponentFixture<ExchangeConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

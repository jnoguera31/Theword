import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebaphotoPage } from './pruebaphoto.page';

describe('PruebaphotoPage', () => {
  let component: PruebaphotoPage;
  let fixture: ComponentFixture<PruebaphotoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PruebaphotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

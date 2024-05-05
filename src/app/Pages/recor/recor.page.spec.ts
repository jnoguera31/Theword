import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecorPage } from './recor.page';

describe('RecorPage', () => {
  let component: RecorPage;
  let fixture: ComponentFixture<RecorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

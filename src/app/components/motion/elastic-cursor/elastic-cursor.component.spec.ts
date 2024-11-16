import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticCursorComponent } from './elastic-cursor.component';

describe('ElasticCursorComponent', () => {
  let component: ElasticCursorComponent;
  let fixture: ComponentFixture<ElasticCursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElasticCursorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElasticCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

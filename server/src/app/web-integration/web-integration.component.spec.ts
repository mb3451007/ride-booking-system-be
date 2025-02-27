import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebIntegrationComponent } from './web-integration.component';

describe('WebIntegrationComponent', () => {
  let component: WebIntegrationComponent;
  let fixture: ComponentFixture<WebIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebIntegrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

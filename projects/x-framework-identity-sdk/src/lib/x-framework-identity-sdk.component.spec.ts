import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XFrameworkIdentitySdkComponent } from './x-framework-identity-sdk.component';

describe('XFrameworkIdentitySdkComponent', () => {
  let component: XFrameworkIdentitySdkComponent;
  let fixture: ComponentFixture<XFrameworkIdentitySdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XFrameworkIdentitySdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XFrameworkIdentitySdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { LoginComponent } from '@/app/auth/login/login.component';
import { AuthService } from '@/app/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {

    mockAuthService = jasmine.createSpyObj<AuthService>(['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form.value.username).toBeNull();
    expect(component.form.value.password).toBeNull();
  });

  it('should invalidate form if username is missing', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect(component.username.errors.required).toBe(true);
    });
    component.form.patchValue({
      username: '',
      password: 'pass123'
    });
  }));

  it('should invalidate form if password is missing', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect(component.password.errors.required).toBe(true);
    });
    component.form.patchValue({
      username: 'user123',
      password: ''
    });
  }));

  it('should not call login if form is invalid', async(() => {
    component.form.valueChanges.subscribe(() => {
      component.onSubmit();
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });
    component.form.patchValue({
      username: '',
      password: ''
    });
  }));

  it('should call login if form is valid', async(() => {
    mockAuthService.login.and.returnValue(of({}));
    component.form.valueChanges.subscribe(() => {
      component.onSubmit();
      expect(mockAuthService.login).toHaveBeenCalled();
    });
    component.form.patchValue({
      username: 'aaaa',
      password: 'aaaa'
    });
  }));

  it('should call login if form is valid and display error is credentials are invalid', async(() => {
    mockAuthService.login.and.returnValue(throwError({}));
    component.form.valueChanges.subscribe(() => {
      component.onSubmit();
      expect(component.form.errors.invalidLogin).toBe(true);
    });
    component.form.patchValue({
      username: 'aaaa',
      password: 'aaaa'
    });
  }));
});

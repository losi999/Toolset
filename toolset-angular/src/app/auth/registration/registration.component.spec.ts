import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { AuthService } from '../auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WarnableAbstractControl } from './registration.types';
import { of } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj<AuthService>(['registration']);

    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
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
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form.value.username).toBeNull();
    expect(component.form.value.password).toBeNull();
    expect(component.form.value.passwordConfirm).toBeNull();
    expect(component.form.value.displayName).toBeNull();
  });

  it('should invalidate form if username is missing', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect(component.username.errors.required).toBe(true);
    });
    component.form.patchValue({
      username: '',
    });
  }));

  it('should invalidate form if username is shorter than 4 characters', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect(component.username.errors.minlength).toBeTruthy();
    });
    component.form.patchValue({
      username: 'abc',
    });
  }));

  it('should invalidate form if password is missing', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect(component.password.errors.required).toBe(true);
    });
    component.form.patchValue({
      password: '',
    });
  }));

  it('should invalidate form if password is shorter than 4 characters', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect(component.password.errors.minlength).toBeTruthy();
    });
    component.form.patchValue({
      password: 'abc',
    });
  }));

  it('should warn with "weak" message if password is between 4 and 6 characters', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect((component.password as WarnableAbstractControl).warnings.strength).toBe(1);
      expect(component.form.valid).toBe(true);
    });
    component.form.patchValue({
      username: 'aaaa',
      password: 'abcde',
      passwordConfirm: 'abcde',
      displayName: 'Aaaa'
    });
  }));

  it('should warn with "medium" message if password is at least 6 characters but does not contain lowercase, uppercase letters and numbers', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect((component.password as WarnableAbstractControl).warnings.strength).toBe(2);
      expect(component.form.valid).toBe(true);
    });
    component.form.patchValue({
      username: 'aaaa',
      password: 'abcdef',
      passwordConfirm: 'abcdef',
      displayName: 'Aaaa'
    });
  }));

  it('should not have warning if password is at least 6 characters and contains at least one lowercase, uppercase letter and number', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect((component.password as WarnableAbstractControl).warnings).toBe(null);
      expect(component.form.valid).toBe(true);
    });
    component.form.patchValue({
      username: 'aaaa',
      password: 'abcdA1',
      passwordConfirm: 'abcdA1',
      displayName: 'Aaaa'
    });
  }));

  it('should invalidate form if display name is missing', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect(component.displayName.errors.required).toBe(true);
    });
    component.form.patchValue({
      displayName: '',
    });
  }));

  it('should invalidate form if passwords do not match', async(() => {
    component.form.valueChanges.subscribe(() => {
      expect(component.form.errors.passwordsNotMatch).toBe(true);
    });
    component.form.patchValue({
      password: 'aaaa',
      passwordConfirm: 'bbbb'
    });
  }));

  it('should not call registration if form is invalid', async(() => {
    component.form.valueChanges.subscribe(() => {
      component.onSubmit();
      expect(mockAuthService.registration).not.toHaveBeenCalled();
    });
    component.form.patchValue({
      username: ''
    });
  }));

  it('should call registration if form is valid', async(() => {
    mockAuthService.registration.and.returnValue(of({}));
    component.form.valueChanges.subscribe(() => {
      component.onSubmit();
      expect(mockAuthService.registration).toHaveBeenCalled();
    });
    component.form.patchValue({
      username: 'aaaa',
      password: 'abcdA1',
      passwordConfirm: 'abcdA1',
      displayName: 'Aaaa'
    });
  }));
});

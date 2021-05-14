import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const emailValidationMessages = {
    required: 'Please enter your email address.',
  };

  const passwordValidationMessages = {
    required: 'Please enter your password.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should have set pageTitle correctly', () => {
    fixture.detectChanges();

    expect(component.pageTitle).toBe('Login');
  });

  it('should have set loginForm correctly', () => {
    fixture.detectChanges();

    expect(component.loginForm.value).toEqual({
      email: '',
      password: '',
    });
  });

  describe('getEmailValidationMessage', () => {
    it('should return correct value', () => {
      fixture.detectChanges();

      component
        .getEmailValidationMessage()
        .subscribe((m) => expect(m).toBe(emailValidationMessages.required));
    });
  });

  describe('getPasswordValidationMessage', () => {
    it('should return correct value', () => {
      fixture.detectChanges();

      component
        .getPasswordValidationMessage()
        .subscribe((m) => expect(m).toBe(passwordValidationMessages.required));
    });
  });
});

describe('LoginComponent w/ template', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set the pageTitle in the template', () => {
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('h1'));
    expect(elements.length).toBe(1);
    expect(elements[0].nativeElement.textContent).toBe('Login');
  });
});

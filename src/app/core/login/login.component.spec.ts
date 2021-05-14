import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
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

    expect(component.pageTitle).toBe('Log in to Task App');
  });

  it('should have set loginForm correctly', () => {
    fixture.detectChanges();

    expect(component.loginForm.value).toEqual({
      email: '',
      password: '',
    });
  });

  it('should have set isSubmitted correctly', () => {
    fixture.detectChanges();

    expect(component.isSubmitted).toBeFalse();
  });

  describe('loginForm', () => {
    describe('emailControl', () => {
      it('should be required when empty', () => {
        fixture.detectChanges();

        const emailControl = component.loginForm.get('email');
        expect(emailControl?.value).toBe('');
        expect(emailControl?.hasError('required')).toBeTrue();
        expect(emailControl?.valid).toBeFalsy();
      });

      it('should not be required when there is a value', () => {
        fixture.detectChanges();

        const emailControl = component.loginForm.get('email');
        emailControl?.setValue('example@test.com');

        expect(emailControl?.hasError('required')).toBeFalse();
        expect(emailControl?.valid).toBeTrue();
      });

      it('should not be valid when value is not a valid email', () => {
        fixture.detectChanges();
        const emailControl = component.loginForm.get('email');

        emailControl?.setValue('invalid');

        expect(emailControl?.hasError('email')).toBeTrue();
        expect(emailControl?.valid).toBeFalse();
      });

      it('should be valid when value is a valid email', () => {
        fixture.detectChanges();
        const emailControl = component.loginForm.get('email');

        emailControl?.setValue('example@test.com');

        expect(emailControl?.hasError('email')).toBeFalse();
        expect(emailControl?.valid).toBeTrue();
      });
    });

    describe('passwordControl', () => {
      it('should be required when empty', () => {
        fixture.detectChanges();

        const passwordControl = component.loginForm.get('password');
        expect(passwordControl?.value).toBe('');
        expect(passwordControl?.hasError('required')).toBeTrue();
        expect(passwordControl?.valid).toBeFalse();
      });

      it('should not be required when there is a value', () => {
        fixture.detectChanges();

        const passwordControl = component.loginForm.get('password');
        passwordControl?.setValue('example@test.com');

        expect(passwordControl?.hasError('required')).toBeFalse();
        expect(passwordControl?.valid).toBeTrue();
      });
    });
  });

  describe('onSubmit', () => {
    it('should set isSubmitted to true', () => {
      fixture.detectChanges();

      component.onSubmit(component.loginForm);

      expect(component.isSubmitted).toBeTrue();
    });
  });

  describe('getEmailValidationMessage', () => {
    it('should return correct value to start', () => {
      fixture.detectChanges();

      component.getEmailValidationMessage().subscribe((m) => {
        expect(m).toBe(emailValidationMessages.required);
      });
    });

    it(`should return correct value when email control on the loginForm is
      required`, fakeAsync(() => {
      const emailControl = component.loginForm.get('email');
      fixture.detectChanges();
      emailControl?.setValue('');
      tick(1000);

      component.getEmailValidationMessage().subscribe((m) => {
        expect(m).toBe(emailValidationMessages.required);
      });

      expect(emailControl?.hasError('required')).toBeTrue();
      expect(emailControl?.valid).toBeFalse();
    }));

    it(`should return correct value when email control on the loginForm is
      valid`, fakeAsync(() => {
      const emailControl = component.loginForm.get('email');
      fixture.detectChanges();
      emailControl?.setValue('example@test.com');
      tick(1000);

      component.getEmailValidationMessage().subscribe((m) => {
        expect(m).toBe('');
      });

      expect(emailControl?.hasError('required')).toBeFalse();
      expect(emailControl?.hasError('email')).toBeFalse();
      expect(emailControl?.valid).toBeTrue();
    }));
  });

  describe('getPasswordValidationMessage', () => {
    it('should return correct value to start', () => {
      fixture.detectChanges();

      component
        .getPasswordValidationMessage()
        .subscribe((m) => expect(m).toBe(passwordValidationMessages.required));
    });

    it(`should return correct value when password control on the loginForm is
      required`, fakeAsync(() => {
      const passwordControl = component.loginForm.get('password');
      fixture.detectChanges();
      passwordControl?.setValue('');
      tick(1000);

      component.getPasswordValidationMessage().subscribe((m) => {
        expect(m).toBe(passwordValidationMessages.required);
      });

      expect(passwordControl?.hasError('required')).toBeTrue();
      expect(passwordControl?.valid).toBeFalse();
    }));

    it(`should return correct value when password control on the loginForm is
      valid`, fakeAsync(() => {
      const passwordControl = component.loginForm.get('password');
      fixture.detectChanges();
      passwordControl?.setValue('value');
      tick(1000);

      component.getPasswordValidationMessage().subscribe((m) => {
        expect(m).toBe('');
      });

      expect(passwordControl?.hasError('required')).toBeFalse();
      expect(passwordControl?.valid).toBeTrue();
    }));
  });
});

describe('LoginComponent w/ template', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const emailValidationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
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

  it('should set pageTitle in the template', () => {
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('h2'));
    expect(elements.length).toBe(1);
    expect(elements[0].nativeElement.textContent).toBe('Log in to Task App');
  });

  it(`should set email control on loginForm correctly in the
    template`, () => {
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('#emailControl'));
    expect(inputs.length).toBe(1);
    expect(inputs[0].nativeElement.autocomplete).toBe('email');
    expect(inputs[0].nativeElement.type).toBe('email');
    expect(inputs[0].nativeElement.placeholder).toBe('name@example.com');
    expect(inputs[0].nativeElement.value).toBe('');
  });

  it(`should set email control value on loginForm when email input
    value changes`, () => {
    const email = 'example@test.com';
    const emailControl = component.loginForm.get('email');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('#emailControl'));

    input.nativeElement.value = email;
    input.nativeElement.dispatchEvent(new Event('input'));

    expect(emailControl?.value).toBe(email);
  });

  it(`should set email input classes correctly in the template when
    email control on loginForm is valid`, fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    fixture.detectChanges();

    emailControl?.setValue('example@test.com');
    tick(1000);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#emailControl'));
    expect(emailControl?.valid).toBeTrue();
    expect(input.classes).toEqual({
      'form-control': true,
      'is-valid': true,
      'ng-untouched': true,
      'ng-pristine': true,
      'ng-valid': true,
    });
  }));

  it(`should set email input classes correctly in the template when
    email control on loginForm is required and isSubmitted is
    true`, fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    component.isSubmitted = true;
    fixture.detectChanges();

    emailControl?.setValue('');
    tick(1000);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#emailControl'));
    expect(emailControl?.hasError('required')).toBeTrue();
    expect(input.classes).toEqual({
      'form-control': true,
      'is-invalid': true,
      'ng-untouched': true,
      'ng-pristine': true,
      'ng-invalid': true,
    });
  }));

  it(`should set email input classes correctly in the template when
    email control on loginForm is required and isSubmitted is
    false`, fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    component.isSubmitted = false;
    fixture.detectChanges();

    emailControl?.setValue('');
    tick(1000);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#emailControl'));
    expect(emailControl?.hasError('required')).toBeTrue();
    expect(input.classes).toEqual({
      'form-control': true,
      'ng-untouched': true,
      'ng-pristine': true,
      'ng-invalid': true,
    });
  }));

  it(`should set email input classes correctly in the template when
    email control value on loginForm is an invalid email and isSubmitted is
    true`, fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    component.isSubmitted = true;
    fixture.detectChanges();

    emailControl?.setValue('invalid');
    tick(1000);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#emailControl'));
    expect(emailControl?.hasError('email')).toBeTrue();
    expect(input.classes).toEqual({
      'form-control': true,
      'is-invalid': true,
      'ng-untouched': true,
      'ng-pristine': true,
      'ng-invalid': true,
    });
  }));

  it(`should set password control on loginForm correctly in the
    template`, () => {
    fixture.detectChanges();
    const inputs = fixture.debugElement.queryAll(By.css('#passwordControl'));

    expect(inputs.length).toBe(1);
    expect(inputs[0].nativeElement.type).toBe('password');
    expect(inputs[0].nativeElement.placeholder).toBe('Password');
    expect(inputs[0].nativeElement.value).toBe('');
  });

  it(`should set password control value on loginForm when password input
    value changes`, () => {
    const password = 'Example1234';
    const passwordControl = component.loginForm.get('password');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('#passwordControl'));

    input.nativeElement.value = password;
    input.nativeElement.dispatchEvent(new Event('input'));

    expect(passwordControl?.value).toBe(password);
  });

  it(`should set password input classes correctly in the template when
    password control on loginForm is valid`, fakeAsync(() => {
    const passwordControl = component.loginForm.get('password');
    fixture.detectChanges();
    passwordControl?.setValue('Example');
    tick(1000);

    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#passwordControl'));
    expect(passwordControl?.valid).toBeTrue();
    expect(input.classes).toEqual({
      'form-control': true,
      'is-valid': true,
      'ng-untouched': true,
      'ng-pristine': true,
      'ng-valid': true,
    });
  }));

  it(`should set password input classes correctly in the template when
    password control on loginForm is required and isSubmitted is
    true`, fakeAsync(() => {
    const passwordControl = component.loginForm.get('password');
    component.isSubmitted = true;
    fixture.detectChanges();

    passwordControl?.setValue('');
    tick(1000);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#passwordControl'));
    expect(passwordControl?.hasError('required')).toBeTrue();
    expect(input.classes).toEqual({
      'form-control': true,
      'is-invalid': true,
      'ng-untouched': true,
      'ng-pristine': true,
      'ng-invalid': true,
    });
  }));

  it(`should set password input classes correctly in the template when
    password control on loginForm is required and submitted is
    false`, fakeAsync(() => {
    const passwordControl = component.loginForm.get('password');
    component.isSubmitted = false;
    fixture.detectChanges();

    passwordControl?.setValue('');
    tick(1000);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#passwordControl'));
    expect(passwordControl?.hasError('required')).toBeTrue();
    expect(input.classes).toEqual({
      'form-control': true,
      'ng-untouched': true,
      'ng-pristine': true,
      'ng-invalid': true,
    });
  }));

  it(`should set validation message correctly in the template when email
    control on loginForm is valid`, fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    fixture.detectChanges();

    emailControl?.setValue('example@test.com');
    tick(1000);
    fixture.detectChanges();

    const element = fixture.debugElement.queryAll(
      By.css('.invalid-tooltip span')
    )[0];
    expect(emailControl?.valid).toBeTrue();
    expect(element.nativeElement.textContent).toBe('');
  }));

  it(`should set validation message correctly in the template when email
    control on loginForm is required`, fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    fixture.detectChanges();

    emailControl?.setValue('');
    tick(1000);
    fixture.detectChanges();

    const element = fixture.debugElement.queryAll(
      By.css('.invalid-tooltip span')
    )[0];
    expect(emailControl?.hasError('required')).toBeTrue();
    expect(element.nativeElement.textContent).toBe(
      emailValidationMessages.required
    );
  }));

  it(`should set validation message correctly in the template when email
    control on loginForm has email error`, fakeAsync(() => {
    const emailControl = component.loginForm.get('email');
    fixture.detectChanges();

    emailControl?.setValue('invalid');
    tick(1000);
    fixture.detectChanges();

    const element = fixture.debugElement.queryAll(
      By.css('.invalid-tooltip span')
    )[0];
    expect(emailControl?.hasError('email')).toBeTrue();
    expect(element.nativeElement.textContent).toBe(
      emailValidationMessages.email
    );
  }));

  it(`should set validation message correctly in the template when password
    control on loginForm is valid`, fakeAsync(() => {
    const passwordControl = component.loginForm.get('password');
    fixture.detectChanges();

    passwordControl?.setValue('password');
    tick(1000);
    fixture.detectChanges();

    const element = fixture.debugElement.queryAll(
      By.css('.invalid-tooltip span')
    )[1];
    expect(passwordControl?.valid).toBeTrue();
    expect(element.nativeElement.textContent).toBe('');
  }));

  it(`should set validation message correctly in the template when password
    control on loginForm is required`, fakeAsync(() => {
    const passwordControl = component.loginForm.get('password');
    fixture.detectChanges();

    passwordControl?.setValue('');
    tick(1000);
    fixture.detectChanges();

    const element = fixture.debugElement.queryAll(
      By.css('.invalid-tooltip span')
    )[1];
    expect(passwordControl?.hasError('required')).toBeTrue();
    expect(element.nativeElement.textContent).toBe(
      passwordValidationMessages.required
    );
  }));
});

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly pageTitle = 'Login';
  readonly loginForm: FormGroup = this.buildForm();
  isSubmitted = false;

  private readonly subscriptions: Subscription[] = [];
  private readonly emailValidationMessages: any = {
    required: 'Please enter your email address.',
  };
  private readonly passwordValidationMessages: any = {
    required: 'Please enter your password.',
  };
  private readonly emailMessageSubject = new BehaviorSubject<string>(
    this.emailValidationMessages.required
  );
  private readonly passwordMessageSubject = new BehaviorSubject<string>(
    this.passwordValidationMessages.required
  );

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    const emailControl = this.loginForm.get('email');
    if (emailControl) this.saveSub(this.createSub(emailControl, 'email'));
    const passwordControl = this.loginForm.get('password');
    if (passwordControl)
      this.saveSub(this.createSub(passwordControl, 'password'));
  }

  onSubmit(form: FormGroup): void {
    if (!this.isSubmitted) this.isSubmitted = true;
  }

  getEmailValidationMessage(): Observable<string> {
    return this.emailMessageSubject.asObservable();
  }

  getPasswordValidationMessage(): Observable<string> {
    return this.passwordMessageSubject.asObservable();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private createSub(c: AbstractControl, name: string): Subscription {
    return c.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => this.setMessage(c, name));
  }

  private saveSub(s: Subscription): void {
    this.subscriptions.push(s);
  }

  private setMessage(c: AbstractControl, name: string): void {
    let message = '';
    switch (name) {
      case 'email':
        if (c.errors) {
          message = Object.keys(c.errors)
            .map((key) => this.emailValidationMessages[key])
            .join(' ');
        }
        this.emailMessageSubject.next(message);
        break;
      case 'password':
        if (c.errors) {
          message = Object.keys(c.errors)
            .map((key) => this.passwordValidationMessages[key])
            .join(' ');
        }
        this.passwordMessageSubject.next(message);
        break;
      default:
        console.error(`${name} did not match any names.`);
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

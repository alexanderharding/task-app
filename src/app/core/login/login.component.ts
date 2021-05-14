import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly pageTitle = 'Login';
  readonly loginForm: FormGroup = this.buildForm();
  isSubmitted = false;

  private readonly subscriptions: Subscription[] = [];
  private readonly emailValidationMessages = {
    required: 'Please enter your email address.',
  };
  private readonly passwordValidationMessages = {
    required: 'Please enter your password.',
  };
  private readonly emailMessageSubject = new BehaviorSubject<string>(
    this.emailValidationMessages.required
  );
  private readonly passwordMessageSubject = new BehaviorSubject<string>(
    this.passwordValidationMessages.required
  );

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {}

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

  private createSubscription(c: AbstractControl): Subscription {
    return c.valueChanges.subscribe();
  }
}

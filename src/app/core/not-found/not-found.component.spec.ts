import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let mockTitle: Title;

  beforeEach(async () => {
    mockTitle = jasmine.createSpyObj(['setTitle']);
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [NotFoundComponent],
      providers: [{ provide: Title, useValue: mockTitle }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have set pageTitle correctly', () => {
    expect(component.pageTitle).toBe('Page Not Found');
  });

  it('should have set errorMessage correctly', () => {
    expect(component.erroMessage).toBe(
      'Oops! Something went wrong. Please check the URL and try again.'
    );
  });

  it('should have called setTitle method on Title with correct value', () => {
    fixture.detectChanges();

    expect(mockTitle.setTitle).toHaveBeenCalledTimes(1);
    expect(mockTitle.setTitle).toHaveBeenCalledWith(component.pageTitle);
  });
});

describe('NotFoundComponent w/ template', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pageTitle in the template', () => {
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('h2'));
    expect(elements.length).toBe(1);
    expect(elements[0].nativeElement.textContent).toBe('Page Not Found');
  });

  it('should set erroMessage in the template', () => {
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('ngb-alert'));

    expect(elements.length).toBe(1);
    expect(elements[0].nativeElement.textContent).toBe(component.erroMessage);
  });
});

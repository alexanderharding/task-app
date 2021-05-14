import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set pageTitle correctly', () => {
    fixture.detectChanges();

    expect(component.pageTitle).toBe('');
  });
});

describe('NavbarComponent w/ template', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const TITLE = 'task app';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set the pageTitle in the template', () => {
    component.pageTitle = TITLE;

    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('nav a'));
    expect(elements.length).toBe(1);
    expect(elements[0].nativeElement.textContent).toBe(TITLE);
  });
});

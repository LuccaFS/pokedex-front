/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { PokeCardComponent } from './poke-card.component';
import { HubFacade } from '../../state/hub.facade';

describe('PokeCardComponent', () => {
  let component: PokeCardComponent;
  let fixture: ComponentFixture<PokeCardComponent>;

  let hubFacade: HubFacade;
  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PokeCardComponent],
      providers: [HubFacade, provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    hubFacade = TestBed.inject(HubFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

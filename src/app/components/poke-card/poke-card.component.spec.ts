/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PokeCardComponent } from './poke-card.component';
import { HubFacade } from 'src/app/state/hub.facade';
import { Store } from '@ngrx/store';

describe('PokeCardComponent', () => {
  let component: PokeCardComponent;
  let fixture: ComponentFixture<PokeCardComponent>;

  let hubFacade: HubFacade;
  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokeCardComponent],
      providers: [HubFacade, provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PokemonComponent } from './pokemon.component';
import { HubFacade } from 'src/app/state/hub.facade';
import { Store } from '@ngrx/store';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  let hubFacade: HubFacade;
  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      providers: [HubFacade, provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);
    hubFacade = TestBed.inject(HubFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

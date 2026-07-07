import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { PokemonComponent } from './pokemon.component';
import { HubFacade } from '../../state/hub.facade';
import { Store } from '@ngrx/store';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  let hubFacade: HubFacade;
  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      providers: [HubFacade, provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
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

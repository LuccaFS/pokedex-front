import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ShinyComponent } from './shiny.component';
import { HubFacade } from 'src/app/state/hub.facade';
import { PokedexFacade } from 'src/app/state/pokedex/pokedex.facade';

describe('ShinyComponent', () => {
  let component: ShinyComponent;
  let fixture: ComponentFixture<ShinyComponent>;

  let hubFacade: HubFacade;
  let pokeFacade: PokedexFacade;
  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShinyComponent],
      providers: [HubFacade, PokedexFacade, provideMockStore({ initialState })],
    }).compileComponents();

    hubFacade = TestBed.inject(HubFacade);
    pokeFacade = TestBed.inject(PokedexFacade);
    fixture = TestBed.createComponent(ShinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

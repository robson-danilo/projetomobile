import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonRatingComponent } from './ion-rating.component';

describe('IonRatingComponent', () => {
  let component: IonRatingComponent;
  let fixture: ComponentFixture<IonRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonRatingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

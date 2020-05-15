import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TongquatPage } from './tongquat.page';

describe('TongquatPage', () => {
  let component: TongquatPage;
  let fixture: ComponentFixture<TongquatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TongquatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TongquatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

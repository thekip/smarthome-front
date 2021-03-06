import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { BackendService } from './common/backend/backend.service';
import { AcUnitProvider } from './common/ac-unit.provider';
import { ZONES } from './config';
import { ZoneModel } from './zones/zone.model';
import { ZonesStoreProvider } from './zones/zones-store.provider';

import * as debounce from 'lodash/debounce';

import '../styles.scss';

@Component({
  selector: 'app',
  providers: [
    ZonesStoreProvider,
    BackendService,
    AcUnitProvider,
  ],
  encapsulation: ViewEncapsulation.None,
  template: '<home></home>'
})
export class AppComponent implements OnInit {

  constructor(private acUnit: AcUnitProvider,
              private backend: BackendService,
              private zonesStore: ZonesStoreProvider) {
  }

  public ngOnInit() {
    this.buildZones();
    this.bindBackendEvents();
  }

  private buildZones() {
    ZONES.map((zoneConfig) => {
      const model = new ZoneModel(zoneConfig);
      this.zonesStore.add(model);

      model.onChanged.bind(debounce(() => {
        this.backend.changeZone(model.id, model.getDto());
      }, 300));
    });
  }

  private bindBackendEvents() {
    this.backend.onData.bind((data) => {
      console.log('onData event', data);

      data.zones.forEach((zoneData) => {
        this.updateZoneFromBackend(zoneData);
      });

      this.acUnit.setData(data.acUnit);
    });

    this.backend.onAcUnitChanged.bind((data) => {
      console.log('AcUnitChanged event');
      this.acUnit.setData(data);
    });

    this.backend.onZoneChanged.bind((zoneData) => {
      console.log('zonechanged event', zoneData);
      this.updateZoneFromBackend(zoneData);
    });
  }

  private updateZoneFromBackend(zoneData) {
    const zone = this.zonesStore.getById(zoneData.id);
    zone.setBackendData(zoneData);
  }
}

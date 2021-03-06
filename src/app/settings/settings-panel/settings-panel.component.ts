import { Component } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Settings } from '../../interfaces';
import { SettingsOptionsFeatureModel } from '../settings-feature.model';
import { SettingsToggleFeatureModel } from '../settings-feature.model';

@Component({
  selector: 'settings-panel',
  templateUrl: './settings-panel.html',
  styleUrls: ['./settings-panel.scss'],
})

export class SettingsPanelComponent {
  selectedFeature: SettingsOptionsFeatureModel;

  constructor(private settings: SettingsService) {}

  get features() {
    return this.settings.features;
  }

  toggleOptions(feature: SettingsOptionsFeatureModel) {
    // if the same feature, collapse bar (clear options)
    this.selectedFeature = this.selectedFeature === feature ? null : feature;
    this.settings.onChange.trigger();
  }

  toggleFeature(feature: SettingsToggleFeatureModel) {
    this.hideOptionsPanel();
    feature.toggle();

    this.settings.onChange.trigger();
  }

  hideOptionsPanel() {
    this.selectedFeature = null;
  }

  selectOption(option: Settings.IFeatureOption) {
    this.selectedFeature.setSelectedOption(option);
    this.hideOptionsPanel();
  }
}

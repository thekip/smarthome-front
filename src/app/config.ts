import { ZoneConfig } from './zones/index';
import { Settings } from './interfaces';
import { SettingsExhaustFanAdapter } from './settings/adapters/settings-exhaust-fan-adapter';
import { SettingsIntakeFanAdapter } from './settings/adapters/settings-intake-fan-adapter';
import { SettingsAcModeAdapter } from './settings/adapters/settings-ac-mode-adpater';
import { Backend } from './common/backend.provider';

export const BACKEND = {
  host: process.env.ENV === 'production' ? undefined : 'http://tima23.asuscomm.com:3000/',
};

export const TEMP_STEP: number = 0.5;
export const ZONES: ZoneConfig[] = [
  {
    position: {
      left: '6%',
      top: '15%'
    },
    id: 0,
    title: 'Спальня Тима'
  },
  {
    position: {
      right: '5%',
      top: '15%'
    },
    id: 1,
    title: 'Спальня родители'
  },
  {
    position: {
      right: '5%',
      bottom: '20%'
    },
    id: 2,
    title: 'Кабинет'
  },
];

export const SETTINGS_FEATURES: Settings.IFeatureConfig[] = [
  {
    key: 'acMode',
    inStatusBar: true,
    type: Settings.IFeatureType.options,
    adapter: SettingsAcModeAdapter,
    options: [
      {
        icon: 'snowflake',
        value: Backend.AcUnitMode.COOL,
        name: 'Охлаждение',
      },
      {
        icon: 'sun',
        value: Backend.AcUnitMode.HEAT,
        name: 'Обогрев'
      },
      {
        icon: 'water-drop',
        value: Backend.AcUnitMode.DRY,
        name: 'Осушение'
      },
    ],
  },
  {
    icon: 'hood',
    inStatusBar: true,
    key: 'hood',
    name: 'Вытяжка',
    adapter: SettingsExhaustFanAdapter,
    type: Settings.IFeatureType.toggle,
  },
  {
    icon: 'input-air',
    inStatusBar: true,
    key: 'inputAir',
    name: 'Приток',
    adapter: SettingsIntakeFanAdapter,
    type: Settings.IFeatureType.toggle,
  },
];

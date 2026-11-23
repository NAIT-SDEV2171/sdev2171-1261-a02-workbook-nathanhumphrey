import * as Device from 'expo-device';
import { Platform } from 'react-native';

const DEVICE_LAN_BASE_URL = 'http://192.168.1.50:3000';

export function getApiBaseUrl() {
  if (Platform.OS === 'android') {
    return Device.isDevice ? DEVICE_LAN_BASE_URL : 'http://10.0.2.2:3000';
  }

  if (Platform.OS === 'ios') {
    return Device.isDevice ? DEVICE_LAN_BASE_URL : 'http://127.0.0.1:3000';
  }

  return DEVICE_LAN_BASE_URL;
}

export const apiBaseUrlNotes = {
  androidEmulator: 'Android emulator uses 10.0.2.2 for your computer localhost.',
  iosSimulator: 'iOS simulator can use 127.0.0.1 for your computer localhost.',
  physicalDevice:
    'Physical devices need your computer LAN IP instead of localhost. Replace DEVICE_LAN_BASE_URL before testing on a phone.',
};

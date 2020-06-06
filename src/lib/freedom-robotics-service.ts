import fetch from 'isomorphic-unfetch';

// The following configuration will pull in values from the secret store.
// This prevents keys from being stored in plain text within version control
export const freedomRoboticsConfig = {
  token: process.env.NEXT_PUBLIC_FR_TOKEN,
  secret: process.env.NEXT_PUBLIC_FR_SECRET,
  accountId: process.env.NEXT_PUBLIC_FR_ACCOUNT_ID,
  deviceId: process.env.NEXT_PUBLIC_FR_DEVICE_ID,
  baseURL: 'https://api.freedomrobotics.ai'
};

export const FRDeviceFetcher = async () => {
  const apiResponse = await fetch(
    `${freedomRoboticsConfig.baseURL}/accounts/${freedomRoboticsConfig.accountId}/devices/${freedomRoboticsConfig.deviceId}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        mc_token: freedomRoboticsConfig.token,
        mc_secret: freedomRoboticsConfig.secret
      })
    }
  );
  const {status, ok} = apiResponse;
  const apiBodyResponse = await apiResponse.json();

  // Happy path, all is well and we should issue the API's response to the requesting function.
  if (status === 200 && ok === true) {
    return apiBodyResponse;
  } else {
    throw new Error('Error occurred with request to the device info API');
  }
};

export const FRDeviceDataFetcher = async () => {
  const apiResponse = await fetch(
    `${freedomRoboticsConfig.baseURL}/accounts/${freedomRoboticsConfig.accountId}/devices/${freedomRoboticsConfig.deviceId}/data`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        mc_token: freedomRoboticsConfig.token,
        mc_secret: freedomRoboticsConfig.secret
      })
    }
  );
  const {status, ok} = apiResponse;
  const apiBodyResponse = await apiResponse.json();

  // Happy path, all is well and we should issue the API's response to the requesting function.
  if (status === 200 && ok === true) {
    return apiBodyResponse;
  } else {
    throw new Error('Error occurred with request to the device info API');
  }
};

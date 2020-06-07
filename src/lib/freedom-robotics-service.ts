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
  const deviceURL = `${freedomRoboticsConfig.baseURL}/accounts/${freedomRoboticsConfig.accountId}/devices/${freedomRoboticsConfig.deviceId}`;

  const apiResponse = await fetch(deviceURL, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      mc_token: freedomRoboticsConfig.token,
      mc_secret: freedomRoboticsConfig.secret
    })
  });
  const {status, ok} = apiResponse;
  const apiBodyResponse = await apiResponse.json();

  // Happy path, all is well and we should issue the API's response to the requesting function.
  if (status === 200 && ok === true) {
    return apiBodyResponse;
  } else {
    throw new Error('Error occurred with request to the device info API');
  }
};

// This will return the values from the last 1 min
export const FRDeviceDataFetcher = async () => {
  const deviceDataURL = `${freedomRoboticsConfig.baseURL}/accounts/${freedomRoboticsConfig.accountId}/devices/${freedomRoboticsConfig.deviceId}/data`;

  const apiResponse = await fetch(deviceDataURL, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      mc_token: freedomRoboticsConfig.token,
      mc_secret: freedomRoboticsConfig.secret
    })
  });
  const {status, ok} = apiResponse;
  const apiBodyResponse = await apiResponse.json();

  // Happy path, all is well and we should issue the API's response to the requesting function.
  if (status === 200 && ok === true) {
    return apiBodyResponse;
  } else {
    throw new Error('Error occurred with request to the device info API');
  }
};

// This will take a given start time and end time, ** in terms of UTC seconds ** and return the data for the given window
// Defaults to a 2 min timespan 10:00am - 10:02am during the day of 6/6/2020
export const FRDeviceDataWindowFetcher = async (
  startTime = '1591437600',
  endTime = '1591437660'
) => {
  const deviceDataURL = `${freedomRoboticsConfig.baseURL}/accounts/${freedomRoboticsConfig.accountId}/devices/${freedomRoboticsConfig.deviceId}/data?utc_start=${startTime}&utc_end=${endTime}`;

  const apiResponse = await fetch(deviceDataURL, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      mc_token: freedomRoboticsConfig.token,
      mc_secret: freedomRoboticsConfig.secret
    })
  });
  const {status, ok} = apiResponse;
  const apiBodyResponse = await apiResponse.json();

  // Happy path, all is well and we should issue the API's response to the requesting function.
  if (status === 200 && ok === true) {
    return apiBodyResponse;
  } else {
    throw new Error('Error occurred with request to the device info API');
  }
};

// The Image fetcher appears to work, however requesting the S3 image seems to require some specific cookie headers.
export const FRDeviceImageFetcher = async () => {
  const deviceDataURL = `${freedomRoboticsConfig.baseURL}/accounts/${freedomRoboticsConfig.accountId}/devices/${freedomRoboticsConfig.deviceId}/videos?pre_signed=true`;

  const apiResponse = await fetch(deviceDataURL, {
    method: 'GET',
    headers: new Headers({
      mc_token: freedomRoboticsConfig.token,
      mc_secret: freedomRoboticsConfig.secret
    })
  });
  const {status, ok} = apiResponse;
  const apiBodyResponse = await apiResponse.json();

  // Happy path, all is well and we should issue the API's response to the requesting function.
  if (status === 200 && ok === true) {
    return apiBodyResponse;
  } else {
    throw new Error('Error occurred with request to the device info API');
  }
};

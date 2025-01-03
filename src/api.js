import mockData from './mock-data-complete';

/**
 *
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 * @param events
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  return [...new Set(extractedLocations)];
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  return await response.json();
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};
/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData.data.items;
  }

  // console.log("Navigator online: " + navigator.onLine)
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();
  // console.log("Token: " + token);

  if (token) {
    removeQuery();
    const url = "https://34yjgoxhc3.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
    // console.log("Complete URL: " + url);
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result) {
        // console.log("Saving events to localstorage")
        localStorage.setItem("lastEvents", JSON.stringify(result.data.items));
        return result.data.items;
      } else return null;
    } catch (error) {
      console.error("Caught error: " + error);
      return null;
    }
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));


  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://34yjgoxhc3.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const {authUrl} = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);

    const response = await fetch('https://34yjgoxhc3.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode);
    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`)
      console.error(`HTTP error! status: ${response.status}`)
    }
    const {access_token} = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
}
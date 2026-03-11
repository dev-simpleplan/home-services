declare global {
  interface Window {
    google?: any;
    __homeServicesGoogleMapsPromise?: Promise<any>;
    __initHomeServicesGoogleMaps?: () => void;
  }
}

const GOOGLE_MAPS_SCRIPT_ID = "home-services-google-maps";

export const loadGoogleMaps = (apiKey?: string) => {
  if (!apiKey) {
    return Promise.resolve(null);
  }

  if (window.google?.maps?.places) {
    return Promise.resolve(window.google);
  }

  if (window.__homeServicesGoogleMapsPromise) {
    return window.__homeServicesGoogleMapsPromise;
  }

  window.__homeServicesGoogleMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google));
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Google Maps")));
      return;
    }

    window.__initHomeServicesGoogleMaps = () => resolve(window.google);

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=__initHomeServicesGoogleMaps`;
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return window.__homeServicesGoogleMapsPromise;
};

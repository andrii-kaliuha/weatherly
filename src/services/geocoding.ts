export type CityCoordinates = {
  latitude: number;
  longitude: number;
  local_names: Record<string, string>;
};

export async function getCityCoordinates(city: string): Promise<CityCoordinates> {
  const response = await fetch(`/api/weather?endpoint=geocoding&q=${encodeURIComponent(city)}&limit=1`);

  if (!response.ok) throw new Error("network_error");
  const coordinates = await response.json();
  if (!coordinates.length) throw new Error("city_not_found");
  const { lat: latitude, lon: longitude, local_names } = coordinates[0];

  return { latitude, longitude, local_names };
}

export async function getCityNameByCoordinates(lat: number, lon: number): Promise<Record<string, string>> {
  const response = await fetch(`/api/weather?endpoint=reverse&lat=${lat}&lon=${lon}&limit=1`);

  if (!response.ok) throw new Error("network_error");
  const data = await response.json();
  if (!data.length) throw new Error("city_not_found");

  return data[0].local_names;
}

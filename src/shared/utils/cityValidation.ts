export type CityError = "empty_city" | "invalid_city_symbols" | "invalid_city_numbers" | "too_long_city" | null;

export const cityValidation = (city: string): { isValid: boolean; error: CityError } => {
  const trimmedCity = city.trim();

  if (!trimmedCity) return { isValid: false, error: "empty_city" };

  if (trimmedCity.length > 32) return { isValid: false, error: "too_long_city" };

  if (/\d/.test(trimmedCity)) return { isValid: false, error: "invalid_city_numbers" };

  const validCityPattern = /^[a-zA-Zа-яА-ЯіЇїІєЄґҐ'\s-]+$/;
  if (!validCityPattern.test(trimmedCity)) return { isValid: false, error: "invalid_city_symbols" };

  return { isValid: true, error: null };
};

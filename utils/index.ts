import { CarProps, FilterProps } from "@/types";

export async function fetchCars({
  model,
  manufacturer,
  year,
  fuel,
  limit,
}: FilterProps) {
  const headers = {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Build the query string dynamically
  const queryParams = new URLSearchParams();

  // Only add non-empty string parameters (trim to remove whitespace)
  if (manufacturer.trim() !== "")
    queryParams.append("make", manufacturer.trim());
  if (model.trim() !== "") queryParams.append("model", model.trim());
  if (fuel.trim() !== "") queryParams.append("fuel_type", fuel.trim());

  // For numeric values, you might want to only include positive numbers
  if (year > 0) queryParams.append("year", year.toString());
  if (limit > 0) queryParams.append("limit", limit.toString());

  const baseUrl = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${queryParams.toString()}`;

  try {
    const response = await fetch(baseUrl, { headers });
    const result = await response.json();

    console.log(baseUrl);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

// API to remove image background and Fetch Car Image are not used in the project

// async function removeImageBackground(imageUrl: string) {
//     const url = 'https://cars-image-background-removal.p.rapidapi.com/v1/results?mode=fg-image';
//     const options = {
//       method: 'POST',
//       headers: {
//         "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_IMAGE_REMOVAL_API_KEY as string,
//         'x-rapidapi-host': 'cars-image-background-removal.p.rapidapi.com',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: new URLSearchParams({
//         url: imageUrl
//       })
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.text();
//       console.log(result);

//       return result;
//     } catch (error) {
//       console.error(error);
//     }
// }

// export async function fetchCarImage(make: string) {
//   const headers = {
//     "x-rapidapi-key": process.env.NEXT_PUBLIC__RAPID_API_IMAGE_API_KEY as string,
//     "x-rapidapi-host": "cars-database-with-image.p.rapidapi.com",
//   };
//   const baseUrl =
//     `https://cars-database-with-image.p.rapidapi.com/api/search?q=${make}&page=1`;

//   try {
//     const response = await fetch(baseUrl, { headers });
//     const result = await response.json();
//     console.log(result.results);

//     return result?.results[0]?.image;
//   } catch (error) {
//     console.error(error);
//   }
// }

// Funtion to generate car image URL is not used in the project

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;
  const apiKey = process.env.NEXT_PUBLIC_IMAGIN_API_KEY as string;
  url.searchParams.append("customer", apiKey);

  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split("")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("model", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (title: string, value: string) => {
  // Create a new URLSearchParams object using the current URL search parameters
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(title, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};

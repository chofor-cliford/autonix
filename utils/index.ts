import { CarProps } from "@/types";

export async function fetchCars() {
  const headers = {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const baseUrl =
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=carrera";

  try {
    const response = await fetch(baseUrl, { headers });
    const result = await response.json();

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



async function removeImageBackground(imageUrl: string) {
    const url = 'https://cars-image-background-removal.p.rapidapi.com/v1/results?mode=fg-image';
    const options = {
      method: 'POST',
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_IMAGE_REMOVAL_API_KEY as string,
        'x-rapidapi-host': 'cars-image-background-removal.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        url: imageUrl
      })
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);

      return result;
    } catch (error) {
      console.error(error);
    }
}


export async function fetchCarImage(make: string) {
  const headers = {
    "x-rapidapi-key": process.env.NEXT_PUBLIC__RAPID_API_IMAGE_API_KEY as string,
    "x-rapidapi-host": "cars-database-with-image.p.rapidapi.com",
  };
  const baseUrl =
    `https://cars-database-with-image.p.rapidapi.com/api/search?q=${make}&page=1`;

  try {
    const response = await fetch(baseUrl, { headers });
    const result = await response.json();
    console.log(result.results);

    return result?.results[0]?.image;
  } catch (error) {
    console.error(error);
  }
}


export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;
  const apiKey = process.env.NEXT_PUBLIC_IMAGIN_API_KEY as string;
  url.searchParams.append("customer", "hrjavascript-mastery");

  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split("")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("model", `${angle}`);

  return `${url}`;
};

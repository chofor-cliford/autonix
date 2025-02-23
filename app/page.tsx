import { CarCard, CustomerFilter, Hero, SearchBar } from "@/components";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps } from "@/types";
import { fetchCars } from "@/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    model?: string;
    manufacturer?: string;
    year?: number;
    fuel?: string;
    limit?: number;
  };
}) {
  const allCars = await fetchCars({
    model: searchParams.model || "",
    manufacturer: searchParams.manufacturer || "Toyota",
    year: searchParams.year || 0,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 0,
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomerFilter title="fuel" options={fuels} />
            <CustomerFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {isDataEmpty ? (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>No cars found.</p>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car: CarProps) => (
                <CarCard key={car.transmission} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 0) > allCars.length}
            />
          </section>
        )}
      </div>
    </main>
  );
}

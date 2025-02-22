"use client";

import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(manufacturers[1]);

  const filteredPeople =
    query === ""
      ? manufacturers
      : manufacturers.filter((manufacturer) => {
          return manufacturer.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="search-manufacturer">
      <Combobox
        value={selected}
        onChange={(value: string) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative w-full">
          <ComboboxButton className="absolute top-[14px]">
            <Image src="/car-logo.svg" width={20} height={20} alt="Volkswagen Logo" className="ml-4" />
          </ComboboxButton>

          <ComboboxInput
            className="search-manufacturer__input"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Volkswagen..."
          />

          <ComboboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "absolute mt-1 max-h-60 max-w-3xl overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {filteredPeople.map((manufacturer) => (
              <ComboboxOption
                key={manufacturer}
                value={manufacturer}
                className="relative search-manufacturer__option text-gray-900 data-[active]:bg-primary-blue data-[active]:text-white"
              >
                <Image
                  src="/check.svg"
                  alt="Check Icon"
                  width={18}
                  height={18}
                  className="invisible size-4 fill-white group-data-[selected]:visible"
                />
                <div className="text-sm/6 data-[selected]:text-white text-black">{manufacturer}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;

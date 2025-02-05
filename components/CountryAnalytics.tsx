import Image from "next/image";
import React from "react";
import { getCountryData, TCountryCode } from "countries-list";

const CountryAnalytics = () => {
  return (
    <div className="px-1 py-2 flex flex-col gap-1 rounded-md border max-w-[250px]">
      <div className="header dotted-down py-2 px-2 flex justify-between items-center">
        <h6 className="text-[0.9rem] text-regular font-[500]">Countries</h6>
        <h5 className="text-[0.9rem] text-subtle font-[500]">Visitors</h5>
      </div>
      <div className="mt-2">
        <SingleCountry countryCode="NG" count={4} />
        <SingleCountry countryCode="US" count={2} />
        <SingleCountry countryCode="AR" count={3} />
        <SingleCountry countryCode="AL" count={1} />
      </div>
    </div>
  );
};

export default CountryAnalytics;

interface SingleCountryProps {
  countryCode: string;
  count: number;
}
const SingleCountry = ({ countryCode, count }: SingleCountryProps) => {
  const countryName = getCountryData(countryCode as TCountryCode);
  const calcPercentage = (count: number, totalSubmissions: number) => {
    return Math.floor((count / totalSubmissions) * 100);
  };
  return (
    <div className="flex items-center hover:bg-[#fafafa] py-1 px-2 rounded-md justify-between">
      <div className="flex gap-2">
        <Image
          width={14}
          height={14}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
          alt={countryCode}
          className="rounded-lg object-contain aspect-square"
        />
        <p className="text-[0.875rem]  font-[500] text-muted-foreground mt-[1px]">
          {countryName.name}
        </p>
      </div>
      <p className="text-[0.875rem]  font-[500] ">
        {calcPercentage(count, 11)}%
      </p>
    </div>
  );
};

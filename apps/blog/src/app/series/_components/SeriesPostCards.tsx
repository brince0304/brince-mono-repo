'use client';

import { useState } from "react";
import type { SeriesCardProps } from "./SeriesPostCard";
import SeriesCard from "./SeriesPostCard";

interface SeriesPostCardsProps {
  seriesList: SeriesCardProps[]
}

const SeriesPostCards = ({ seriesList }: SeriesPostCardsProps) => {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  const handleSeriesClick = (seriesTitle: string) => {
    if (selectedSeries === seriesTitle) {
      setSelectedSeries(null);
    } else {
      setSelectedSeries(seriesTitle);
    }
  };

  return (
    <ul className="flex flex-col">
      {seriesList.map((series) => (
        <SeriesCard key={series.seriesTitle} {...series} onClick={() => handleSeriesClick(series.seriesTitle)} isSelected={selectedSeries === series.seriesTitle} />
      ))}
    </ul>
  );
};

export default SeriesPostCards;

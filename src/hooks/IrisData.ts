import { useEffect, useState } from "react";

export interface IrisData {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
  species: string;
}

export interface FieldExtent {
  min: number;
  max: number;
}

export interface ScatterExtent {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface ScatterData {
  x: number[];
  y: number[];
}

const csvUrl = [
  "https://gist.githubusercontent.com",
  "curran",
  "a08a1080b88344b0c8a7",
  "raw",
  "0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534",
  "iris.csv",
].join("/");

export async function fetchIrisData(): Promise<IrisData[]> {
  try {
    const response = await fetch(csvUrl);
    const csvData = await response.text();
    const rows = csvData.trim().split("\n").slice(1); // Skip header

    const irisData: IrisData[] = rows.map((row) => {
      const [sepal_length, sepal_width, petal_length, petal_width, species] =
        row.split(",");
      return {
        sepal_length: parseFloat(sepal_length),
        sepal_width: parseFloat(sepal_width),
        petal_length: parseFloat(petal_length),
        petal_width: parseFloat(petal_width),
        species,
      };
    });

    return irisData;
  } catch (error) {
    console.error("Error fetching iris data:", error);
    throw error;
  }
}

export const calculateMinMax = (
  data: IrisData[],
  field: keyof IrisData
): FieldExtent => {
  const values = data
    .map((obj) => obj[field])
    .filter((value) => typeof value === "number")
    .map((value) => value as number);
  return { max: Math.max(...values), min: Math.min(...values) };
};

export const dataExtent = (
  data: IrisData[],
  fieldOne: keyof IrisData,
  fieldTwo: keyof IrisData
): ScatterExtent => {
  const fieldOneExtent = calculateMinMax(data, fieldOne);
  const fieldTwoExtent = calculateMinMax(data, fieldTwo);
  return {
    minX: fieldOneExtent.min,
    maxX: fieldOneExtent.max,
    minY: fieldTwoExtent.min,
    maxY: fieldTwoExtent.max,
  };
};

export interface UseIrisDataProps {
  xColumn: keyof IrisData;
  yColumn: keyof IrisData;
}

export const useIrisData = ({ xColumn, yColumn }: UseIrisDataProps) => {
  const [irisData, setIrisData] = useState<IrisData[]>([]);
  const [scatterExtent, setScatterExtent] = useState<ScatterExtent>(
    dataExtent(irisData, xColumn, yColumn)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIrisData();
        setIrisData(data);
        setScatterExtent(dataExtent(data, xColumn, yColumn));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run effect only once on mount

  return {
    x: irisData.map((value) => value[xColumn]),
    y: irisData.map((value) => value[yColumn]),
    minX: scatterExtent.minX,
    maxX: scatterExtent.maxX,
    minY: scatterExtent.minY,
    maxY: scatterExtent.maxY,
  };
};

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type FabricType = {
  fabric: string;
  color: string;
  key: string;
  image: string;
  cost: string;
  style: any;
};

interface IContextType {
  selectedFabrics: FabricType;
  setSelectedFabrics: React.Dispatch<SetStateAction<FabricType>>;
  goToNextPage: () => void;
}

const DEFAULT_FABRIC: FabricType = {
  fabric: "",
  color: "",
  key: "",
  image: "",
  cost: "",
  style: {},
};

export const INITIAL_FILTER_DATA: IContextType = {
  selectedFabrics: DEFAULT_FABRIC,
  setSelectedFabrics: () => {},
  goToNextPage: () => {},
};

const FabricContext = createContext<IContextType>(INITIAL_FILTER_DATA);

export const FabricProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFabrics, setSelectedFabrics] =
    useState<FabricType>(DEFAULT_FABRIC);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const goToNextPage = () => {
    const step = searchParams.get("step");
    if (step === "style") {
      router.push(`${pathName}?step=accents`);
    }
    if (step === "accents") {
      router.push(`/measurement`);
    }
    if (!step) {
      router.push(`${pathName}?step=style`);
    }
  };

  return (
    <FabricContext.Provider
      value={{
        selectedFabrics,
        setSelectedFabrics,
        goToNextPage,
      }}
    >
      {children}
    </FabricContext.Provider>
  );
};

export const useFabric = () => useContext(FabricContext);

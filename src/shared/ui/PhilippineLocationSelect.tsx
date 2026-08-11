"use client";

import { FC, ReactElement, useState, useEffect, useCallback } from "react";
import { FormSelect, FormSelectOption } from "@/shared/ui/FormSelect";

const PSGC_BASE = "https://psgc.gitlab.io/api";

interface PsgcItem {
  code: string;
  name: string;
}

interface PhilippineLocationSelectProps {
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

function usePsgcFetch(url: string | null): {
  data: PsgcItem[];
  isLoading: boolean;
} {
  const [data, setData] = useState<PsgcItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!url) {
      return;
    }

    let isMounted = true;
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        const json: PsgcItem[] = await res.json();
        if (isMounted) {
          const sorted = json.toSorted((a, b) =>
            a.name.localeCompare(b.name)
          );
          setData(sorted);
        }
      } catch (err) {
        console.error("PSGC fetch error:", err);
        if (isMounted) setData([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading };
}

function toSelectOptions(items: PsgcItem[]): FormSelectOption[] {
  return items.map((item) => ({ value: item.code, label: item.name }));
}

export const PhilippineLocationSelect: FC<PhilippineLocationSelectProps> = ({
  onChange,
  error,
  disabled = false,
}): ReactElement => {
  const [regionCode, setRegionCode] = useState<string>("");
  const [provinceCode, setProvinceCode] = useState<string>("");
  const [cityCode, setCityCode] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [barangayName, setBarangayName] = useState<string>("");

  const { data: regions, isLoading: isLoadingRegions } = usePsgcFetch(
    `${PSGC_BASE}/regions/`
  );
  const { data: provinces, isLoading: isLoadingProvinces } = usePsgcFetch(
    regionCode ? `${PSGC_BASE}/regions/${regionCode}/provinces/` : null
  );
  const { data: cities, isLoading: isLoadingCities } = usePsgcFetch(
    provinceCode
      ? `${PSGC_BASE}/provinces/${provinceCode}/cities-municipalities/`
      : null
  );
  const { data: barangays, isLoading: isLoadingBarangays } = usePsgcFetch(
    cityCode
      ? `${PSGC_BASE}/cities-municipalities/${cityCode}/barangays/`
      : null
  );

  const syncValue = useCallback(
    (bgy: string, city: string) => {
      if (city && bgy) {
        onChange(`${bgy}, ${city}`);
      } else if (city) {
        onChange(city);
      } else {
        onChange("");
      }
    },
    [onChange]
  );

  useEffect(() => {
    syncValue(barangayName, cityName);
  }, [barangayName, cityName, syncValue]);

  const handleRegionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRegionCode(e.target.value);
    setProvinceCode("");
    setCityCode("");
    setCityName("");
    setBarangayName("");
  };

  const handleProvinceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setProvinceCode(e.target.value);
    setCityCode("");
    setCityName("");
    setBarangayName("");
  };

  const handleCityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const code = e.target.value;
    const found = cities.find((c) => c.code === code);
    setCityCode(code);
    setCityName(found ? found.name : "");
    setBarangayName("");
  };

  const handleBarangayChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setBarangayName(e.target.value);
  };

  const barangayOptions: FormSelectOption[] = barangays.map((b) => ({
    value: b.name,
    label: b.name,
  }));

  return (
    <div className="space-y-4">
      <FormSelect
        id="regionSelect"
        label="Region"
        value={regionCode}
        onChange={handleRegionChange}
        options={toSelectOptions(regions)}
        disabled={disabled}
        isLoading={isLoadingRegions}
        placeholder="Select Region"
      />

      {regionCode && (
        <FormSelect
          id="provinceSelect"
          label="Province"
          value={provinceCode}
          onChange={handleProvinceChange}
          options={toSelectOptions(provinces)}
          disabled={disabled}
          isLoading={isLoadingProvinces}
          placeholder="Select Province"
        />
      )}

      {provinceCode && (
        <FormSelect
          id="citySelect"
          label="City / Municipality"
          value={cityCode}
          onChange={handleCityChange}
          options={toSelectOptions(cities)}
          disabled={disabled}
          isLoading={isLoadingCities}
          placeholder="Select City / Municipality"
        />
      )}

      {cityCode && (
        <FormSelect
          id="barangaySelect"
          label="Barangay"
          value={barangayName}
          onChange={handleBarangayChange}
          options={barangayOptions}
          disabled={disabled}
          isLoading={isLoadingBarangays}
          placeholder="Select Barangay"
          error={error}
        />
      )}
    </div>
  );
};

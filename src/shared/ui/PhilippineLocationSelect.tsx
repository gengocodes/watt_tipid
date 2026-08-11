"use client";

import { FC, ReactElement, useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { MapPin, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: PsgcItem[];
  disabled?: boolean;
  isLoading?: boolean;
  placeholder: string;
  disabledPlaceholder?: string;
  icon?: ReactElement;
}

const SelectField: FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
  isLoading = false,
  placeholder,
  disabledPlaceholder,
  icon,
}): ReactElement => (
  <div className="space-y-1.5">
    <Label
      htmlFor={id}
      className="text-xs font-medium text-muted-foreground tracking-wider flex items-center justify-between"
    >
      <span>{label}</span>
      {isLoading && (
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-normal">
          <Loader2 className="h-3 w-3 animate-spin text-primary" /> Loading...
        </span>
      )}
    </Label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled || isLoading}
        className={cn(
          "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer pr-8 text-foreground",
          !value && "text-muted-foreground",
        )}
      >
        <option value="" disabled>
          {getPlaceholderText(disabled, disabledPlaceholder, isLoading, placeholder)}
        </option>
        {options.map((item) => (
          <option key={item.code} value={item.code} className="text-foreground">
            {item.name}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
        {icon || <ChevronDown className="h-4 w-4" />}
      </span>
    </div>
  </div>
);

function getPlaceholderText(
  disabled: boolean,
  disabledPlaceholder: string | undefined,
  isLoading: boolean,
  placeholder: string,
): string {
  if (disabled && disabledPlaceholder) return disabledPlaceholder;
  if (isLoading) return "Loading...";
  return placeholder;
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
          const sorted = json.toSorted((a, b) => a.name.localeCompare(b.name));
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

  // Fetch each level
  const { data: regions, isLoading: isLoadingRegions } = usePsgcFetch(
    `${PSGC_BASE}/regions/`,
  );
  const { data: provinces, isLoading: isLoadingProvinces } = usePsgcFetch(
    regionCode ? `${PSGC_BASE}/regions/${regionCode}/provinces/` : null,
  );
  const { data: cities, isLoading: isLoadingCities } = usePsgcFetch(
    provinceCode
      ? `${PSGC_BASE}/provinces/${provinceCode}/cities-municipalities/`
      : null,
  );
  const { data: barangays, isLoading: isLoadingBarangays } = usePsgcFetch(
    cityCode
      ? `${PSGC_BASE}/cities-municipalities/${cityCode}/barangays/`
      : null,
  );

  // Sync formatted value to parent form
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
    [onChange],
  );

  useEffect(() => {
    syncValue(barangayName, cityName);
  }, [barangayName, cityName, syncValue]);

  const handleRegionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setRegionCode(e.target.value);
    setProvinceCode("");
    setCityCode("");
    setCityName("");
    setBarangayName("");
  };

  const handleProvinceChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setProvinceCode(e.target.value);
    setCityCode("");
    setCityName("");
    setBarangayName("");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const code = e.target.value;
    const found = cities.find((c) => c.code === code);
    setCityCode(code);
    setCityName(found ? found.name : "");
    setBarangayName("");
  };

  const handleBarangayChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setBarangayName(e.target.value);
  };

  return (
    <div className="space-y-3">
      <SelectField
        id="regionSelect"
        label="Region"
        value={regionCode}
        onChange={handleRegionChange}
        options={regions}
        disabled={disabled}
        isLoading={isLoadingRegions}
        placeholder="Select Region"
        icon={<MapPin className="h-4 w-4" />}
      />

      <SelectField
        id="provinceSelect"
        label="Province"
        value={provinceCode}
        onChange={handleProvinceChange}
        options={provinces}
        disabled={disabled || !regionCode}
        isLoading={isLoadingProvinces}
        placeholder="Select Province"
        disabledPlaceholder="Select a Region first"
      />

      <SelectField
        id="citySelect"
        label="City / Municipality"
        value={cityCode}
        onChange={handleCityChange}
        options={cities}
        disabled={disabled || !provinceCode}
        isLoading={isLoadingCities}
        placeholder="Select City / Municipality"
        disabledPlaceholder="Select a Province first"
      />

      <SelectField
        id="barangaySelect"
        label="Barangay"
        value={barangayName}
        onChange={handleBarangayChange}
        options={barangays.map((b) => ({ ...b, code: b.name }))}
        disabled={disabled || !cityCode}
        isLoading={isLoadingBarangays}
        placeholder="Select Barangay"
        disabledPlaceholder="Select a City first"
      />

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectToQueryParams(params: object) {
  // Filter out null or undefined values
  const filteredParams = Object.entries(params).filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value !== null && value !== undefined
  );

  // Convert to query string format
  return filteredParams.length
    ? "?" +
        filteredParams
          .map(([key, value]) => {
            // Handle arrays by repeating the parameter for each value
            if (Array.isArray(value)) {
              return value
                .map(
                  (val) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
                )
                .join("&");
            }
            // Handle regular key-value pairs
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          })
          .join("&")
    : "";
}

import { expect, it, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../pages/index";
import {
  withNuqsTestingAdapter,
  type OnUrlUpdateFunction,
} from "nuqs/adapters/testing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/router");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

describe("LocaleSwitcher", () => {
  it("test simple", () => {
    const queryClient = new QueryClient();

    const onUrlUpdate = vi.fn<OnUrlUpdateFunction>();
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>,
      {
        // 1. Setup the test by passing initial search params / querystring:
        wrapper: withNuqsTestingAdapter({
          searchParams: "?count=42",
          onUrlUpdate,
        }),
      }
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Anime List: Browse throught our Anime list",
      })
    ).toBeDefined();
  });
});

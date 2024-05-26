import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import { SearchIcon } from "../icons/Icons";
import { subtitle, title } from "../primitives";
import { useDisclosure } from "@nextui-org/react";
import { PreferenceModal } from "./PreferenceModal";
import { useState } from "react";
import { FilterModal } from "./FilterModal";
import { Route, useNavigate } from "@tanstack/react-router";

export const HeaderNav = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();
  const [placement, setPlacement] = useState<
    "auto" | "top" | "bottom" | "center" | "top-center" | "bottom-center"
  >("auto");
  const navigate = useNavigate({ from: "/" });
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-gray-300 sm:mt-0",
        input: "text-sm",
      }}
      startContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      onKeyDown={(e: any) => {
        if (e.key === "Enter") {
          console.log("search", typeof e.target.value);
          //   Cookies.set("searchCookie", e.target.value);
          navigate({
            to: "/",
            search: { text: e.target.value },
          });
        }
      }}
      labelPlacement="outside"
      placeholder="Search..."
      endContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      className="bg-gray-100 py-1 dark:bg-black"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <h1 className={title({ color: "blue" })}>NEWS</h1>
          <h1 className={subtitle()}>Aggrigator</h1>
        </NavbarBrand>
      </NavbarContent>
      {/* <PreferenceModal
        isOpen={isOpen}
        placement={placement}
        onOpenChange={onOpenChange}
      /> */}
      <FilterModal
        isOpen={isFilterOpen}
        placement={placement}
        onOpenChange={onFilterOpenChange}
      />
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem
          className="hidden lg:flex cursor-pointer"
          onClick={() => {
            setPlacement("top-center");
            onOpen();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
            />
          </svg>
        </NavbarItem>
        <NavbarItem
          className="hidden lg:flex cursor-pointer"
          onClick={() => {
            setPlacement("top-center");
            onFilterOpen();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
            />
          </svg>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mt-4">{searchInput}</div>

        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarItem
            key={"account"}
            onClick={() => {
              setPlacement("bottom");
              onOpen();
            }}
          >
            Preferences
          </NavbarItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

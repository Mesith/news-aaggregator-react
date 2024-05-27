import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import React, { useEffect } from "react";
import { siteConfig } from "../config";
import { DatePicker } from "@nextui-org/date-picker";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { navigateWithFilteredSearchParams } from "../util/util";
import { parseDate } from "@internationalized/date";

const routeApi = getRouteApi("/");

export const FilterModal = ({
  isOpen,
  onOpenChange,
  placement,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  placement:
    | "auto"
    | "top"
    | "bottom"
    | "center"
    | "top-center"
    | "bottom-center";
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [category, setCategory] = React.useState<any>(new Set([]));
  const [date, setDate] = React.useState<any>(null);

  const selectedValue: string = React.useMemo(
    () => Array.from(selectedKeys).join(", ").split("_").join(" "),
    [selectedKeys]
  );

  const navigate = useNavigate({ from: "/" });
  const routeSearch = routeApi.useSearch();

  useEffect(() => {
    setSelectedKeys(new Set([routeSearch?.source]) as any);
    setDate(routeSearch?.date ? parseDate(routeSearch?.date) : null);
    setCategory(routeSearch?.category);
    return () => {};
  }, [routeSearch]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={placement}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Filter News Articles
            </ModalHeader>
            <ModalBody>
              <label>Select news source</label>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
                    {selectedValue.length > 0
                      ? selectedValue
                      : "Select Preferred News Source"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Prefrred News Source"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(val: any) => {
                    setSelectedKeys(val.currentKey);
                    //setSelectedKeys(new Set([val.currentKey]));
                  }}
                >
                  {siteConfig.newsSourceItems.map((item) => {
                    return (
                      <DropdownItem key={item.id}>{item.name}</DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>

              <DatePicker
                label="Date"
                onChange={(e: any) => {
                  setDate(e);
                }}
                value={date}
              />

              <Select
                label="Select a category"
                selectedKeys={new Set([category])}
                onSelectionChange={(e: any) => {
                  setCategory(e?.currentKey);
                }}
              >
                {siteConfig?.categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  navigateWithFilteredSearchParams({
                    navigate,
                    to: "/",
                    searchParams: {
                      ...routeSearch,
                      source:
                        selectedKeys.size === 0
                          ? null
                          : Array.from(selectedKeys)[0],
                      date: date ? date?.toString() : null,
                      category: category?.size === 0 ? null : category,
                    },
                  });
                  onClose();
                }}
              >
                Filter
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

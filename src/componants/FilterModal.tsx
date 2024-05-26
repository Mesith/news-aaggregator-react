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
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import React from "react";
import { siteConfig } from "../config";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Chip } from "@nextui-org/chip";
import { useGurdianSections } from "../hooks/gurdian/loadGurdianSections";
import { DatePicker } from "@nextui-org/date-picker";

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
  const [isOpenSectionList, setIsSectionOpen] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const {
    items: sections,
    hasMore: hasMoreSection,
    isLoading: isLoadingSection,
    onLoadMore: onLoadMoreSection,
  } = useGurdianSections({
    fetchDelay: 1500,
  });
  const [, scrollerSectionRef] = useInfiniteScroll({
    hasMore: hasMoreSection,
    isEnabled: isOpenSectionList,
    shouldUseLoader: false,
    onLoadMore: onLoadMoreSection,
  });

  const selectedValue: string = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  console.log(selectedValue);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={placement}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Filer News Articles
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
                  onSelectionChange={setSelectedKeys}
                >
                  {siteConfig.newsSourceItems.map((item) => {
                    return (
                      <DropdownItem key={item.name}>{item.name}</DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>

              <DatePicker label="Date" />

              <Select
                isLoading={isLoadingSection}
                items={sections}
                label="Filter by Section"
                placeholder="Select Section"
                scrollRef={scrollerSectionRef}
                onOpenChange={setIsSectionOpen}
                isMultiline={true}
                selectionMode="single"
                classNames={{
                  base: "w-full",
                  trigger: "min-h-12 py-2",
                }}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items?.map((item) => (
                        <Chip key={item.name}>{item?.data.name}</Chip>
                      ))}
                    </div>
                  );
                }}
              >
                {(item) => (
                  <SelectItem key={item?.id} className="capitalize">
                    {item?.name}
                  </SelectItem>
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Filter
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

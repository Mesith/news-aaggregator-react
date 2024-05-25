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
import { usePokemonList } from "../hooks/useGurdianAuthors";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Chip } from "@nextui-org/chip";

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
  const [isOpenAuthorsList, setIsOpen] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const { items, hasMore, isLoading, onLoadMore } = usePokemonList({
    fetchDelay: 1500,
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpenAuthorsList,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
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

              <Autocomplete label="Select an news category">
                {siteConfig.categories.map((category) => (
                  <AutocompleteItem key={category.id} value={category.id}>
                    {category.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <Select
                isLoading={isLoading}
                items={items}
                label="Pick Authors"
                placeholder="Select Authors"
                scrollRef={scrollerRef}
                onOpenChange={setIsOpen}
                isMultiline={true}
                selectionMode="multiple"
                classNames={{
                  base: "w-full",
                  trigger: "min-h-12 py-2",
                }}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items?.map((item) => (
                        <Chip key={item.name}>{item?.data.byline}</Chip>
                      ))}
                    </div>
                  );
                }}
              >
                {(item) => (
                  <SelectItem key={item?.id} className="capitalize">
                    {item?.byline}
                  </SelectItem>
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

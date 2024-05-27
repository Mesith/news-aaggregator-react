import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import React from "react";
import { siteConfig } from "../config";
import Cookies from "js-cookie";

export const PreferenceModal = ({
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
  const [selectedKeys, setSelectedKeys] = React.useState<any>(() =>
    Cookies.get("source")
  );
  const [category, setCategory] = React.useState<any>(() =>
    Cookies.get("category")
  );

  const [author, setAuthor] = React.useState(Cookies.get("author"));

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={placement}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Set Your Preferences
            </ModalHeader>
            <ModalBody>
              <label>Select news source</label>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
                    {selectedKeys?.length > 0
                      ? selectedKeys
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
                    //setSelectedKeys(new Set([val.currentKey]));
                    setSelectedKeys(val.currentKey);
                    Cookies.set("source", val.currentKey);
                  }}
                >
                  {siteConfig.newsSourceItems.map((item) => {
                    return (
                      <DropdownItem key={item.id}>{item.name}</DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>

              <Select
                label="Select a category"
                selectedKeys={new Set([category])}
                onSelectionChange={(e: any) => {
                  setCategory(e?.currentKey);
                  Cookies.set("category", e.currentKey);
                }}
              >
                {siteConfig?.categories?.map((category) => (
                  <SelectItem  key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Authors"
                variant="bordered"
                placeholder="Enter preferred authors name"
                onValueChange={setAuthor}
                value={author}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                     onClose();
                    if (e.target.value) {
                      Cookies.set("author", e.target.value);
                    } else {
                      Cookies.remove("author");
                    }
                  }
                 
                }}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => {
                      if (author) {
                        Cookies.set("author", author);
                      } else {
                        Cookies.remove("author");
                      }
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
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                }
                type={"text"}
              />
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

import { Menu, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import s from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function Dropdown({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <Menu as="div" className={s.menuContainer}>
      <div>
        <Menu.Button className={s.menuButton}>
          {title}
          <ChevronDownIcon
            className="h-5 w-5 mx-0.5 md:mx-2 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={s.menuItemsContainer}>
          <div>{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function DropdownItem({ href, children }) {
  const { asPath } = useRouter();
  return (
    <Menu.Item>
      {({ active }) => (
        <Link href={href}>
          <a
            className={`${
              active ? "bg-slate-900/80 text-pink-600" : "text-white"
            } group flex w-full items-center px-4 py-4 text-sm first:rounded-t last:rounded-b hover:bg-sky-300/40 ${
              asPath === href && "text-pink-600 bg-slate-900/80"
            }`}
          >
            {children}
          </a>
        </Link>
      )}
    </Menu.Item>
  );
}

export default Dropdown;

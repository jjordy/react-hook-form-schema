import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const TabList = (props) => (
  <Tab.List
    className="flex space-x-2 md:srounded-xl bg-sky-900/40 p-2 mb-1"
    {...props}
  />
);

export const TabItem = (props) => (
  <Tab
    className={({ selected }) =>
      classNames(
        "w-full rounded-lg p-0.5 md:py-2.5 text-xs md:text-sm font-medium leading-5 text-white",
        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
        selected
          ? "bg-slate-900/40 shadow"
          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
      )
    }
    {...props}
  />
);

export const TabPanel = (props) => (
  <Tab.Panel
    className={classNames(
      "rounded-xl p-3",
      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
    )}
    {...props}
  />
);

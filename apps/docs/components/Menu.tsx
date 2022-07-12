import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function getLinkClasses(url, pathname) {
  return `font-medium p-4 text-white ${
    url === pathname ? "bg-indigo-100 text-indigo-600" : ""
  }`;
}

const MenuLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  const { asPath } = useRouter();
  return (
    <Link href={href}>
      <a className={getLinkClasses(href, asPath)}>{children}</a>
    </Link>
  );
};

export default function Menu() {
  return (
    <div className="flex flex-col max-w-xs h-screen fixed shadow-xl w-full bg-black/40">
      <h1 className=" text-xl py-4 mb-4 pl-2 text-slate-200 font-semibold tracking-tight bg-black/50">
        React Hook Form Schema
      </h1>
      <div className="flex flex-col h-full">
        <div className="flex flex-col space-y-2">
          <MenuLink href="/">Home</MenuLink>
          <MenuLink href="/examples/basic">Basic</MenuLink>
          <MenuLink href="/examples/kitchen_sink">Kitchen Sink</MenuLink>
        </div>
        <div className="mb-auto"></div>
      </div>
    </div>
  );
}

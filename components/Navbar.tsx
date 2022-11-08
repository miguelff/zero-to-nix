import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { state, systems } from "lib/state";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import site from "site";
import shallow from "zustand/shallow";

type State = {
  active: boolean;
};

const Navbar = () => {
  const [system, setSystem] = state((s) => [s.system, s.setSystem], shallow);
  const [sys, setSys] = useState<string>();

  useEffect(() => {
    setSys(system);
  }, [system]);

  const { title } = site;

  return (
    <nav className="bg-slate-100 py-4 px-6 shadow">
      <div className="mx-auto max-w-6xl flex justify-between items-center">
        <div>
          <Link href="/" className="text-xl font-semibold">
            {title} ❄️
          </Link>
        </div>

        <div>
          <Menu as="div" className="relative inline-block">
            <Menu.Button
              as="button"
              className="w-24 bg-black text-white py-2 px-3 rounded-lg font-semibold tracking-tight"
            >
              {sys}
            </Menu.Button>
            <Menu.Items className="absolute bg-slate-100 right-0 w-36 mt-2 text-right p-4 shadow">
              {systems
                .filter((s) => s != sys)
                .map((s) => (
                  <Menu.Item key={s} as={Fragment}>
                    {({ active }: State) => (
                      <button
                        onClick={() => setSystem(s)}
                        className={clsx(
                          active ? "text-blue-500" : "text-black"
                        )}
                      >
                        {s}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
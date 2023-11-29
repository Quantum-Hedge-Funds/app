import classNames from "classnames";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

const Topbar = () => {
  return (
    <div className={classNames("z-30 fixed w-full top-0")}>
      <div className="flex w-full justify-end gap-4 px-6 py-4 backdrop-blur-lg bg[hsla(240,7%,97%,.6)] bg-transparent">
        <div className="flex items-center">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import classNames from "classnames";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Header = ({ className }: HeaderProps) => {
    return (
        <header
            className={classNames(
                className,
                "header p-4 shadow-md fixed top-0 z-[1000] w-full backdrop-blur-md bg-neutral-950/30"
            )}
        >
            {/* <Link to="/" className="hover:text-gray-300"> */}
                <h1 className="heading-4 mb-0 text-center">
                    LUM<span className="text-neutral-400">PS</span>
                </h1>
            {/* </Link> */}
        </header>
    );
};

export default Header;

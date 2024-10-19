import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import classNames from "classnames";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Header = ({
    className,
}: HeaderProps) => {
    return (
        <header className={classNames(className, "header flex justify-between items-center p-4 shadow-md")}>
            <h1 className="heading-4 mb-0">Lumetry Media Photo Share</h1>
            <nav>
                <Link to="/" className="mr-4 hover:text-gray-300">Home</Link>
            </nav>
        </header>
    );
};

export default Header;

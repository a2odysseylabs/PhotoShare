import React from "react";
import { Link } from "react-router-dom";

import "./EventsCard.scss";
import classNames from "classnames";
import { Button } from "../Button";

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
}

interface EventsCardProps extends React.HTMLAttributes<HTMLDivElement> {
    event: Event;
}

const EventsCard = ({
    className,
    event
}: EventsCardProps) => {
    return (
        <div key={event.id} className={classNames(className, "event-card bg-neutral-700 rounded-lg shadow-md p-6")}>
            <h2 className="heading-2">{event.title}</h2>
            <p className="mb-4">{event.date}</p>
            <p className="text-gray-200">{event.location}</p>
            <Button
                as="link"
                to={`/event/${event.id}`}
                className="mt-4"
            >
                View Details
            </Button>
        </div>
    );
};

export default EventsCard;

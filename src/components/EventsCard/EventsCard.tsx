import React from "react";
// import { Link } from "react-router-dom";
import "./EventsCard.scss";
import classNames from "classnames";
import { Button } from "../Button";

// Updated event interface to match the API data
interface Event {
  _id: string;           // Using _id as the id
  event_name: string;    // event_name from the API
  event_date: string;    // event_date from the API
  promptTitle: string;   // promptTitle is now used as location
}

interface EventsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

const EventsCard = ({
    className,
    event
  }: EventsCardProps) => {
    const formattedDate = new Date(event.event_date).toISOString().split('T')[0];
  
    return (
      <div key={event._id} className={classNames(className, "event-card bg-neutral-700 rounded-lg shadow-md p-6")}>
        <h2 className="heading-2">{event.event_name}</h2>
        <p className="mb-4">{formattedDate}</p>
        <p className="text-gray-200">{event.promptTitle || "No location provided"}</p>
  
        <Button
          as="link"
          to={`/event/${event._id}`}
          className="mt-4"
        >
          View Details
        </Button>
      </div>
    );
  };
  
  export default EventsCard;

import React from 'react';

import { events } from '../../data/events';
import { EventsCard } from '../../components';
import classNames from 'classnames';

interface LandingPageProps extends React.HTMLAttributes<HTMLDivElement> {
}

const LandingPage = ({
  className,
}: LandingPageProps) => {
  return (
    <div className={classNames(className, "min-h-screen")}>
      <h1 className="heading-1">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventsCard event={event} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
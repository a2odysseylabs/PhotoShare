import React, { useEffect, useState } from 'react';
import { EventsCard } from '../../components';
import classNames from 'classnames';

interface LandingPageProps extends React.HTMLAttributes<HTMLDivElement> {}

interface Event {
  _id: string;
  event_name: string;
  event_date: string;
  promptTitle: string;
}

const LandingPage = ({ className }: LandingPageProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://photoshare-backend-vrpr.onrender.com/api/events'); // Fetch data from API
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classNames(className, 'min-h-screen')}>
      <h1 className="heading-1">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event) => <EventsCard key={event._id} event={event} />)
        ) : (
          <div>No upcoming events found</div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
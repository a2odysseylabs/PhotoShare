import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { Button } from "../../components";

interface EventDetailsProps extends React.HTMLAttributes<HTMLDivElement> {}

interface Event {
  _id: string;
  event_name: string;
  event_date: string;
  promptTitle: string;
  galleryImageUrls: string[];
}

const EventDetails = ({ className }: EventDetailsProps) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch event details when component mounts
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://photoshare-backend-vrpr.onrender.com/api/event/${eventId}`);
        if (!response.ok) {
          throw new Error("Event not found");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Handle image selection
  const handleImageSelect = (image: string) => {
    setSelectedImages((prev) =>
      prev.includes(image)
        ? prev.filter((img) => img !== image)
        : [...prev, image]
    );
  };

  const handleCancel = () => {
    setSelectedImages([]);
  };

  const handleAction = (action: string) => {
    if (selectedImages.length === 0) {
      alert("No images selected!");
      return;
    }
    alert(`Performing ${action} action with selected images: ${selectedImages.join(", ")}`);
  };

  if (loading) {
    return <p className="text-center mt-20">Loading event details...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (!event) {
    return <p className="text-center mt-20 text-red-500">Event not found.</p>;
  }

  const formattedDate = new Date(event.event_date).toISOString().split('T')[0];

  return (
    <div className={classNames(className, "min-h-screen relative")}>
      <div className="bg-neutral-700 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
        <p className="text-lg mb-2">Date: {formattedDate}</p>
        <p className="text-lg mb-4">Location: {event.promptTitle}</p>

        {selectedImages.length}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
          {event.galleryImageUrls?.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Event ${event.event_name} - ${index + 1}`}
                className={`w-full h-64 object-cover rounded-lg shadow-md ${
                  selectedImages.includes(image) ? "ring-4 ring-blue-500" : ""
                }`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  as="button"
                  onClick={() => handleImageSelect(image)}
                  className={`text-white bg-blue-600 px-4 py-2 rounded ${
                    selectedImages.includes(image) ? "bg-green-500" : ""
                  }`}
                >
                  {selectedImages.includes(image) ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button as="link" to="/" className="mt-4">
          Back to Events
        </Button>
      </div>

      {selectedImages.length > 0 && (
        <>
          <div className="absolute top-4 left-4">
            <Button
              as="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </Button>
          </div>

          <div className="absolute top-4 right-4 flex gap-4">
            <Button
              as="button"
              onClick={() => handleAction("Email")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Email
            </Button>
            <Button
              as="button"
              onClick={() => handleAction("Text")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Text
            </Button>
            <Button
              as="button"
              onClick={() => handleAction("QR Code")}
              className="bg-yellow-600 text-white px-4 py-2 rounded"
            >
              QR Code
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;

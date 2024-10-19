import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";

import { events } from "../../data/events";
import { Button } from "../../components";

interface EventDetailsProps extends React.HTMLAttributes<HTMLDivElement> {}

const EventDetails = ({ className }: EventDetailsProps) => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = events.find((e) => e.id === eventId);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  if (!event) {
    return (
      <p className="text-center mt-20 text-red-500">Event not found.</p>
    );
  }

  const handleImageSelect = (image: string) => {
    setSelectedImages((prev) =>
      prev.includes(image)
        ? prev.filter((img) => img !== image) // Deselect if already selected
        : [...prev, image] // Add to selection if not selected
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

  return (
    <div className={classNames(className, "min-h-screen relative")}>
      <div className="bg-neutral-700 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-lg mb-2">Date: {event.date}</p>
        <p className="text-lg mb-4">Location: {event.location}</p>

        {selectedImages.length}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
          {event.images?.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Event ${event.title} - ${index + 1}`}
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
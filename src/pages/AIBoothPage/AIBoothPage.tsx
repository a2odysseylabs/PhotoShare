import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface GalleryImage {
  id: string;
  imageUrl: string;
  phoneNumber: string | null;
  email: string;
  sent: string;
  uploadedAt: string;
  generatedImages: string[];
}

const AIBoothPage: React.FC = () => {
  const { eventId, galleryId } = useParams();
  const [galleryItem, setGalleryItem] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const response = await fetch(`https://photoshare-backend-vrpr.onrender.com/api/event/${eventId}/gallery/${galleryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery item');
        }
        const data = await response.json();
        setGalleryItem(data);
      } catch (error) {
        console.error('Error fetching gallery item:', error);
        setError('Failed to load gallery item. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItem();
  }, [eventId, galleryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!galleryItem) {
    return <div>Gallery item not found</div>;
  }

  return (
    <div>
      <h1>Gallery Item Details</h1>
      <p>Email: {galleryItem.email}</p>
      <p>Image URL: {galleryItem.imageUrl}</p>
      <p>Uploaded At: {new Date(galleryItem.uploadedAt).toLocaleString()}</p>
      
      <div>
        <h2>Generated Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryItem.generatedImages.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Generated ${index}`} className="w-full h-auto" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIBoothPage;
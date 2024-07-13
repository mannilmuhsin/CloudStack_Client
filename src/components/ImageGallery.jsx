import React from 'react';

function ImageGallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Location Images</h3>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image.url} 
            alt={`Location image ${index + 1}`} 
            className="w-full h-32 object-cover rounded shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
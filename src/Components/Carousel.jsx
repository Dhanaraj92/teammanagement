import React, { useState, useEffect } from 'react';
import '../Styles/Carousel.css'

const Carousel = () => {
  const slides = [
    {
      id: 1,
      title: 'Manage Teams Efficiently',
      description: 'Create, organize, and manage your teams effortlessly.',
      image: 'https://miro.medium.com/v2/resize:fit:1200/1*X0CI0xMKpIzsccfQbfzm8A.png',
    },
    {
      id: 2,
      title: 'Search for Players',
      description: 'Find players and manage their profiles seamlessly.',
      image: 'https://wallpapercave.com/wp/wp6848406.jpg',
    },
    {
      id: 3,
      title: 'Stay Organized',
      description: 'Keep your team data organized and up-to-date.',
      image: 'https://www.celoxis.com/featured-image/project-management-through-the-lens-of-the-cricket-world-cup.png?rnd=1366886025',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${
            index === currentIndex ? 'active' : 'inactive'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        >
          <div className="carousel-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

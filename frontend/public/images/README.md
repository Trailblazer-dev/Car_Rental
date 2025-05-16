# Assets Folder

This folder contains all the static assets used in the CarHire application.

## Image Assets

The application uses the following image files that should be placed in this directory:

- **hero-car.png** - The main hero image for the landing page
- **car-1.jpg** - Featured SUV on landing page
- **car-2.jpg** - Featured Sedan on landing page
- **car-3.jpg** - Featured Sports car on landing page
- **about-hero.jpg** - Team image for About page
- **team-1.jpg** - CEO image for About page
- **team-2.jpg** - Operations Director image for About page
- **team-3.jpg** - Customer Service Manager image for About page
- **map.jpg** - Office location map for Contact page
- **car-placeholder.jpg** - Fallback image for car cards
- **car-detail-placeholder.jpg** - Fallback image for car detail page

## Image Requirements

- All images should be optimized for web (compressed)
- Hero images: Recommended size 1200x600px
- Car card images: Recommended size 600x400px
- Team member photos: Recommended size 400x400px
- Map image: Recommended size 600x400px

## How to Add New Images

1. Add the image file to this directory
2. Import the image in your component:
   ```tsx
   import myImage from '@/assets/my-image.jpg';
   ```
3. Use the image in your component:
   ```tsx
   <img src={myImage} alt="Description" />
   ```

## Fallback Strategy

The application has a fallback strategy for missing images:
1. Try to load the specified image
2. If that fails, try to load a placeholder from the assets folder
3. If that also fails, use an external placeholder service

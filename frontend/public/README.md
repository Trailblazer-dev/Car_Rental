# Public Assets Folder

This folder contains static assets that will be copied directly to the build output directory without processing.

## Required Images Structure

Place all images in the `assets` subfolder:

```
public/
└── assets/
    ├── hero.png
    ├── car1.png
    ├── car2.png
    ├── car3.jpg
    ├── car-car-park.jpg
    ├── ceo.jpg
    ├── op.jpg
    ├── cs.png
    ├── map.jpg
    ├── placeholder-car.jpg
    ├── car-detail-placeholder.jpg
    └── car-placeholder.jpg
```

## How Assets Work in Production

Images placed in this folder will:
1. Be copied directly to the root of the build output
2. Be accessible via absolute paths like `/assets/image-name.jpg`
3. Not have their filenames hashed in production

This ensures consistent URLs that work in both development and production.

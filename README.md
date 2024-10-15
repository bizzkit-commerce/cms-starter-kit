# Bizzkit CMS Starter Kit

This is an example how to integrate Builder.io with the different Bizzkit applications. This code is not intended for production, but as a starting point for developing your own solution.

## Getting started

Update the `.env` file with information associated to your environment:

-   `VITE_BUILDER_API_KEY`: Your Builder.io space public API [(documentation)](https://www.builder.io/c/docs/using-your-api-key#finding-your-public-api-key).
-   `VITE_DAM_URL`: The CDN URL for Bizzkit DAM. Can be found by calling `GET /api/_/settings/cdn` in your DAM API instance.
-   `VITE_SEARCH_URL`: The URL for Bizzkit Ecommerce Search API.

Make sure that your space in Builder has been [configured to use Bizzkit plugins](https://docs.bizzkit.com/content/for-developers/getting-started/#registering-plugins).

Run `npm ci` followed by `npm start`. The server starts at [http://localhost:5173](http://localhost:5173) by default.

Builder can now be [configured](https://www.builder.io/c/docs/guides/preview-url) to use the website address above for designing and previewing content.

After [creating your page](https://www.builder.io/c/docs/create-page) and you should be able to see it updating live in Builder. Once the page is published, it can be accessed through `http://localhost:5173/{page-url}`.

## Structure

The project is setup using [Vite](https://vite.dev/) with the `react-ts` preset with minor adjustments. **Components** are written using React functional components using [CSS modules](https://vite.dev/guide/features.html#css-modules) for styling. The custom components for Builder are defined in `{component}.builder.ts` files, where the fields are composed of [built-in input types from Builder](https://www.builder.io/c/docs/custom-components-input-types) as well as [Bizzkit's own input types](https://docs.bizzkit.com/content/concepts/bizzkit-plugins/).

## Components

Components are written using React functional components using [CSS modules](https://vite.dev/guide/features.html#css-modules) for styling. The custom components for Builder are defined in the corresponding `{component}.builder.ts` files. Builder component fields fields are composed of [built-in input types from Builder](https://www.builder.io/c/docs/custom-components-input-types) as well as [Bizzkit's own input types](https://docs.bizzkit.com/content/concepts/bizzkit-plugins/).

### DamImage

Displays optimized, responsive images stored in [Bizzkit DAM](https://docs.bizzkit.com/dam/). The CDN supports [transformations functions](https://docs.bizzkit.com/dam/for-developers/concepts/transformation-functions/) that are either built-in to the system or custom defined through the API.

[Go to source](./src/components/DamImage/index.ts)

### DamVideo

Streams video files stored in [Bizzkit DAM](https://docs.bizzkit.com/dam/). The files are streamed "as-is", meaning that videos should be uploaded with the designed size and compression before being selected in the component.

[Go to source](./src/components/DamVideo/index.ts)

### ProductCard

A card containing the product picture, stock and price information stored in [Bizzkit Ecommerce Search](https://docs.bizzkit.com/ecommerce-search/). The example assumes that the scope being used has been configured to provide media (picture), stock and price fields.

[Go to source](./src/components/ProductCard/index.ts)

### ProductSlider

A collection of preselected products displayed in a carousel/slider arrangement. The component builds up from the component and API work present on `ProductCard`. When taking responsiveness, gestures, timers, etc. into consideration, sliders can get quite complicated to build, which aren't all considered in this implementation. It's then recommended that you build a more robust solution before taking it into production or use an 3rd-party library such as [Embla Carousel](https://www.npmjs.com/package/embla-carousel).

[Go to source](./src/components/ProductSlider/index.ts)

### DynamicProductSlider

Similar to `ProductSlider` except for the products being provided from a query instead of a predefined list. The user in Builder defines a set of parameters to be used for once the slider renders.

[Go to source](./src/components/DynamicProductSlider/index.ts)

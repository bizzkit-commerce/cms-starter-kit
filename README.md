# Bizzkit CMS Starter Kit

This is an example how to integrate Builder.io with the different Bizzkit applications. This code is not intended for production, but as a starting point for developing your own solution.

## Getting started

Update the `.env` file with information associated to your environment:

- `VITE_BUILDER_API_KEY`: Your Builder.io space public API [(documentation)](https://www.builder.io/c/docs/using-your-api-key#finding-your-public-api-key).
- `VITE_DAM_URL`: The CDN URL for Bizzkit DAM. Can be found by calling `GET /api/_/settings/cdn` in your DAM API instance.
- `VITE_SEARCH_URL`: The URL for Bizzkit Ecommerce Search API.

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

### ProductCatalogue

A simplified product list component, where users can filter, sort and paginate on products stored in [Bizzkit Ecommerce Search](https://docs.bizzkit.com/ecommerce-search/). If a search phrase in the Products field in Builder, then the search function in the component is omitted.

[Go to source](./src/components/ProductCatalogue/index.ts)

### ProductSlider

A collection of preselected products displayed in a carousel/slider arrangement. The component builds up from the component and API work present on `ProductCard`. When taking responsiveness, gestures, timers, etc. into consideration, sliders can get quite complicated to build, which aren't all considered in this implementation. It's then recommended that you build a more robust solution before taking it into production or use an 3rd-party library such as [Embla Carousel](https://www.npmjs.com/package/embla-carousel).

[Go to source](./src/components/ProductSlider/index.ts)

### DynamicProductSlider

Similar to `ProductSlider` except for the products being provided from a query instead of a predefined list. The user in Builder defines a set of parameters to be used for once the slider renders.

[Go to source](./src/components/DynamicProductSlider/index.ts)

## Sections

Sections allows you to create reusable content across multiple pages, such as a header. They can be targeted just like pages. For more detail, see Builder's [docs](https://www.builder.io/c/docs/integrate-section-building).

The example requires a section content model set up, called Header. The model has no fields.

[Go to source](./src/components/Header/Header.tsx)

## Structured data

Structured data is another way of working with Content in Builder. In short, it enables you to store reusable data in Builder without constraining it to a specific design or page. For more detail, see Builder's [docs](https://www.builder.io/c/docs/integrate-cms-data) or [explanation](https://www.builder.io/m/explainers/structured-data).

The example requires a structured data content model set up, called USP. The model should have a single field, `items` of type List - with two fields on an item, `label` of type Text and `link` of type Url.

[Go to source](./src/components/Usp/Usp.tsx)

## Styling

The website uses the [Material UI](https://mui.com/material-ui/) as its design system, while custom styling is defined using the library's own [sx](https://mui.com/system/getting-started/the-sx-prop/) property.

### Breakpoints

The breakpoints (screen sizes) defined in Material UI must [be set with matching values in Builder](https://www.builder.io/c/docs/customizable-breakpoints) for a consistent user experience:

- Desktop: **900** px and up
- Tablet: **600** px - **899** px
- Mobile: **599** px and below

These are just default values, and can be [customized](https://mui.com/material-ui/customization/theming) if necessary. The matching values should then be updated in Builder afterwards.

[Go to source](./src/util/theme.ts)

### Design tokens

The project exports the theme values used with Material UI into [Builder design tokens](https://www.builder.io/c/docs/design-tokens). This helps achieving consistency between components implemented in the project and content created in Builder.

[Go to source](./src/util/builder.ts)

## SEO

Some basic search engine optimizations can be achieved by adding the appropriate [meta tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) to the `<head>` element, such as description, keywords and open graph fields. This example extends the `Page` model in Builder with these fields that can be populated by content creators themselves, which then are rendered using the `<SeoMetadata>` component.

The example requires a page content model set up, called Page. The model should have the following fields:

- `title` of type Text
- `description` of type Long text
- `keywords` of type Tags
- `noIndex` of type Boolean
- `noFollow` of type Boolean
- `openGraphTitle` of type Text
- `openGraphDescription` of type Text
- `openGraphImage` of type Bizzkit dam file (see previous section of [components](#components))

[Go to source](./src/components/SeoMetadata/index.ts)

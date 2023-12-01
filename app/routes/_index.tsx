import {Link, useLoaderData} from '@remix-run/react';
import {type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function meta() {
  return [
    {title: 'bober | bedcodes'},
    {description: 'A Shopify storefront with bober theme by bedcodes'},
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections;
  return defer({featuredCollection});
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="w-full h-96 flex justify-center">
        <div className="content-max-width flex items-center">Hero Section</div>
      </div>
      <div className="w-full h-96 flex justify-center bg-gray-200">
        <div className="content-max-width flex flex-col">
          <h2 className="mt-4 text-xl">Featured Collections</h2>
          <div className="flex flex-col md:flex-row w-full justify-between mt-4">
            {data.featuredCollection.nodes.map((collection) => {
              return (
                <FeaturedCollection
                  key={collection.id}
                  collection={collection}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full h-96 flex justify-center">
        <div className="content-max-width flex items-center">Section 3</div>
      </div>
      <div className="w-full h-96 flex justify-center bg-gray-200">
        <div className="content-max-width flex items-center">Section 4</div>
      </div>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

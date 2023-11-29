export function meta() {
  return [
    {title: 'bober | bedcodes'},
    {description: 'A Shopify storefront with bober theme by bedcodes'},
  ];
}

export default function Index() {
  return (
    <div>
      <div className="w-full h-96 flex justify-center">
        <div className="content-max-width flex items-center">Section 1</div>
      </div>
      <div className="w-full h-96 flex justify-center bg-gray-200">
        <div className="content-max-width flex items-center">Section 2</div>
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

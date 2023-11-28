import {useLoaderData} from '@remix-run/react';
import {type LoaderFunctionArgs, json} from '@shopify/remix-oxygen';
import type {ShopFragment} from 'storefrontapi.generated';

type MetaObject = {
  metaobject: {
    fields: {
      key: string;
      type: string;
      value: string;
    }[];
    handle: string;
  };
};
type GlobalBannerPorps = {shop: ShopFragment; globalBanner: MetaObject};
type RichTextNode = {
  type: string;
  value?: string;
  url?: string;
  children?: RichTextNode[];
};

export default function GlobalBanner({shop, globalBanner}: GlobalBannerPorps) {
  if (!globalBanner) {
    return (
      <div className="w-full flex justify-center bg-primary py-2">
        <h3 className="text-primary-foreground text-sm flex">
          Welcome to {shop.name}.
        </h3>
      </div>
    );
  }
  const globalBannerData: RichTextNode = JSON.parse(
    globalBanner.metaobject.fields[0].value,
  ) as RichTextNode;
  const htmlResult: string = convertToHtml(globalBannerData);
  return (
    <div className="w-full flex justify-center bg-primary py-2">
      <div
        className="text-primary-foreground text-sm flex"
        dangerouslySetInnerHTML={{__html: htmlResult}}
      ></div>
    </div>
  );
}

// Convert the rich text structure to HTML
const convertToHtml = (node: RichTextNode): string => {
  if (node.type === 'root') {
    return (node.children ?? []).map(convertToHtml).join('');
  }
  if (node.type === 'paragraph') {
    return `<p>${(node.children ?? []).map(convertToHtml).join('')}</p>`;
  }
  if (node.type === 'text') {
    return node.value || '';
  }
  if (node.type === 'link' && node.url) {
    return `<a href="${node.url}"><u>${(node.children ?? [])
      .map(convertToHtml)
      .join('')}</u></a>`;
  }
  return '';
};

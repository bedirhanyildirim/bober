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
  const bannerContainerClass =
    'w-full h-auto min-h-[50px] flex justify-center items-center text-center bg-primary px-2 py-1';
  if (!globalBanner) {
    return (
      <div className={bannerContainerClass}>
        <WelcomeShop name={shop.name} />
      </div>
    );
  }
  return (
    <div className={bannerContainerClass}>
      <PrintGlobalBanner globalBanner={globalBanner} />
    </div>
  );
}

const WelcomeShop = (shopName: {name: string}) => {
  return (
    <h3 className="text-primary-foreground text-sm flex">
      Welcome to {shopName.name}.
    </h3>
  );
};

const PrintGlobalBanner = ({globalBanner}: {globalBanner: MetaObject}) => {
  const globalBannerData: RichTextNode = JSON.parse(
    globalBanner.metaobject.fields[0].value,
  ) as RichTextNode;
  const htmlResult: string = convertToHtml(globalBannerData);
  return (
    <div
      className="text-primary-foreground text-sm flex"
      dangerouslySetInnerHTML={{__html: htmlResult}}
    ></div>
  );
};

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

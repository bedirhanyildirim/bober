import {NavLink, useNavigate} from '@remix-run/react';
import type {HeaderQuery, ShopFragment} from 'storefrontapi.generated';
import type {LayoutProps} from './Layout';
import {useRootLoaderData} from '~/root';
import {Button} from './ui/button';
import {ShoppingCart} from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  return (
    <div className="flex justify-center bg-background text-foreground h-[60px] sticky top-0 border-b z-10">
      <DesktopHeader cart={cart} header={header} isLoggedIn={isLoggedIn} />
      <MobileHeader cart={cart} header={header} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  return (
    <nav className="hidden md:flex gap-4 ml-12" role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url = StripURL({primaryDomainUrl, itemURL: item.url});
        return (
          <NavLink
            className="cursor-pointer transition-colors"
            end
            key={item.id}
            prefetch="intent"
            to={url}
          >
            <p className="text-sm text-gray-800 hover:text-primary">
              {item.title}
            </p>
          </NavLink>
        );
      })}
    </nav>
  );
}

function StripURL({
  primaryDomainUrl,
  itemURL,
}: {
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  itemURL: string;
}) {
  const {publicStoreDomain} = useRootLoaderData();
  return itemURL.includes('myshopify.com') ||
    itemURL.includes(publicStoreDomain) ||
    itemURL.includes(primaryDomainUrl)
    ? new URL(itemURL).pathname
    : itemURL;
}

function DesktopHeader({header, isLoggedIn, cart}: HeaderProps) {
  return (
    <header className="content-max-width hidden md:flex items-center">
      <NavLink prefetch="intent" to="/" end>
        <img
          src={header.shop.brand?.logo?.image?.url}
          alt={header.shop.name.concat(' logo')}
          className="h-8"
        />
      </NavLink>
      <HeaderMenu
        menu={header.menu}
        primaryDomainUrl={header.shop.primaryDomain.url}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center gap-4 ml-auto" role="navigation">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          navigate('/account');
        }}
      >
        <p className="text-sm text-gray-800 hover:text-primary">
          {isLoggedIn ? 'Account' : 'Sign in'}
        </p>
      </Button>
      <Button
        variant="outline"
        size="smallIcon"
        onClick={() => {
          navigate('/cart');
        }}
      >
        <ShoppingCart className="h-4 w-auto" />
      </Button>
    </nav>
  );
}

function MobileHeader({header, isLoggedIn, cart}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="content-max-width flex md:hidden items-center justify-center">
      <HeaderMenuMobileToggle
        shop={header.shop}
        menu={header.menu}
        primaryDomainUrl={header.shop.primaryDomain.url}
      />
      <NavLink prefetch="intent" to="/" end>
        <img
          src={header.shop.brand?.logo?.image?.url}
          alt={header.shop.name.concat(' logo')}
          className="h-8 w-auto block"
        />
      </NavLink>
      <Button
        variant="ghost"
        size="smallIcon"
        className="ml-auto"
        onClick={() => {
          navigate('/cart');
        }}
      >
        <ShoppingCart className="h-5 w-auto block" />
      </Button>
    </header>
  );
}

function HeaderMenuMobileToggle({
  shop,
  menu,
  primaryDomainUrl,
}: {
  shop: ShopFragment;
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  return (
    <Dialog>
      <DialogTrigger className="mr-auto">
        <Button variant="ghost" size="smallIcon">
          <p className="text-xl">☰</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full h-full max-w-none md:h-fit md:max-w-lg"
        closeButton="header"
      >
        <DialogHeader className="">
          <DialogTitle className="flex justify-center -mt-3">
            <NavLink
              className="cursor-pointer transition-colors"
              end
              prefetch="intent"
              to="/"
              style={activeLinkStyle}
            >
              <img
                src={shop.brand?.logo?.image?.url}
                alt={shop.name.concat(' logo')}
                className="h-8 w-auto block"
              />
            </NavLink>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center gap-4">
          <NavLink
            className="cursor-pointer transition-colors"
            end
            prefetch="intent"
            to="/"
            style={activeLinkStyle}
          >
            <p className="text-gray-800 hover:text-primary">Home</p>
          </NavLink>
          <NavLink
            className="cursor-pointer transition-colors"
            end
            prefetch="intent"
            to="/account"
            style={activeLinkStyle}
          >
            <p className="text-gray-800 hover:text-primary">Account</p>
          </NavLink>
          {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
            if (!item.url) return null;
            const url = StripURL({primaryDomainUrl, itemURL: item.url});
            return (
              <NavLink
                className="cursor-pointer transition-colors"
                end
                key={item.id}
                prefetch="intent"
                to={url}
                style={activeLinkStyle}
              >
                <p className="text-gray-800 hover:text-primary">{item.title}</p>
              </NavLink>
            );
          })}
        </div>
        <DialogFooter className="sm:flex-col">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

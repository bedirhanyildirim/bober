import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from './Layout';
import {useRootLoaderData} from '~/root';
import {Button} from './ui/button';
import {ShoppingCart} from 'lucide-react';
import {Badge} from './ui/badge';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

type Viewport = 'desktop' | 'mobile';

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <div className="flex justify-center">
      <header className="content-max-width flex items-center bg-background text-foreground h-[64px] sticky top-0 z-[1]">
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
          <img
            src={shop.brand?.logo?.image?.url}
            alt={shop.name.concat(' logo')}
            className="h-8"
          />
        </NavLink>
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
        />
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </header>
    </div>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  viewport: Viewport;
}) {
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;

  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          className="cursor-pointer transition-colors"
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          <p className="text-sm text-gray-800 hover:text-primary">Home</p>
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="cursor-pointer transition-colors"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
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

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <SearchToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? (
          <Button variant="outline" size="sm">
            Account
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            Sign in
          </Button>
        )}
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return (
    <a href="#search-aside">
      <Button variant="outline" size="sm">
        Search
      </Button>
    </a>
  );
}

function CartBadge({count}: {count: number}) {
  return (
    <a href="#cart-aside">
      <Button variant="outline" size="sm" className="relative">
        <ShoppingCart className="h-4 w-4 block" />
        {count > 0 ? (
          <Badge variant="default" className="ml-1">
            {count}
          </Badge>
        ) : (
          ''
        )}
      </Button>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
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

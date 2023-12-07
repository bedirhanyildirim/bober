import {cn} from '~/utils';
import {ArrowRight} from 'lucide-react';

export default function FeaturedCollections() {
  const collections = [
    {
      bgClass: "bg-[url('public/stock/AOZ_3967.jpg')]",
      textColor: 'black',
      title: 'Shop our supplements',
      decription: 'Improve how you feel',
      url: '/',
    },
    {
      bgClass: "bg-[url('public/stock/black-seed-2.jpg')]",
      textColor: 'white',
      title: 'Herbal',
      decription: 'Discover the power of nature',
      url: '/',
    },
    {
      bgClass: "bg-[url('public/stock/D2.jpg')]",
      textColor: 'black',
      title: 'Vitamins & Minerals',
      decription: 'Get the fundamentals',
      url: '/',
    },
    {
      bgClass: "bg-[url('public/stock/AOZ_3706.jpg')]",
      textColor: 'white',
      title: 'Specials',
      decription: 'Look what we developed for you',
      url: '/',
    },
    {
      bgClass: "bg-[url('public/stock/bundle-2.jpg')]",
      textColor: 'black',
      title: 'Bundles',
      decription: 'Get all you need at once',
      url: '/',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 hover:cursor-pointer px-2">
      {collections.map((c) => {
        return (
          <div
            key={c.title}
            className="group min-h-[280px] rounded first:row-span-2 overflow-hidden relative hover:shadow-md transition-all transform-gpu"
          >
            <div className="absolute shrink-0 w-full h-full transition-all transform-gpu group-hover:scale-105">
              <div
                className={cn(
                  'w-full h-full bg-cover bg-center bg-no-repeat',
                  c.bgClass,
                )}
              ></div>
            </div>
            <div
              className={cn('h-full z-[1] flex flex-col p-6 relative', {
                'text-white': c.textColor === 'white',
                'text-black': c.textColor === 'black',
              })}
            >
              <div className="text-xl font-medium mb-2">{c.title}</div>
              <div className="text-sm mb-2">{c.decription}</div>
              <div className="mt-auto">
                <ArrowRight className="h-6 w-auto transition-all transform-gpu group-hover:translate-x-2" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

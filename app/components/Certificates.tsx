import dairyFree from 'public/icons/dairy_free.png';
import glutenFree from 'public/icons/gluten_free.png';
import gmoFree from 'public/icons/gmo_free.png';
import sugarFree from 'public/icons/sugar_free.png';
import gmp from 'public/icons/gmp.png';
import iso from 'public/icons/iso.png';

export default function Certificates() {
  const certificateIcons = [
    {src: dairyFree, alt: 'Dairy Free'},
    {src: glutenFree, alt: 'Gluten Free'},
    {src: gmoFree, alt: 'GMO Free'},
    {src: sugarFree, alt: 'Sugar Free'},
    {src: gmp, alt: 'Good Manufacturing Practice'},
    {src: iso, alt: 'ISO 22000'},
  ];

  return (
    <div className="w-full grid gap-10 sm:gap-6 grid-cols-3 sm:grid-cols-6">
      {certificateIcons.map((c) => {
        return (
          <div
            className="flex items-center justify-center transition-all"
            key={c.alt}
          >
            <img
              alt={c.alt}
              src={c.src}
              className="aspect-square sm:w-24 transition-all md:hover:scale-105 transform-gpu"
            />
          </div>
        );
      })}
    </div>
  );
}

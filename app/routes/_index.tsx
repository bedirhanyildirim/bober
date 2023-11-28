import {Button} from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {Mail} from 'lucide-react';

export function meta() {
  return [
    {title: 'bober | bedcodes'},
    {description: 'A Shopify storefront with bober theme by bedcodes'},
  ];
}

export default function Index() {
  return (
    <div>
      <h1 className="font-normal">This is homepage </h1>
      <Dialog>
        <DialogTrigger>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Click me
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Natalia look at this</DialogTitle>
            <DialogDescription>Innit aweseome?</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <p className="text-5xl">😜</p>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

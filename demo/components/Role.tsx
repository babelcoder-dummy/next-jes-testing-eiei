import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { range } from 'lodash';
import Image from 'next/image';

const Role = () => {
  return (
    <section>
      <header>
        <h2 className="text-center text-4xl font-bold">My Header with Role</h2>
      </header>
      <Separator className="my-4"></Separator>
      <div className="grid grid-cols-3 gap-4">
        {range(6).map((n) => (
          <Card key={n}>
            <div className="relative h-40">
              <Image
                priority
                src="/assets/images/no-image.jpg"
                alt="No Image"
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                className="object-cover"
              ></Image>
            </div>
            <CardHeader>
              <CardTitle>Title {n}</CardTitle>
              <CardDescription>Description {n}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content {n}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Hey guy!</DialogTitle>
                    <DialogDescription>The product ID is {n}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Role;

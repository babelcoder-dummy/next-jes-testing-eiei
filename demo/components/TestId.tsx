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

const TestID = () => {
  return (
    <section>
      <header>
        <h2 data-testid="title" className="text-center text-4xl font-bold">
          My Header with Test ID
        </h2>
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
                data-testid={`product-image-${n}`}
                className="object-cover"
              ></Image>
            </div>
            <CardHeader>
              <CardTitle data-testid={`product-title-${n}`}>
                Title {n}
              </CardTitle>
              <CardDescription data-testid={`product-desc-${n}`}>
                Description {n}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p data-testid={`product-content-${n}`}>Content {n}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    data-testid={`product-details-${n}`}
                  >
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle data-testid={`dialog-title-${n}`}>
                      Hey guy!
                    </DialogTitle>
                    <DialogDescription data-testid={`dialog-desc-${n}`}>
                      The product ID is {n}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        data-testid={`dialog-close-${n}`}
                        type="button"
                        variant="secondary"
                      >
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

export default TestID;

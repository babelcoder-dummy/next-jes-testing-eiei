'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getServerImagePath } from '@/lib/image';
import type * as models from '@/models/products';
import * as validators from '@/validators/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import ImageUploader from '../../shell/ImageUploader';

type ProfileFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<models.CreateProductForm>;
    }
  | {
      kind: 'edit';
      product: models.Product;
      onSubmit: SubmitHandler<models.UpdateProductForm>;
    };

const ProfileForm = (props: ProfileFormProps) => {
  const { kind, onSubmit } = props;
  const form = useForm<
    typeof onSubmit extends SubmitHandler<models.CreateProductForm>
      ? models.CreateProductForm
      : models.UpdateProductForm
  >({
    resolver: zodResolver(
      kind === 'create' ? validators.createProduct : validators.updateProduct,
    ),
    defaultValues:
      kind === 'edit'
        ? {
            name: props.product.name,
            desc: props.product.desc,
            price: props.product.price,
          }
        : { name: '', desc: '', price: 0 },
  });

  const onImageChanged = (file: File) => {
    form.setValue('image', file, { shouldValidate: true });
  };

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-4 border-b border-dotted pb-4 text-center text-3xl font-bold">
        {kind == 'create' ? 'Create Product' : 'Edit Product'}
      </h2>
      <Form {...form}>
        <ImageUploader
          defaultImage={
            props.kind === 'edit'
              ? getServerImagePath(props.product.image)
              : '/assets/images/no-image.jpg'
          }
          onImageChanged={onImageChanged}
          error={form.formState.errors.image?.message}
        ></ImageUploader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="1989 Album" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1989" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="1989 (Taylor's Version)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="absolute right-0">
            {kind.toUpperCase()}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;

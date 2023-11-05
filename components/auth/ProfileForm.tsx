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
import type * as models from '@/models/auth';
import * as schemas from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ImageUploader from '../shell/ImageUploader';

interface ProfileFormProps {
  profile: models.Profile;
  onSubmit: (profile: models.ProfileForm) => void;
}

const ProfileForm = ({
  profile: { email, name, tel, address, avatar },
  onSubmit,
}: ProfileFormProps) => {
  const form = useForm<models.ProfileForm>({
    resolver: zodResolver(schemas.profile),
    defaultValues: {
      email,
      name: name ?? '',
      tel: tel ?? '',
      address: address ?? '',
    },
  });

  const onImageChanged = (file: File) => {
    form.setValue('avatar', file, { shouldValidate: true });
  };

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-4 border-b border-dotted pb-4 text-center text-3xl font-bold">
        Update Profile
      </h2>
      <Form {...form}>
        <ImageUploader
          defaultImage={
            avatar ? getServerImagePath(avatar) : '/assets/images/avatar.png'
          }
          onImageChanged={onImageChanged}
          error={form.formState.errors.avatar?.message}
          rounded
        ></ImageUploader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="taylor@swift.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Taylor Swift" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tel</FormLabel>
                <FormControl>
                  <Input placeholder="081-111-1111" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="19/89" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="absolute right-0">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;

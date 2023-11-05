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
import type * as models from '@/models/auth';
import * as schemas from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface AuthFormProps {
  title: string;
  onSubmit: (credentials: models.Credentials) => void;
}

const AuthForm = ({ title, onSubmit }: AuthFormProps) => {
  const form = useForm<models.Credentials>({
    resolver: zodResolver(schemas.credentials),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-4 border-b border-dotted pb-4 text-center text-3xl font-bold">
        {title}
      </h2>
      <Form {...form}>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="secret-password"
                    {...field}
                  />
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

export default AuthForm;

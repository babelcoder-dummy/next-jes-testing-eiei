'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLogout, useProfile } from '@/api/client/auth';
import CartButton from '@/components/cart/CartButton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getServerImagePath } from '@/lib/image';
import { usePathname } from 'next/navigation';
import AuthActionGuard from './AuthActionGuard';

const Header = () => {
  const pathname = usePathname();
  const { data: profile } = useProfile();
  const logout = useLogout();
  const avatar = profile?.avatar
    ? getServerImagePath(profile.avatar)
    : '/assets/images/avatar.png';

  return (
    <nav className="flex w-full items-center justify-between p-4 shadow-md shadow-black/5 lg:flex-wrap lg:justify-start">
      <Link href="/" className="lg:px-2">
        <Image
          priority
          src="/assets/images/logo.png"
          alt="Babel Shopping"
          width={50}
          height={50}
        />
      </Link>
      <Button
        variant={pathname.startsWith('/products') ? 'secondary' : 'ghost'}
        asChild
      >
        <Link href="/products">Products</Link>
      </Button>
      <AuthActionGuard roles={['ADMIN', 'MODERATOR']}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={pathname.startsWith('/admin') ? 'secondary' : 'ghost'}
            >
              Admin
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/admin">Products</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </AuthActionGuard>
      <div className="mx-4 ml-auto h-[40px] w-[1px] bg-gray-300"></div>
      <CartButton></CartButton>
      <DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-none">
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={avatar}
                  alt={profile?.name ?? 'Anonymous User'}
                ></AvatarImage>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          {profile ? (
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/auth/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem asChild>
                <span onClick={logout}>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </DropdownMenu>
    </nav>
  );
};

export default Header;

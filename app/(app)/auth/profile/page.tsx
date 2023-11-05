import Profile from '@/components/auth/Profile';
import AuthRouteGuard from '@/components/shell/AuthRouteGuard';

const ProfilePage = () => {
  return (
    <AuthRouteGuard>
      <Profile></Profile>
    </AuthRouteGuard>
  );
};

export default ProfilePage;

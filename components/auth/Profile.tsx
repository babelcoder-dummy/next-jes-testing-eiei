'use client';

import { useEditProfile, useProfile } from '@/api/client/auth';
import type * as models from '@/models/auth';
import { useAppStore } from '@/store/store';
import ProfileForm from './ProfileForm';

const Profile = () => {
  const setUiToast = useAppStore((state) => state.setUiToast);
  const { data: profile } = useProfile();
  const editProfile = useEditProfile();

  const updateProfile = async (profile: models.ProfileForm) => {
    await editProfile(profile);
    setUiToast({
      type: 'Success',
      message: 'Your profile has already been updated',
    });
  };

  if (!profile) return <div>Loading...</div>;
  return <ProfileForm profile={profile} onSubmit={updateProfile}></ProfileForm>;
};

export default Profile;

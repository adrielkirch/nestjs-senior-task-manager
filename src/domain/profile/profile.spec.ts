import { Profile, ProfileProps } from './profile';

const newProfile: ProfileProps = {
  biography: 'Any biography',
  notifications: ['preference1', 'preference2'],
  gender: 'female',
  image: 'https://example.com/image.png',
  userId: '123',
};

describe('Profile Unit Tests', () => {
  it('should create a profile with default id', () => {
    const profile = Profile.create(newProfile);
    expect(profile.id).toBeDefined();
    expect(profile.biography).toBe(newProfile.biography);
    expect(profile.notifications).toEqual(newProfile.notifications);
    expect(profile.gender).toBe(newProfile.gender);
    expect(profile.image).toBe(newProfile.image);
    expect(profile.userId).toBe(newProfile.userId);
  });

  it('should create a profile with provided id', () => {
    const customId = 'customId';
    const profile = Profile.create(newProfile, customId);
    expect(profile.id).toBe(customId);
    expect(profile.biography).toBe(newProfile.biography);
    expect(profile.notifications).toEqual(newProfile.notifications);
    expect(profile.gender).toBe(newProfile.gender);
    expect(profile.image).toBe(newProfile.image);
    expect(profile.userId).toBe(newProfile.userId);
  });

  it('should update biography', () => {
    const profile = Profile.create(newProfile);
    const updatedBiography = 'Updated biography';
    profile.updateBiograpyhy(updatedBiography);
    expect(profile.biography).toBe(updatedBiography);
  });

  it('should update notifications', () => {
    const profile = Profile.create(newProfile);
    const updatedNotifications = ['updatedPref1', 'updatedPref2'];
    profile.updateNotifications(updatedNotifications);
    expect(profile.notifications).toEqual(updatedNotifications);
  });

  it('should update gender', () => {
    const profile = Profile.create(newProfile);
    const updatedGender = 'male';
    profile.gender = updatedGender;
    expect(profile.gender).toBe(updatedGender);
  });

  it('should update image', () => {
    const profile = Profile.create(newProfile);
    const updatedImage = 'https://example.com/updated-image.png';
    profile.updateImage(updatedImage);
    expect(profile.image).toBe(updatedImage);
  });

  it('should convert profile to JSON', () => {
    const profile = Profile.create(newProfile);
    const json = profile.toJSON();
    expect(json).toEqual({
      id: profile.id,
      biography: newProfile.biography,
      notifications: newProfile.notifications,
      gender: newProfile.gender,
      image: newProfile.image,
      userId: newProfile.userId,
    });
  });
});

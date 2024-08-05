export const userImage = (
  userImg: string | undefined,
  userType: 'employer' | 'helper' | undefined
) => {
  return userImg
    ? userImg
    : userType === 'employer'
    ? '/images/company-avatar.png'
    : '/images/user-avatar.png';
};

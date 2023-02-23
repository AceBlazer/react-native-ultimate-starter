import {UserInfo} from '../../types/user.type';

const user = () => {
  let userInfo: UserInfo | null = null;

  const setUserInfo = (_userInfo: UserInfo) => {
    userInfo = _userInfo;
  };

  const getUserInfo = () => {
    if (!userInfo) {
      throw new Error('getUserInfo: no userInfo');
    }
    return userInfo;
  };

  return {
    setUserInfo,
    getUserInfo,
  };
};

const connectedUser = user();

export default connectedUser;

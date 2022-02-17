import React from 'react';
import './signUpComplete.scss';
import ReactConfetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import signUpIcon from '../../../assets/svg/sign-up-success.svg';

const SignUpComplete = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="signUpComplete">
      <ReactConfetti width={width} height={height} recycle={false} />
      <div>
        <img src={signUpIcon} alt="user-icon" />
      </div>
      <p>Вы успешно зарегистрировались!</p>
    </div>
  );
};

export default SignUpComplete;

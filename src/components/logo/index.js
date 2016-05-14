import React from 'react';
import LogoImage from '../../assets/rangleio-logo.svg';

function Logo() {
  return (
    <div className="flex items-center">
      <img style={ styles }
        src={ LogoImage }
        data-ref="logo-image"
        alt="Rangle.io" />
    </div>
  );
}

const styles = { width: 128 };

export default Logo;

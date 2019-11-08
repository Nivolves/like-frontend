import React, { useEffect } from 'react';
import Fingerprint2 from 'fingerprintjs2';

import { useRootData } from '../../hooks/useRootData';

import { ADD_USER, API } from '../../constants/api';

const INSERT_USER = `${API}${ADD_USER}`;

const Fingerprint: React.FC = (): JSX.Element => {
  const { userId } = useRootData(({ userId }) => ({ userId }));

  const options = { excludes: { userAgent: true, enumerateDevices: true } };

  useEffect(() => {
    if (window.localStorage.getItem('id')) {
      userId.set(window.localStorage.getItem('id') || '');
    } else {
      Fingerprint2.get(options, components => {
        const values = components.map(component => component.value);
        const result = Fingerprint2.x64hash128(values.join(''), 31);
        userId.set(result);
        window.localStorage.setItem('id', result);
        const payload = { id: result };
        fetch(INSERT_USER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      });
    }
  }, [userId, options]);

  return <></>;
};

export default Fingerprint;

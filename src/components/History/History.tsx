import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Spin } from 'antd';
import { toJS } from 'mobx';

import { useRootData } from '../../hooks/useRootData';

import { API, HISTORY } from '../../constants/api';

import './History.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 56 }} spin />;

const GET_HISTORY = `${API}${HISTORY}`;

const History: React.FC = () => {
  const { history, setHistory, userId } = useRootData(({ history, setHistory, userId }) => ({
    setHistory,
    history: history.get().reverse(),
    userId: userId.get(),
  }));

  useEffect(() => {
    if (userId) {
      fetch(`${GET_HISTORY}/${userId}`)
        .then(res => res.json())
        .then(result => setHistory(result))
        .catch(err => console.error(err));
    }
  }, [setHistory, userId]);

  return (
    <div className="content">
      {toJS(history).length ? (
        <div className="history-container">
          {toJS(history).map(({ id, query }, index) => {
            return (
              <Link
                to={`/query/${query}`}
                key={id}
                className={`history-item history-item-${index % 2 === 0 ? 'pair' : 'not-pair'}`}
              >
                {query}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="spin">
          <Spin indicator={antIcon} />
        </div>
      )}
    </div>
  );
};

export default History;

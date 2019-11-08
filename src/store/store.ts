import { observable } from 'mobx';

import { IHistory, ILike, IPhoto } from '../Types/common';

import { API, API_KEY, HISTORY, LIKE, PHOTO_API } from '../constants/api';

const HISTORY_ACT = `${API}${HISTORY}`;
const LIKE_ACT = `${API}${LIKE}`;

export const createStore = () => {
  const store = {
    history: observable.box<IHistory[]>([]),
    likes: observable.box<number[]>([]),
    photos: observable.box<IPhoto[]>([]),
    query: observable.box<string>(''),
    userId: observable.box<string>(''),

    addPhotos(photos: IPhoto[]): void {
      this.photos.set(photos);
    },

    addLike(id: number) {
      this.likes.set([...this.likes.get(), id]);

      const payload = { id, userId: this.userId.get() };
      fetch(LIKE_ACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    },

    addLikes(likes: ILike[]) {
      const photos = likes.reduce((pictures: number[], { id }: ILike): number[] => {
        pictures.push(id);
        return pictures;
      }, []);
      this.likes.set(photos);
    },

    deleteLike(id: number) {
      this.likes.set([...this.likes.get().filter(photo => photo !== id)]);
      const payload = { id, userId: this.userId.get() };
      fetch(LIKE_ACT, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },

    setHistory(hisory: IHistory[]) {
      this.history.set(hisory);
    },

    setQuery(query: string) {
      this.query.set(query);
    },

    setQueryPhotos() {
      const historyQuery = {
        id: +Date.now(),
        userId: this.userId.get(),
        query: this.query.get(),
      };

      fetch(`${PHOTO_API}${API_KEY}&q=${this.query.get()}`)
        .then(res => res.json())
        .then(({ hits }) => this.addPhotos(hits))
        .catch(err => console.error(err));

      this.history.set([...this.history.get(), historyQuery]);

      fetch(HISTORY_ACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyQuery),
      });
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;

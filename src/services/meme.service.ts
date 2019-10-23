import { Meme } from 'MyModels';
import { of, Observable, from } from 'rxjs';
import DefaultClient, { gql } from 'apollo-boost';

const LOAD_MEMES = gql`
  {
    memes(where: { NOT: { photo: null } }) {
      id
      photo {
        url(
          transformation: {
            image: { resize: { width: 600, height: 600, fit: crop } }
          }
        )
      }
    }
  }
`;

export class MemeService {
  constructor(private graphql: DefaultClient<unknown>) {}

  public all(): Observable<Meme[]> {
    return from(
      this.graphql
        .query({ query: LOAD_MEMES })
        .then(result => result.data.memes)
    );
  }

  public all2(): Observable<Meme[]> {
    return of([
      {
        id: 'asd',
        photo: {
          url:
            'https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg',
        },
      },
      {
        id: 'asd2',
        photo: {
          url:
            'https://www.medicalnewstoday.com/content/images/articles/326/326485/kitten.jpg',
        },
      },
    ]);
  }
}

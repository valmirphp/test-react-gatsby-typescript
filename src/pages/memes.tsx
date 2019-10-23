import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Meme as Model } from 'MyModels';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { loadMemesAsync } from '../features/memes';

type State = {
  loading: boolean;
  memes: Model[];
};

type Props = {
  location: Location;
};

const Memes: React.FC<Props> = ({ location }) => {
  const dispatch = useDispatch();
  const { memes, loading } = useSelector<RootState, State>(s => s.memes);

  useEffect(() => {
    dispatch(loadMemesAsync.request());
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout location={location} title="Meme test">
      <SEO title="Meme test" />
      <div>rick</div>
      {memes.map(m => (
        <img src={m.photo.url} key={m.id} />
      ))}
    </Layout>
  );
};

export default Memes;

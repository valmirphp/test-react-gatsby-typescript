import React from 'react';
import { graphql } from 'gatsby';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

type Props = {
  location: Location;
  data: {
    rickAndMorty: {
      character: any;
    };
  };
};

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  {
    rickAndMorty {
      character(id: 1) {
        name
        image
      }
    }
  }
`;

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    meme(where: { id: "cjke2xlf9nhd90953khilyzja" }) {
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

const TemplateRickAndMorty: React.FC<Props> = ({
  data: {
    rickAndMorty: { character },
  },
  location,
}) => {
  const { loading, error, data } = useQuery(APOLLO_QUERY);

  return (
    <Layout location={location} title="Rick And Morth">
      <SEO title="Rick And Morth" />
      <div>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          TEMPLATE
        </h3>
        <div
          style={{ textAlign: 'center', width: '600px', margin: '50px auto' }}
        >
          <h1>{character.name} With His Friend Sara</h1>
          <p>
            Rick & Morty API data loads at build time. Sara Vieira’s meme API
            loads at runtime.
          </p>
          <div>
            <img
              src={character.image}
              alt={character.name}
              style={{ width: 300 }}
            />

            {loading && <p>Loading Sara...</p>}
            {error && <p>Error: ${error.message}</p>}
            {data && data.meme && data.meme.photo && (
              <img
                src={data.meme.photo.url}
                alt="Sara Vieira"
                style={{ maxWidth: 300 }}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateRickAndMorty;

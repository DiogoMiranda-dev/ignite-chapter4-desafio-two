import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async function loadImages({ pageParam = null }) {
      const response = await api.get('api/images', {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    },
    {
      getNextPageParam: ({ after }) => {
        if (after) {
          return after;
        }
        return null;
      },
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages.flatMap(d => d.data);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box w="100%" px={20} my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            my={5}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}

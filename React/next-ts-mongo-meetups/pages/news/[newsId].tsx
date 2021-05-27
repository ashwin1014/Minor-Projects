import { FC } from 'react';
import { useRouter } from 'next/router';

const DetailsPage: FC = () => {

  const router = useRouter();
  console.log(router);

  return (
        <div>
            <h1>Details Page {router.query.newsId}</h1>
        </div>
  )
}

export default DetailsPage

import Image from 'next/image';

import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skeleton from '../../components/Skeleton';


const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const resp = await client.getEntries({ content_type: "recipe" });

  const paths = resp.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: true
  }
};

export async function getStaticProps(context) {
  const { params } = context;
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "recipe", 'fields.slug': params.slug })

  if(!res.items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      recipe: res.items[0],
    },
    revalidate: 5 //time in sec
  }
}

export default function RecipeDetails(props) {
  const { recipe } = props;
  // console.log(recipe)

  if(!recipe) return <Skeleton />

  const { title, featuredImage, cookingTime, ingredients, method } = recipe.fields;

  return (
    <div>
      <div className='banner'>
          <Image className='object-fit-cover' src={`https:${featuredImage.fields.file.url}`} width={500} height={700} />
          <h2>{title}</h2>
      </div>
      <div className='info'>
        <p>Takes about {cookingTime} mins to cook</p>
        <h3>Ingredients:</h3>
        {
          (ingredients || []).map(ing => (
            <span key={ing}>{ing}</span>
          ))
        }
      </div>
      <div className='method'>
        <h3>Method:</h3>
        {documentToReactComponents(method)}
      </div>
      <style jsx>{`
          h2,h3 {
            text-transform: uppercase;
          }
          .banner {
            display: flex;
            flex-direction: column;
          }
          .banner .banner-image {
            object-fit: cover;
          }
          .banner h2 {
            margin: 0;
            background: #fff;
            display: inline-block;
            padding: 20px;
            position: relative;
            top: -60px;
            left: -10px;
            transform: rotateZ(-1deg);
            box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
            max-width: 400px;
            width: auto;
            text-align: center
          }
          .info p {
            margin: 0;
          }
          .info span::after {
            content: ", ";
          }
          .info span:last-child::after {
            content: ".";
          }
      `}</style>
    </div>
  )
}
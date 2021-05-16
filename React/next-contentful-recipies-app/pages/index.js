import { createClient } from 'contentful'

import RecipeCard from '../components/RecipeCard'

export async function getStaticProps() {

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "recipe" })

  return {
    props: {
      recipes: res.items,
    }
  }
}

export default function Recipes(props) {
  console.log(props)
  const { recipes } = props;

  return (
    <div className="recipe-list">
      {
        recipes && (recipes || []).map(recipe => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))
      }
      <style jsx>
         {
           `
            .recipe-list {
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 20px 60px;
            }
           `
         }
      </style>
    </div>
  )
}
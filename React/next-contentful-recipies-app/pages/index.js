import { createClient } from 'contentful'

import RecipeCard from '../components/RecipeCard'

export async function getStaticProps() {

  const client = createClient({
    space: 'l2fo7q87x38p',
    accessToken: 'KUhN3H4u9mskj9GMOYbdT3hcwY_o5QbLYPgCM8mK1KQ',
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
    </div>
  )
}
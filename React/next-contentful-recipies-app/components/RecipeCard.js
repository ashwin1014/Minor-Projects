import { memo } from 'react';
import Link from 'next/link';

const RecipeCard = ({ recipe }) => {
    const { slug, cookingTime, thumbnail, title } = recipe.fields;
    return (
        <div className='card'>
           <div className='featured'>

           </div>
           <div className='content'>
               <div className='info'>
                   <h4>{title}</h4>
                   <p>Takes approx { cookingTime } to make</p>
               </div>
           </div>
           <div className='actions'>
               <Link href={`/recipes/slug`}><a>Cook This</a></Link>
           </div>
        </div>
    )
}

export default memo(RecipeCard);

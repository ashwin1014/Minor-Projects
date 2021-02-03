import { useState, useMemo, useRef, useCallback } from 'react';

import useItemSearch from './hooks/useItemSearch';
import { Wrapper } from './style';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { loading, error, items, hasMore } = useItemSearch(search, page)

  const observer = useRef();

  const prevElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    })
    if (node) observer.current.observe(node)
    console.log(node)
  }, [loading, hasMore]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  }


  const bookList = useMemo(() => ([...new Set([...items?.map((i) => i.title)])]), [items])

  return (
    <Wrapper>
        <input type='text' onChange={handleSearch} value={search}/>
        <ul>
          {
            (bookList || []).map((item, i) => {
              if (bookList.length === i + 1) {
                return <li ref={prevElementRef} key={item}>{item}</li>
              }
              return <li key={item}>{item}</li>
            })
          }
        </ul>
         {
           loading && <div>Loading...</div>
         }
         {
           error && <div>{error}</div>
         }
    </Wrapper>
  )
}

export default App

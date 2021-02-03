import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://openlibrary.org/search.json';

const useItemSearch = (query, pageNum) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [items, setItems] = useState([]);
   const [hasMore, setHasMore] = useState(false);

    const cancel = useRef;
    const fetchItems = useCallback(async () => {
        try {
            setLoading(true);
            const resp = await axios({
                method: 'GET',
                url: API_URL,
                params: { q: query, page: pageNum },
                cancelToken: new axios.CancelToken((c) => cancel.current = c)

            });
            // console.log(resp?.data?.docs);
            // console
            const hasData = resp?.data?.docs?.length > 0;
            console.log('hasData', hasData)
            if (hasData) {
                setItems((prev) => {
                    return [...prev, ...resp.data.docs]
                })
            }
            setHasMore(hasData);
        } catch (e) {
            if (axios.isCancel(e)) return;
            setError(e);
        } finally {
            setLoading(false);
        }
    }, [cancel, pageNum, query])

    useEffect(() => {
        setItems([]);
    }, [query])

    useEffect(() => {
     fetchItems()
     return () => cancel.current()
    }, [query, pageNum, fetchItems, cancel])

    return { loading, error, items, hasMore }
}

export default useItemSearch

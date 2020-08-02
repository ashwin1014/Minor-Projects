import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref();
    const imageRef = storageRef.child(file.name); 
    // add to database collection
    const collectionRef = projectFirestore.collection('images');
    
    imageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const downloadURL = await imageRef.getDownloadURL();
      const createdAt = timestamp();
      await collectionRef.add({ url: downloadURL, createdAt });
      setUrl(downloadURL);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;
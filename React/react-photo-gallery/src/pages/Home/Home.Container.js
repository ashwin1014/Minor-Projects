import React from 'react';

import './Home.style.scss';
import Title from './Components/Title';
import UploadForm from './Components/UploadForm';
import ImageGrid from './Components/ImageGrid';
import Modal from './Components/Modal';


const Home = () => {
  const [selectedImg, setSelectedImg] = React.useState(null);
  return (
    <div className='app'>
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
     {
       selectedImg &&  <Modal src={selectedImg} setSelectedImg={setSelectedImg} />
     }
    </div>
  );
};

export default Home;

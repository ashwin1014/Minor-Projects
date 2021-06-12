import MeetupList from '../components/meetups/MeetupList';

export interface Data {
  image: string | undefined;
  title: string | undefined;
  address: string | undefined;
  description: string | undefined;
  id?: string | undefined;
}

const DUMMY_MEETUPS: Data[] = [
  {
    id: 'm1',
    title: 'Kazirangs National Park',
    image: 'https://www.alightindia.com/CDN/Content/Images/PostImages/ORIGINAL/kp1--9fc463.jpg',
    address: 'Kanchanjuri, Assam 784177',
    description: 'Kaziranga National Park is a protected area in the northeast Indian state of Assam. Spread across the floodplains of the Brahmaputra River, its forests, wetlands and grasslands are home to tigers, elephants and the world’s largest population of Indian one-horned rhinoceroses.'
  },
  {
    id: 'm2',
    title: 'Manas National Park',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Manas_National_Park.jpg/1024px-Manas_National_Park.jpg',
    address: 'Manas Road, Barangabari Gyati Village, Dist Baksa, Gobardhana, Assam 781315',
    description: 'Manas National Park or Manas Wildlife Sanctuary is a national park, UNESCO Natural World Heritage site, a Project Tiger reserve, an elephant reserve and a biosphere reserve in Assam, India'
  }
];


const Home = ({ meetups }: {meetups: Data[]  }): JSX.Element=> {
  console.log(meetups)
  // const [state, setState] = useState<Data[] | []>([]);

  // useEffect(() => {
  //   setState(DUMMY_MEETUPS)
  // }, []);

  return (
        <>
            <MeetupList meetups={meetups} />
        </>
  )
}

export async function getStaticProps() {

  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10
  }
}

export default Home

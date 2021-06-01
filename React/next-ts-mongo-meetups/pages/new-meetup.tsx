import NewMeetupForm from "../components/meetups/NewMeetupForm";

import { Props } from '../components/meetups/MeetupItem';

const NewMeetup = () => {

  const onAddMeetup = (formData: Props) => {
    console.log(formData);
  };

  return <NewMeetupForm onAddMeetup={onAddMeetup} />
};

export default NewMeetup;


import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head'

function NewMeetupPage() {

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

    }

    return <Fragment>
        <Head>
            <title>Add a new meetup</title>
            <meta
                name='description'
                content='Browse a huge list of active meetups places in pakistan'
            />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
}

export default NewMeetupPage;
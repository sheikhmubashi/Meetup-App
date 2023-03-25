import { MongoClient } from 'mongodb'
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'

function HomePage(props) {
    return <Fragment>
        <Head>
            <title>Meetup App</title>
            <meta
                name='description'
                content='Browse a huge list of active meetups places in pakistan'
            />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>
}
// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     }
// }


export async function getStaticProps() {
    const client = await MongoClient.connect(
        'mongodb+srv://mubashir:smubashir@mubashircluster.9xg78.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}
export default HomePage
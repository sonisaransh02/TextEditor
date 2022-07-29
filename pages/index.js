import Head from 'next/head'
import { useState } from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import Icon from '@material-tailwind/react/Icon';
import Button from '@material-tailwind/react/Button';
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter';
import { db } from "../firebase";
import Login from '../components/Login';
import firebase from 'firebase';
import DocumentRow from '../components/DocumentRow';
import { getSession, useSession } from 'next-auth/client';


export default function Home() {
  const [session] = useSession();
 if(!session) return <Login />

 
 const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState("");
    const [snapshot] = useCollectionOnce(
      db.collection("userDocs")
          .doc(session.user.email)
          .collection("docs")
          .orderBy("timestamp", "desc")
  );

  const createDocument = () => {
      if (!input)
          return;

      db.collection("userDocs")
          .doc(session.user.email)
          .collection("docs")
          .add({
              fileName: input,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });

      setInput('');
      setShowModal(false);
      window.location.reload();
  };
    const modal = (
        <Modal
            size="sm"
            active={showModal}
            toggler={() => setShowModal(false)}
        >
            <ModalBody>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    className="outline-none w-full"
                    placeholder="Enter the document name ..."
                    onKeyDown={(e) => e.key === "Enter" && createDocument()}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    color="blue"
                    buttonType="link"
                    onClick={(e) => setShowModal(false)}
                    ripple="dark"
                >
                    Cancel
                </Button>
                <Button
                    color="blue"
                    onClick={createDocument}
                    ripple="light"
                >
                    Create
                </Button>
            </ModalFooter>
        </Modal>
    )



  return (
    <div>
      <Head>
        <title>Text Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}

      <section className='bg-[#F8F9FA] pb-10
       px-10'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center justify-between py-6'>
            <h2 className='text-gray-700 text-lg'>
            Start new doc</h2>
            <Button 
              color="gray"
              buttonType="outline"
              rounded={true}
              ripple="dark"
              className="border-0"
            > 
            <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div onClick={() => setShowModal(true)} className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
            <Image src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" 
              layout='fill'/>
              </div>
              <div>
                <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Blank
                </p>
              </div>       
          </div>
        </div>
       </section>
       <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm
         text-gray-700'>
         <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow'>My Docs</h2>
            <h2 className='mr-12'>Date Created</h2>
            <Icon name="folder" size="3xl" color="gray" /> 
         </div>
         {snapshot?.docs.map(doc => (
          <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
          />
      ))}
        </div>
       
       </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props : {
      session,
    },
  };
}

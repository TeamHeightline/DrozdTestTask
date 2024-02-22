import React from 'react';

export const getServerSideProps = async () => {
    return {
        redirect: {
            destination: '/quiz',
            permanent: true,
        },
    };
};

export default function Home() {
    return (
        <div>

        </div>
    );
}

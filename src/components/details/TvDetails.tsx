import { useApiData } from 'hooks';
import React from 'react'

type Props = {
    data: JSON
}

const TvDetails = ({ data }: Props) => {

    console.log(data);


    return (
        <section className="bg-white dark:bg-gray-900 ">

            <h1> hello </h1>



        </section>
    )
}

export default TvDetails
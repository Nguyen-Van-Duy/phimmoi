import React from 'react';

const VoteAverage = ({dataDetails}) => {

    const voteAverage = []
    if(Number.isInteger(dataDetails.vote_average)) {
        for(let i = 1; i <= dataDetails.vote_average; i++) {
            voteAverage.push('fa-solid fa-star')
        }
        for(let i = 1; i <= 10 - dataDetails.vote_average; i++) {
            voteAverage.push('fa-regular fa-star')
        }
    } else {
        for(let i = 1; i <= Math.floor(dataDetails.vote_average); i++) {
            voteAverage.push('fa-solid fa-star')
        }
        voteAverage.push('fa-solid fa-star-half-stroke')
        for(let i = 1; i <= 10 - Math.ceil(dataDetails.vote_average); i++) {
            voteAverage.push('fa-regular fa-star')
        }
    }

    return (
        <>
            {voteAverage.map((vote, id) => <span key={id} className='vote-start'><i className={`${vote}`}></i></span>)}
            ({dataDetails.vote_count} votes)
        </>
    );
};

export default VoteAverage;
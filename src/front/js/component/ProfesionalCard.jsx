import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ProfesionalCard = ({ professional }) => {
  const navigate = useNavigate();

  const renderStars = (score) => {
    const filledStars = Math.floor(score);
    const emptyStars = 5 - filledStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={filledStars + i} className="fa-regular fa-star"></i>);
    }

    return stars;
  }

  const averageScore = () => {
    if (professional.comments?.length > 0) {
      const totalScore = professional.comments.reduce(
        (acc, comment) => acc + comment.score,
        0
      );
      return Math.floor(totalScore / professional.comments.length);
    }

    return 0;
  };

  console.log(professional)

  return (

    <div className='card bg-primary text-white' onClick={() => navigate(`${professional.id}`)} style={{ cursor: "pointer" }}>
      <div className="row align-items-center justify-content-center p-3">
        <div className="col-md-4 text-center">
          <img src={professional.profile_picture} className='img-fluid profile-picture' alt="" />
          <h2 className='text-subtitle text-truncate'>{professional?.first_name} {professional?.last_name}</h2>
          <p>{renderStars(averageScore())}</p>
        </div>
        <div className="col-md-8">
          <h2 className='text-label'>Título: {professional?.specialities?.map(speciality => speciality.name)}</h2>
          <p className='text-body text-white'>{ }</p>
          <h2 className='text-label'>Ubicación:</h2>
          <p className='text-body text-white'><i className="fa-solid fa-location-dot"></i> {professional?.city?.name}, {professional?.city?.state?.name}</p>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ProfesionalCard = ({ professional }) => {
  const navigate = useNavigate();

  const renderStars = (score) => {
    const filledStars = Math.floor(score);
    const emptyStars = 5 - filledStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star text-primary"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={filledStars + i} className="fa-regular fa-star text-primary"></i>);
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

  return (
    <div
      className="card sm:card-side bg-base-200 border border-base-300 shadow-xl hover:cursor-pointer"
      onClick={() => navigate(`${professional.id}`)}
    >
      <figure className='sm:max-w-60'>
        <img
          className='h-full'
          src={professional.profile_picture}
          alt="Profile_picture"
        />
      </figure>
      <div className="card-body">
        <p>{renderStars(averageScore())}</p>
        <h2 className="card-title">{professional?.first_name} {professional?.last_name}</h2>
        <p>{professional?.specialities?.map(speciality => speciality.name).join(", ")}</p>
        <p>
          <i className="fa-solid fa-location-dot"></i> {professional?.city?.name}, {professional?.city?.state?.name}
        </p>
        <div className="badge badge-outline">Presencial</div>
        <div className="badge badge-outline">Remoto</div>
      </div>
    </div>
  )
}

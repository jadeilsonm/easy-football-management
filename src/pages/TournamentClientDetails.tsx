import React, { useEffect, useState } from 'react';
import { useParams } from "react-router"
import tournamentService from '../services/tournamentService';
import Navbar from '../components/Navbar';


const TournamentClientDetails = () => {
  const [tournamentDetails, setTournamentDetails] = useState<getAllByUserResponse | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  
  useEffect(() => {

    const fetchTournamentDetails = async () => {
      try {
        // setLoading(true);
        console.log(`Fetching details for tournament ID: ${params.tournamentId}`);
        const response = await tournamentService.getById(params.tournamentId || "");
        console.log('Tournament Details:', response);
        setTournamentDetails(response);

        // setLoading(true);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchTournamentDetails();
  }, []);
  
  
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Tournament Details</h1>
      <p className="text-gray-600">This is a placeholder for tournament details.</p>
      {tournamentDetails && 
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{tournamentDetails.name}</h2>
          <p className="text-gray-500">{tournamentDetails.description}</p>
          <img src={tournamentDetails.img} alt={tournamentDetails.name} className="w-48 h-48 object-cover mt-2" />
          <p className="mt-2">Status: {tournamentDetails.statusChampionship}</p>
          <p className="mt-2">Type: {tournamentDetails.typeChampionship}</p>
          <p className="mt-2">Award: ${tournamentDetails.award}</p>
          <p className="mt-2">Teams: {tournamentDetails.quantityTeams}</p>
        </div>
      }
    </div>
    </>
  );
}

export default TournamentClientDetails;


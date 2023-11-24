import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function EtudiantExam() {
  const [etudiants, setEtudiants] = useState([
    { id: 1, nom: 'Jhon', filiere: 'Informatique', note: 19 },
    { id: 2, nom: 'Ronald', filiere: 'Biologie', note: 14 },
    { id: 3, nom: 'Jack', filiere: 'Physique', note: 18 },
  ]);

  const [nom, setNom] = useState('');
  const [note, setNote] = useState(0);
  const [filiere, setFiliere] = useState('');

  const [afficher, setAfficher] = useState(false);
  const [etudId, setEtudId] = useState(0);

  function initialiser() {
    setNom('');
    setNote(0);
    setFiliere('');
  }

  function Supprimer(etud) {
    const etudiantCopy = etudiants.filter((ele) => ele.id !== etud.id);
    setEtudiants(etudiantCopy);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (etudId === 0) {
      // Ajout d'un nouveau étudiant
      let id = new Date().getTime();
      let newEtudiant = { id: id, nom: nom, filiere: filiere, note: note };
      setEtudiants([...etudiants, newEtudiant]);
    } else {
      // Modification de l'étudiant
      const updatedEtudiants = etudiants.map((etud) =>
        etud.id === etudId ? { ...etud, nom, filiere, note } : etud
      );

      setEtudiants(updatedEtudiants);
    }

    setAfficher(false);
    initialiser();
  }

  function Modifier(etd) {
    setNom(etd.nom);
    setNote(etd.note);
    setFiliere(etd.filiere);
    setEtudId(etd.id);
    setAfficher(true);
  }

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>
          <h2>Liste des étudiants</h2>
        </div>
        <div className='m-2 auto'>
          <button
            className='btn btn-outline-info'
            onClick={() => {
              setAfficher(true);
              setEtudId(0); // Reset etudId for adding a new student
            }}
          >
            Ajouter nouveau étudiant
          </button>
        </div>
        <div className='card-body'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Note</th>
                <th>Filière</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.map((etud) => (
                <tr key={etud.id}>
                  <td>{etud.nom}</td>
                  <td>{etud.note}</td>
                  <td>{etud.filiere}</td>
                  <td>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => Supprimer(etud)}
                    >
                      Supprimer
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-outline-success'
                      onClick={() => Modifier(etud)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {afficher && (
        <div className='card mt-2'>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='nom' className='form-label'>
                  Nom
                </label>
                <input
                  type='text'
                  id='nom'
                  className='form-control'
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='filiere' className='form-label'>
                  Filière
                </label>
                <input
                  type='text'
                  id='filiere'
                  className='form-control'
                  value={filiere}
                  onChange={(e) => setFiliere(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='note' className='form-label'>
                  Note
                </label>
                <input
                  type='text'
                  id='note'
                  className='form-control'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <br />
              <button className='btn btn-outline-primary' type='submit'>
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EtudiantExam;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Magasin() {
  const [produits, setProduits] = useState([
    { id: 1, nom: 'Ordinateur portable', categorie: 'Informatique', prix: 1200 },
    { id: 2, nom: 'Microscope', categorie: 'Biologie', prix: 500 },
    { id: 3, nom: 'Télescope', categorie: 'Astronomie', prix: 800 },
  ]);

  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState(0);
  const [categorie, setCategorie] = useState('');

  const [afficher, setAfficher] = useState(false);
  const [produitId, setProduitId] = useState(0);

  function initialiser() {
    setNom('');
    setPrix(0);
    setCategorie('');
  }

  function Supprimer(produit) {
    const produitsCopy = produits.filter((prod) => prod.id !== produit.id);
    setProduits(produitsCopy);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (produitId === 0) {
      // Ajout d'un nouveau produit
      let id = new Date().getTime();
      let newProduit = { id: id, nom: nom, categorie: categorie, prix: prix };
      setProduits([...produits, newProduit]);
    } else {
      // Modification du produit
      const updatedProduits = produits.map((prod) =>
        prod.id === produitId ? { ...prod, nom, categorie, prix } : prod
      );

      setProduits(updatedProduits);
    }

    setAfficher(false);
    initialiser();
  }

  function Modifier(prod) {
    setNom(prod.nom);
    setPrix(prod.prix);
    setCategorie(prod.categorie);
    setProduitId(prod.id);
    setAfficher(true);
  }

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>
          <h2>Liste des produits</h2>
        </div>
        <div className='m-2 auto'>
          <button
            className='btn btn-outline-info'
            onClick={() => {
              setAfficher(true);
              setProduitId(0); // Reset produitId for adding a new product
            }}
          >
            Ajouter nouveau produit
          </button>
        </div>
        <div className='card-body'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Catégorie</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.nom}</td>
                  <td>{prod.prix}</td>
                  <td>{prod.categorie}</td>
                  <td>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => Supprimer(prod)}
                    >
                      Supprimer
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-outline-success'
                      onClick={() => Modifier(prod)}
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
                <label htmlFor='categorie' className='form-label'>
                  Catégorie
                </label>
                <input
                  type='text'
                  id='categorie'
                  className='form-control'
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='prix' className='form-label'>
                  Prix
                </label>
                <input
                  type='text'
                  id='prix'
                  className='form-control'
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
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

export default Magasin;

function Favorite({books, removeFavorite}) {
  // Favori kitapları filtrele
  const favoritelist = books.filter (item => item.favori);
  const favoriteCount = favoritelist.length;

  return (
    <div className="favorite_card">
      <div className="favorite_header">
        <h2>Favoriler({favoriteCount})</h2>

      </div>
      <div>
        <ol>
          {/* //Favori kitapları listeleme döngüsü */}
          {favoritelist.map (item => (
            <li className="list" key={item.id}>
              {item.title}
              <button
                className="favorite_removeBtn"
                onClick={() => removeFavorite (item.id)}
              >
                Kaldır
              </button>
            </li>
          ))}
        </ol>
      </div>
      {favoriteCount === 0 &&
        <p className="no-favorites">Henüz favori kitap yok.</p>}
    </div>
  );
}

export default Favorite;

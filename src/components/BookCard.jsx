function BookCard({book, toggleFavorite}) {
  return (
    <div className="bookCard" key={book.id}>
      {book.favori &&
        <span
          className="remove-from-list"
          onClick={() => toggleFavorite (book.id, false)}
        >
          &times;
        </span>}
      {/*// Kitap bilgileri ve favori ekleme butonu*/}
      <div>
        <div className="bookname">
          {book.title}
        </div>
        <div className="author">
          {book.author}-{book.area}
        </div>
      </div>
      <div className="btnAll">
        <button
          onClick={() => toggleFavorite (book.id, true)}
          disabled={book.favori}
          className="btn"
        >
          <span role="img" aria-label="star">⭐</span>
          <span>Favori</span>
        </button>
      </div>
    </div>
  );
}

export default BookCard;

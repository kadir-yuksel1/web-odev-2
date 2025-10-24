import {useCallback, useMemo, useState} from 'react';
import BookCard from '../components/BookCard';
import Favorite from '../components/Favorite';
import Search from '../components/Search';
import initialBooks from '../lecture.json';
import {useLocalStorage} from '../components/UseLocalStorage';

// Yerel depolama anahtarı
const STORAGE_KEY = 'miniKitaplikBooks';

function Home () {
  const [books, setBooks] = useLocalStorage (STORAGE_KEY, initialBooks);
  const [search, setSearch] = useState ('');
  const [category, setCategory] = useState ('Tümü');

  // Benzersiz alanları (areas) hesapla
  const areas = useMemo (
    () => {
      const uniqueAreas = new Set (books.map (book => book.area));
      return Array.from (uniqueAreas);
    },
    [books]
  );

  // Favori ekleme/kaldırma işlevi
  const toggleFavorite = useCallback (
    (bookId, addFavorite) => {
      setBooks (prevsBooks =>
        prevsBooks.map (
          book => (book.id === bookId ? {...book, favori: addFavorite} : book)
        )
      );
    },
    [setBooks]
  );

  // Favori kaldırma işlevi
  const removeFavorite = useCallback (
    bookId => {
      toggleFavorite (bookId, false);
    },
    [toggleFavorite]
  );

  // Filtrelenmiş kitapları hesapla
  const filteredBooks = useMemo (
    () => {
      return books.filter (book => {
        const matchesSearch = book.title
          .toLowerCase ()
          .includes (search.toLowerCase ());

        const matchesCategory = category === 'Tümü'
          ? true
          : book.area === category;
        return matchesSearch && matchesCategory;
      });
    },
    [books, search, category]
  );

  return (
    <div className="home">
      <div className="header">
        <h1>Mini Kitaplık</h1>
      </div>
      <div style={{marginBottom: '20px'}}>
        {/*/Arama ve filtre bileşeni*/}
        <Search
          searchTerm={search}
          setSearchTerm={setSearch}
          filterType={category}
          setFilterType={setCategory}
          areas={areas}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          gap: '10px',
        }}
      >

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            flex: 2,
          }}
        >
          {/*Filtrelenmiş kitapları listeleme */}
          {filteredBooks.length > 0
            ? filteredBooks.map (item => (
                <BookCard
                  key={item.id}
                  book={item}
                  toggleFavorite={toggleFavorite}
                />
              ))
            : <p className="no-results">"{search}" için sonuç bulunamadı.</p>}
        </div>

        {/*Favori kitaplar bileşeni*/}
        <Favorite books={books} removeFavorite={removeFavorite} />
      </div>
    </div>
  );
}

export default Home;

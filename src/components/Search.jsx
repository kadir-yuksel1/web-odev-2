function Search({searchTerm, setSearchTerm, filterType, setFilterType, areas}) {
  const handleSearchChange = event => {
    setSearchTerm (event.target.value);
  };

  const handleSearchClick = () => {
    console.log (`Aranıyor: ${searchTerm}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >

      <div>
        <input
          type="text"
          placeholder="Kitap Ara..."
          className="input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <select
          className="selectBtn"
          value={filterType}
          onChange={e => setFilterType (e.target.value)}
        >
          <option value="Tümü">Tümü</option>
          {' '}
          {areas.map (area => <option key={area} value={area}>{area}</option>)}
        </select>
      </div>
    </div>
  );
}

export default Search;

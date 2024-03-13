export default function Search({ searchValue, handleSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Търсене"
      className="input input-sm tablet:input-md input-bordered input-primary w-full max-w-xs "
      value={searchValue}
      onChange={handleSearchChange}
    />
  );
}

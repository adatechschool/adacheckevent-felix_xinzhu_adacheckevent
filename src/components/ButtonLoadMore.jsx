export function ButtonLoadMore({offset}) {

  function handlePage () {
    offset((prevOffset) => prevOffset + 5);

  }

  return (
    <button type="button" onClick={handlePage}>Charger plus d'événements</button>
  );
}
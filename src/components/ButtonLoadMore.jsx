export function ButtonLoadMore({ onLoadMore}) {



  function handlePage () {
    onLoadMore()
  }


  return (
    <button onClick={handlePage}>Charger plus d'événements</button>
  );
}
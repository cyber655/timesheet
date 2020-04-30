let sortCollectionByDate = collection => {
  collection.sort(function compare(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA - dateB;
  });
};
export { sortCollectionByDate };

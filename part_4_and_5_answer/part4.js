const pageSize = 10;
db.collection("USERS")
  .orderBy("userScore", "desc")
  .limit(pageSize)
  .get()
  .then((snapshot) => {});

db.collection("USERS")
  .orderBy("userScore", "desc")
  .startAfter(lastDocument)
  .limit(pageSize)
  .get()
  .then((snapshot) => {});

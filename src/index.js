// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

let result = [];

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
  
  const centralPromise = central(id);
  const vaultPromise = vault(id);

  const dbSelected = await centralPromise;

  const dbPromise = dbs[dbSelected](id);

  const [vaultData, dbData] = await Promise.all([vaultPromise, dbPromise]);

  return {...vaultData, ...dbData};

};

// async function getUserDatatest(){
//   const user = await getUserData(4);
//   console.log(user);

// }

// getUserDatatest();


async function getUserDataTest(){
  const ids = [1,2,3,4,5,6,7,8,9,10];
  for (let id of ids){
    const user = await getUserData(id);
    console.log(`User ${id}:`, user)
  }

}

getUserDataTest();
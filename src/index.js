// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  // centralize the similar dbs under one variable

  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {
    // Central to get correct DB
    const currentDB = await central(id);

    // Go to particular DB to get basic data
    // let basicData = await dbs[currentDB](id);

    // let complexData = await vault(id);

    const [basicData, complexData] = await Promise.all([
      dbs[currentDB](id),
      vault(id),
    ]);

    console.log({ id, ...basicData, ...complexData });
  } catch (error) {
    console.error(`❌ Error: ${err.message}`);
  }
}

console.log(getUserData(10));

//------------------ Teacher's Way Above -----------------

//   const centralPromise = central(id);
//   const vaultPromise = vault(id);

//   const dbSelected = await centralPromise;

//   const dbPromise = dbs[dbSelected](id);

//   const [vaultData, dbData] = await Promise.all([vaultPromise, dbPromise]);

//   return { ...vaultData, ...dbData };
// }

// async function getUserDatatest(){
//   const user = await getUserData(4);
//   console.log(user);

// }

// getUserDatatest();

// async function getUserDataTest() {
//   const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   for (let id of ids) {
//     const user = await getUserData(id);
//     console.log(`User ${id}:`, user);
//   }
// }

// getUserDataTest();

// {
//   id: number,
//   name: string,
//   username: string,
//   email: string,
//   address: {
//     street: string,
//     suite: string,
//     city: string,
//     zipcode: string,
//     geo: {
//       lat: string,
//       lng: string
//     }
//   },
//   phone: string,
//   website: string,
//   company: {
//     name: string,
//     catchPhrase: string,
//     bs: string
//   }
// }

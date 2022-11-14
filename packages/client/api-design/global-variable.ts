// ========================== API ======================

export interface SenderEmail {
  from_email: string
  from_name: string
}
export interface GlobalVariables {
  prefix: string
  data: {
    shop: Record<string, string>
    sender_emails: SenderEmail[]
  }
}

// GET global variable
export interface GetGlobalVariableQuery {}
export interface GetGlobalVariableReturn {
  data: GlobalVariables
}

// export const GetGlobalVariableReturnExample1: GetGlobalVariableReturn = {
//   "data": {
//     "prefix": "global",
//     "data": {
//       "shop_name": "mixshopddd",
//       "shop_domain": "xxx",
//       "from_email": "xxx@gmail.com",
//       "from_name": "from name",

//       "shop": {
//         "shop_name": "mixshopddd",
//         "shop_domain": "xxx"
//       },
//       "sender_emails": [
//         {
//           "from_email": "xxx@gmail.com",
//           "from_name": "from name"
//         }
//       ]
//     }
//   }
// }

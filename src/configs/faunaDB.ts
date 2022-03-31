import faunadb, {
  Get,
  Index,
  Lambda,
  Let,
  Match,
  Paginate,
  Select,
  Var,
} from "faunadb"; /* Import faunaDB sdk */

export const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET || "",
});
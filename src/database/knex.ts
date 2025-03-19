import { knex } from "knex";
import configKnex from "../../knexfile"; 

// Inicializa o Knex com a configuração
export const db = knex(configKnex);
import { knex } from "knex";
import configKnex from "../../knexfile"; 

// Initialize Knex with the configuration
export const db = knex(configKnex);
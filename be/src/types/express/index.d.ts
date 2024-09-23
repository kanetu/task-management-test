import express from "express";
import { MongoClient } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      dbClient: MongoClient
    }
  }
}
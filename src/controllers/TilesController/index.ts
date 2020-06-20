import { Request, Response } from "express";
import db from "../../database";

const serializeTiles = (tiles: Array<any>) => {
  const serialized = tiles.map(tile => {
    const serializedData = { ...tile };
    // serializedData.img = `http://localhost:3333/uploads/${tile.img}`;
    return serializedData;
  });
  return serialized;
};

class TilesController {

  async index(req: Request, res: Response) {
    try {
      const tiles = await db.Tiles.find({}).lean();
      return res.json(serializeTiles(tiles));
    } catch (error) {
      console.log(error);
      return res.json({ error: 'Ops, some wild error appeared!' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      res.json(req.body);
    } catch (error) {
      console.log(error);
      return res.json({ error: 'Ops, some wild error appeared!' });
    }
  }

}

export default TilesController;
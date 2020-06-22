import { Request, Response } from "express";
import db from "../../database";
import { serverUrl } from "../../env";

const serializeTiles = (tiles: Array<any>) => {
  const serialized = tiles.map(tile => {
    const serializedData = { ...tile };
    serializedData.img = `${serverUrl}/uploads/${tile.img}`;
    serializedData.video = `${serverUrl}/uploads/${tile.video}`;
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
      console.log(req.file);
      res.json({ img: req.file });
    } catch (error) {
      console.log(error);
      return res.json({ error: 'Ops, some wild error appeared!' });
    }
  }

}

export default TilesController;
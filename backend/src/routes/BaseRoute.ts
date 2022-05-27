import { Router } from 'express';

const baseRoute = Router();

baseRoute.get('/', (req, res) => {
  res.status(200).json({
    OK: 'Base Route Connected!!!',
  });
});

export default baseRoute;

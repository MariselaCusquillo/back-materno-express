import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Establecimiento } from '../entity/establecimientos';
import { validate } from 'class-validator';

export class EstablecimientoController {

  static getAll = async (req: Request, res: Response) => {
    const establecimientoRepository = getRepository(Establecimiento);
    let establecimientos;

    try {
      establecimientos = await establecimientoRepository.find();
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (establecimientos.length > 0) {
      res.send(establecimientos);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const establecimientoRepository = getRepository(Establecimiento);
    try {
      const establecimientos = await establecimientoRepository.findOneOrFail(id);
      res.send(establecimientos);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const {  establecimiento, provincia, distrito, tipo_atencion, eod, tipologia } = req.body;
    const establecimientos = new Establecimiento();

    establecimientos.establecimiento = establecimiento;
    establecimientos.provincia = provincia;
    establecimientos.distrito = distrito;
    establecimientos.tipo_atencion = tipo_atencion;
    establecimientos.eod = eod;
    establecimientos.tipologia = tipologia;
   
    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(establecimientos, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const establecimientoRepository = getRepository(Establecimiento);
    try {
        await establecimientoRepository.save(establecimientos);
    } catch (e) {
      return res.status(409).json({ message: 'Username already exist' });
    }
    // All ok
    res.send(' created'); 
  };



  static edit = async (req: Request, res: Response) => {
    let establecimientos;
    const { id } = req.params;
    const { establecimiento, provincia, distrito, tipo_atencion, eod, tipologia } = req.body;

    const establecimientoRepository = getRepository(Establecimiento);
    // Try get user
    try {
      establecimientos = await establecimientoRepository.findOneOrFail(id);
      establecimientos.establecimiento = establecimiento;
      establecimientos.provincia = provincia;
      establecimientos.distrito = distrito;
      establecimientos.tipo_atencion = tipo_atencion;
      establecimientos.eod = eod;
      establecimientos.tipologia = tipologia;
      
    } catch (e) {
      return res.status(404).json({ message: 'Establecimiento not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(establecimientos, validationOpt);

    

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await establecimientoRepository.save(establecimientos);
    } catch (e) {
      return res.status(409).json({ message: 'Username already in use' });
    }

    res.status(201).json({ message: 'User update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const establecimientoRepository = getRepository(Establecimiento);
    let establecimiento: Establecimiento;

    try {
      establecimiento = await establecimientoRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove user
    establecimientoRepository.delete(id);
    res.status(201).json({ message: ' User deleted' });
  };
}

export default EstablecimientoController;

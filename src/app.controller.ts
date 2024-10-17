import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { newForgalasDto } from './newFoglalas.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('/foglalas')
  @Render('foglalas')
  foglalas() {
    return {
      errors: [],
      data: {}
    }
  }

  @Post('/foglalas')
  foglalasPost(@Body() foglalas: newForgalasDto, @Res() response: Response) {

    const errors: string[] = [];

    if (!foglalas.nev) {
      errors.push('Nev megadasa kotelezo!');
    }

    if (!foglalas.email) {
      errors.push('Az email megadasa kotelezo!');
    }

    if (!foglalas.datum) {
      errors.push('A datum megadasa kotelezo!');
    }

    if (!foglalas.nezok) {
      errors.push('A nezok szamanak a megadasa kotelezo!');
    }

    if (foglalas.nev == undefined || foglalas.nev == null || foglalas.nev == '' || foglalas.nev.trim().length == 0) {
      errors.push('A nev nem lehet space vagy barmilyen mas whitespace!');
    }

    if (! /^[a-z.-_]{1,}@[a-z]{1,}.[a-z]{2,}$/.test(foglalas.email.toLowerCase())) {
      errors.push('Az email nem megfeleloen van megadva!');
    }

    if (Date.parse(foglalas.datum) < Date.now()) {
      errors.push('A mai datumnal korabbi datumot nem lehet megadni!')
    }

    if (isNaN(parseInt(foglalas.nezok))) {
      errors.push('A nezok szama nem szam!');
    }

    if (parseInt(foglalas.nezok) < 1 && parseInt(foglalas.nezok) > 10) {
      errors.push('A nezok szama nem lehet kisebb 1-nel es nagyobb 10-nel!');
    }

    if (errors.length > 0) {
      return response.render('foglalas',
        {
          errors,
          data: foglalas
        }
      )
    } else {
      return response.redirect('/success');
    }

  }

  @Get('/success')
  @Render('success')
  success() {

  }
}

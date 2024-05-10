import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { Orthography, ProsConsDiscusser } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }


  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: Orthography
  ) {
    return this.gptService.orthographyCheck(orthographyDto);
  }


  @Post('pros-cons-discusser')
  prosConsDicusser(
    @Body() ProsConsDiscusserDto: ProsConsDiscusser
  ) {
    return this.gptService.prosConsDicusser(ProsConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() ProsConsDiscusserDto: ProsConsDiscusser,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.prosConsDicusserStream(ProsConsDiscusserDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
    
      res.write(piece);
    }
    res.end();



  }

}



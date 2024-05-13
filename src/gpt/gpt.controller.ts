import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { Orthography, ProsConsDiscusser, TextToAudio, Translate } from './dtos';
import type { Response } from 'express';


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


  @Post('translate')
  transalateText(
    @Body() TransaleDto: Translate
  ) {
    return this.gptService.translate(TransaleDto);
  }


  @Post('text-to-audio')
  async textoToAudio(
    @Body() TextToAudioDto: TextToAudio,
    @Res() res: Response,
  ) {
    const filePath = await this.gptService.textToAudio(TextToAudioDto);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);

  }


  @Get('text-to-audio/:fileId')
  async textoToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId:string,
  ) {
    const filePath = await this.gptService.getTextToAudioGetter(fileId);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
    

  }



}



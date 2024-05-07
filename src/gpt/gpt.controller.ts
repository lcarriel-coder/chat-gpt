import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { Orthography } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }


  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: Orthography
  ) {
    return this.gptService.orthographyCheck(orthographyDto);
  }


}


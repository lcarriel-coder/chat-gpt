import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { orthograghyCheckUseCase } from './use-cases';
import { Orthography } from './dtos';

@Injectable()
export class GptService {


    private openai = new OpenAI({
        apiKey:process.env.OPENAI_API_KEY
    });
    //Solo va a llamar casos de uso

    async orthographyCheck(orthographyDto : Orthography){
        return await orthograghyCheckUseCase(this.openai, {
            prompt:orthographyDto.prompt
        });
    }
}

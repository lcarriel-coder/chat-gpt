import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { orthograghyCheckUseCase, prosConsDicusserUseCase,prosConsDicusserStreamUseCase } from './use-cases';
import { Orthography, ProsConsDiscusser } from './dtos';

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

    async prosConsDicusser(prosConsDiscusserDto : ProsConsDiscusser){
        return await prosConsDicusserUseCase(this.openai, {
            prompt:prosConsDiscusserDto.prompt
        });
    }
    async prosConsDicusserStream(prosConsDiscusserDto : ProsConsDiscusser){
        return await prosConsDicusserStreamUseCase(this.openai, {
            prompt:prosConsDiscusserDto.prompt
        });
    }
}

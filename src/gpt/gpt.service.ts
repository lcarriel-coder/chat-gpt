import * as path from 'path';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { orthograghyCheckUseCase, prosConsDicusserUseCase,prosConsDicusserStreamUseCase, translateUseCase,textToAudioUseCase } from './use-cases';
import { Orthography, ProsConsDiscusser,Translate,TextToAudio } from './dtos';


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

    async translate(translateDto : Translate){
        return await translateUseCase(this.openai, {
            prompt:translateDto.prompt,
            lang:translateDto.lang
        });
    }

    async textToAudio(textToAudioDto : TextToAudio){
        return await textToAudioUseCase(this.openai, {
            prompt:textToAudioDto.prompt,
            voice:textToAudioDto.voice
        });
    }

    async getTextToAudioGetter(filedId:string){
        const filePath = path.resolve(__dirname, '../../generated/audios/' , `${filedId}.mp3`);
        const wasfound = fs.existsSync( filePath );
        if( !wasfound ) throw new NotFoundException( `File ${filedId} not found`);
        return filePath;
    }
}

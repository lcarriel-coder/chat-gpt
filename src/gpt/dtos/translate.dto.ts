import { IsInt, IsOptional, IsString } from "class-validator";

export class Translate {
    @IsString()
    readonly prompt: string;

    @IsString()
    readonly lang: string;

    @IsInt()
    @IsOptional()
    readonly maxTokens?: number;

}
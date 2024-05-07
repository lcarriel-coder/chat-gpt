import { IsInt, IsOptional, IsString } from "class-validator";

export class Orthography{
    @IsString()
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    readonly maxTokens?: number;

}